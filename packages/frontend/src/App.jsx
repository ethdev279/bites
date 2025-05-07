import { useState, useEffect } from "react";
import {
  Card,
  Button,
  Upload,
  Space,
  Input,
  Avatar,
  Typography,
  Image,
  Switch,
  Popconfirm,
  List,
  message
} from "antd";
import {
  PictureTwoTone,
  LikeOutlined,
  CommentOutlined,
  ShareAltOutlined,
  SyncOutlined
} from "@ant-design/icons";
import { useStorageUpload, useSigner, useAddress } from "@thirdweb-dev/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ellipsisAddress, bitesContract } from "./utils";
import { executeOperation } from "./utils/aaUtils";
import "./App.css";

const { TextArea, Search } = Input;
const { Text } = Typography;
dayjs.extend(relativeTime);

export default function App() {
  const [biteInput, setBiteInput] = useState({
    content: "",
    image: null
  });
  const [bites, setBites] = useState([]);
  const [loading, setLoading] = useState({
    read: false,
    post: false,
    comment: false
  });
  const [showMyPosts, setShowMyPosts] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { mutateAsync: upload } = useStorageUpload();
  const signer = useSigner();
  const account = useAddress();

  const getBites = async () => {
    setLoading({ read: true });
    try {
      // get currentBiteId from contract
      const currentBiteId = await bitesContract.currentBiteId();
      console.log("currentBiteId ->", currentBiteId);

      // loop through all bites and get their details
      const bitesList = await Promise.all(
        Array.from({ length: currentBiteId }, (_, i) =>
          bitesContract.bites(i + 1)
        )
      );
      console.log("bitesList ->", bitesList);
      setBites(bitesList);
      setLoading({ read: false });
    } catch (err) {
      console.error("Error fetching bites", err);
      setLoading({ read: false });
      message.error("Failed to fetch bites. Please try again later");
    }
  };

  const handlePostBite = async () => {
    console.log(biteInput);
    if (!signer || !account)
      return message.error("Please connect your wallet first");
    if (!biteInput.content)
      return message.error("Bite Content cannot be empty");
    setLoading({ post: true });
    try {
      let imageHash = "";
      if (biteInput?.image) {
        message.info("Uploading image to IPFS...");
        const [imageIpfs] = await upload({
          data: [biteInput?.image],
          options: {
            uploadWithoutDirectory: true
          }
        });
        console.log("uploadRes -> t", imageIpfs);
        imageHash = imageIpfs?.split("://")[1];
        message.success("Image uploaded successfully");
      }
      // create new bite in contract with paymaster
      const createBiteTx = await executeOperation(
        signer,
        bitesContract.address,
        "createBite",
        [biteInput?.content, imageHash]
      );
      console.log("createBiteTx ->", createBiteTx);
      message.success("Bite posted successfully");
      setBiteInput({ content: "", image: null });
    } catch (err) {
      console.error("Error posting bite", err);
      message.error("Failed to post bite. Please try again later");
    } finally {
      setLoading({ post: false });
    }
  };

  const handleCommentOnBite = async (biteId) => {
    console.log("Commenting on bite", biteId);
    // TODO: implement comment functionality
  };

  useEffect(() => {
    getBites();
  }, [showMyPosts, account]);

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card
        title="Create a new Bite"
        actions={[
          <Button
            key="post"
            type="primary"
            loading={loading?.post}
            onClick={handlePostBite}
          >
            Post
          </Button>
        ]}
      >
        <TextArea
          rows={4}
          value={biteInput?.content}
          onChange={(e) =>
            setBiteInput({ ...biteInput, content: e.target.value })
          }
          placeholder="What's happening?"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
        <Upload
          name="file"
          type="select"
          accept="image/*"
          listType="picture"
          previewFile={true}
          onRemove={() => setBiteInput({ ...biteInput, image: null })}
          fileList={biteInput?.image ? [biteInput.image] : []}
          customRequest={({ file }) => {
            console.log("Uploading file...", file);
            setBiteInput({ ...biteInput, image: file });
          }}
          multiple={false}
        >
          <Button
            size="large"
            shape="circle"
            style={{
              marginTop: 10,
              border: "1px solid grey"
            }}
            icon={<PictureTwoTone />}
          />
        </Upload>
        {/* show image if present */}
        {biteInput?.image && (
          <Image
            src={URL.createObjectURL(biteInput?.image)}
            style={{
              marginTop: 10,
              borderRadius: 10,
              border: "1px solid grey",
              maxWidth: "300px",
              maxHeight: "300px"
            }}
          />
        )}
      </Card>
      {/* Search box*/}

      <Space style={{ float: "right" }}>
        <Search
          placeholder="Search bites..."
          onChange={(e) => setSearchInput(e.target.value)}
          onSearch={getBites}
          allowClear
          enterButton
        />
        <Button
          type="primary"
          shape="circle"
          onClick={getBites}
          icon={<SyncOutlined spin={loading?.read} />}
        />
        <Switch
          title={account ? "My Posts" : "Connect wallet to filter"}
          checkedChildren="On"
          unCheckedChildren="Off"
          defaultChecked={showMyPosts}
          disabled={!account}
          onChange={(checked) => setShowMyPosts(checked)}
        />
        <label>My Posts Only</label>
      </Space>
      {bites.map((bite) => (
        <Card
          key={bite.id}
          title={
            <Space>
              <Avatar
                src={`https://api.dicebear.com/5.x/open-peeps/svg?seed=${bite?.author?.id}`}
                style={{ border: "1px solid grey" }}
              />
              <Text title={dayjs(bite?.createdAt * 1000).format("MMM D, YY")}>
                {ellipsisAddress(bite?.author?.id) +
                  " • " +
                  dayjs(bite?.createdAt * 1000).fromNow()}
              </Text>
            </Space>
          }
          loading={loading?.read}
          actions={[
            <LikeOutlined key="like" />,
            <Popconfirm
              key="comment"
              onConfirm={() => handleCommentOnBite(bite?.id)}
              title="Comments"
              description={
                <div>
                  <List
                    dataSource={bite?.comments}
                    renderItem={(comment) => (
                      <List.Item key={comment?.author?.id}>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              src={`https://api.dicebear.com/5.x/open-peeps/svg?seed=${comment?.author?.id}`}
                            />
                          }
                          title={
                            <Text>{ellipsisAddress(comment?.author?.id)}</Text>
                          }
                          description={comment?.content}
                        />
                        <Text
                          title={dayjs(comment?.createdAt * 1000).format(
                            "MMM D, YY"
                          )}
                        >
                          {dayjs(comment?.createdAt * 1000).fromNow()}
                        </Text>
                      </List.Item>
                    )}
                  />
                  <TextArea
                    rows={4}
                    cols={50}
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Add a comment"
                  />
                </div>
              }
            >
              <CommentOutlined />
              {" " + bite?.comments?.length}
            </Popconfirm>,
            <ShareAltOutlined key="share" />
          ]}
        >
          <Card.Meta description={bite?.content} />
          {bite?.imageHash && (
            <Image
              src={`https://ipfs.io/ipfs/${bite?.imageHash}`}
              style={{
                marginTop: 10,
                borderRadius: 10,
                maxWidth: "450px",
                maxHeight: "400px"
              }}
            />
          )}
        </Card>
      ))}
    </Space>
  );
}

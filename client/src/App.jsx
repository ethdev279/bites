import { useState } from "react";
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
  PictureOutlined,
  LikeOutlined,
  CommentOutlined,
  ShareAltOutlined
} from "@ant-design/icons";
import { useStorageUpload, useSigner, useAddress } from "@thirdweb-dev/react";
import { ellipsisAddress, bitesContract } from "../utils";
import "./App.css";

const { TextArea } = Input;
const { Text } = Typography;

export default function App() {
  const [biteInput, setBiteInput] = useState({
    content: "",
    image: null
  });
  const [bites, setBites] = useState([
    {
      id: 1,
      content: "This is the first bite!",
      imageHash: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      author: "0xFirstUser",
      comments: [
        {
          author: "0xCommenter1",
          content: "Great post!",
          timestamp: "2h ago"
        }
      ]
    },
    {
      id: 2,
      content: "Loving this new platform!",
      imageHash: null,
      author: "0xSecondUser",
      comments: []
    }
  ]);
  const [loading, setLoading] = useState({
    read: false,
    post: false,
    comment: false
  });
  const [showMyPosts, setShowMyPosts] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const { mutateAsync: upload } = useStorageUpload();
  const signer = useSigner();
  const account = useAddress();

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
      // create new bite in contract
      const tx = await bitesContract
        .connect(signer)
        .createBite(biteInput?.content, imageHash);
      console.log("tx", tx);
      await tx.wait();
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
    if (!signer || !account)
      return message.error("Please connect your wallet first");
    if (!commentInput) return message.error("Comment cannot be empty");
    setLoading({ comment: true });
    try {
      // create new comment in contract
      const tx = await bitesContract
        .connect(signer)
        .commentOnBite(biteId, commentInput);
      console.log("tx", tx);
      await tx.wait();
      message.success("Comment posted successfully");
      setCommentInput("");
    } catch (err) {
      console.error("Error posting comment", err);
      message.error("Failed to post comment. Please try again later");
    } finally {
      setLoading({ comment: false });
    }
  };

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card
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
          <Button icon={<PictureOutlined />} />
        </Upload>
        {/* show image if present */}
        {biteInput?.image && (
          <Image
            src={URL.createObjectURL(biteInput?.image)}
            style={{
              marginTop: 10,
              borderRadius: 10,
              border: "1px solid grey"
            }}
          />
        )}
      </Card>
      <Space style={{ float: "right" }}>
        <Switch
          checkedChildren="On"
          unCheckedChildren="Off"
          defaultChecked={showMyPosts}
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
                src={`https://api.dicebear.com/5.x/open-peeps/svg?seed=${bite?.author}`}
                style={{ border: "1px solid grey" }}
              />
              <Text>{ellipsisAddress(bite?.author) + " • " + " 2h ago"}</Text>
            </Space>
          }
          hoverable
          loading={loading?.read}
          actions={[
            <LikeOutlined key="like" />,
            <Popconfirm
              key="comment"
              onConfirm={() => handleCommentOnBite(bite?.id)}
              title={
                <div>
                  <List
                    dataSource={bite?.comments}
                    renderItem={(comment) => (
                      <List.Item key={comment?.author}>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              src={`https://api.dicebear.com/5.x/open-peeps/svg?seed=${comment?.author}`}
                            />
                          }
                          title={
                            <Text>{ellipsisAddress(comment?.author)}</Text>
                          }
                          description={comment?.content}
                        />
                        <Text>{comment?.createdAt}</Text>
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
                borderRadius: 10
              }}
            />
          )}
        </Card>
      ))}
    </Space>
  );
}

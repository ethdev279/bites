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
  Switch
} from "antd";
import {
  PictureOutlined,
  LikeOutlined,
  CommentOutlined,
  ShareAltOutlined
} from "@ant-design/icons";
import "./App.css";

const { TextArea } = Input;
const { Text } = Typography;

export default function App() {
  const [biteInput, setBiteInput] = useState({
    content: "",
    image: null
  });
  const [image, setImage] = useState(null);
  const [bites, setBites] = useState([
    {
      id: 1,
      content: "This is the first bite!",
      imageHash: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      author: "0xFirstUser"
    },
    {
      id: 2,
      content: "Loving this new platform!",
      imageHash: null,
      author: "0xSecondUser"
    }
  ]);
  const [loading, setLoading] = useState({
    read: false,
    post: false,
    comment: false
  });
  const [showMyPosts, setShowMyPosts] = useState(false);

  const handleContentChange = (e) => setContent(e.target.value);

  const handleImageChange = (info) => {
    setImage(info.file);
  };

  const handlePost = () => {
    // TODO: Post content and image to the server
  };

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card
        actions={[
          <Button key="post" type="primary" onClick={handlePost}>
            Post
          </Button>
        ]}
      >
        <TextArea
          rows={4}
          value={biteInput?.content}
          onChange={handleContentChange}
          placeholder="What's happening?"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
        <Upload
          name="file"
          type="select"
          accept="image/*"
          showUploadList
          listType="picture"
          previewFile={true}
          onRemove={() => setBiteInput({ ...biteInput, image: null })}
          progress="percent"
          fileList={biteInput?.image ? [biteInput.image] : []}
          customRequest={({ file }) =>
            setBiteInput({ ...biteInput, image: file })
          }
          multiple={false}
        >
          <Button icon={<PictureOutlined />} />
        </Upload>
      </Card>
      {/* toggler on right to show my posts only */}
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
              <Text>
                {bite?.author?.slice(0, 6) +
                  "..." +
                  bite?.author?.slice(-4) +
                  " • " +
                  " 2h ago"}
              </Text>
            </Space>
          }
          hoverable
          loading={loading?.read}
          actions={[
            <LikeOutlined key="like" />,
            <CommentOutlined key="comment" />,
            <ShareAltOutlined key="share" />
          ]}
        >
          <Card.Meta description={bite?.content} />
          {bite?.imageHash && (
            <Image
              src={bite?.imageHash}
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

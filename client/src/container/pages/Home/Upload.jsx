import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Image, Input, Layout, Row, Spin, Typography, Upload, message } from "antd";
import { getPlan } from "../../../redux/auth/authSlice";
import constants from "../../../config/constants";
import { FileImageOutlined } from "@ant-design/icons";
import { getStorage } from "../../../helpers";
import { deleteFile, getImageDescription } from "../../../services/v1API";

const { Content, Sider } = Layout;
const { Title, Text } = Typography;
const { Dragger } = Upload;

function UploadContainer() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const plan = useSelector((state) => state.auth.plan);
  // const { id } = useParams();

  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fileLists, setFileLists] = useState([]);
  const [name, setName] = useState("");
  const [path, setPath] = useState("");

  // useEffect(() => {
  //   // dispatch(getPlan());
  // }, []);

  // useEffect(() => {
  //   // console.log(id, plan);
  //   // if(!plan && !id) {
  //   //     navigate('/plans');
  //   // }
  // }, [plan]);

  const handleChange = (info) => {
    if (info.file.status === "done") {
      setPath(info.file.response?.path);
      info.file.thumbUrl = `${constants.SOCKET_URL}${info.file.response?.path}`;
    }
    setFileLists(info.fileList.length == 1 ? info.fileList : info.fileList.splice(1, 1));
  };

  const handleDelete = (file) => {
    deleteFile({
      path: file.response?.path,
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleNext = async () => {
    if (loading) return;
    if (!name) return message.warning('Please input name your project!');
    let data = fileLists.filter(file => file.status == 'done').map(file => file.response?.path);
    if (data.length == 0) return message.warning("Please upload your inspiration image");
    setLoading(true);
    try {
      let res = await getImageDescription({
        fileLists: data,
        name
      });
      // console.log(res);
      navigate(`/result/${res.data.id}`);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <div className="text-center max-w-5xl w-screen mx-auto p-2">
      <Row gutter={[32, 32]} className="mt-6">
        <Col span={24}>
          <Title level={2}>Upload your Inspiration Image</Title>
        </Col>
        <Col span={24}>
          <div>
            <Dragger
              name="file"
              multiple={true}
              fileList={fileLists}
              action={`${constants.HOST_URL}v1/upload`}
              showUploadList={true}
              listType="picture"
              accept="image/*"
              headers={{
                Authorization: getStorage("token"),
              }}
              data={{
                oldFile: path,
              }}
              onChange={handleChange}
              onRemove={handleDelete}
            >
              <p className="ant-upload-drag-icon pt-4">
                {/* percent > 0 && percent < 100 ? (
                  <Spin size="large" tip={`${percent}% completed`}>
                    <div className="content h-[20px]" />
                  </Spin>
                ) :  */(
                    <FileImageOutlined />
                  )}
              </p>
              <p className="ant-upload-text">
                Click or drag your inspiration image to this area.
              </p>
              <p className="ant-upload-hint">
                {/* Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files. */}
              </p>
            </Dragger>
          </div>
        </Col>
        <Col span={24}>
          <Input
            type="text"
            className="text-center"
            size="large"
            placeholder="Name Your Prjoect..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Col>
        {/* {path && <Col span={12}>
          <Image src={`${constants.SOCKET_URL}${path}`} width={'100%'} />
        </Col>} */}
        <Col span={24}>
          <div className="text-center">
            <Button type="primary" size="large" onClick={handleNext} loading={loading}>Next step</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default UploadContainer;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Image, Layout, Row, Spin, Typography } from "antd";

import { getProjects } from "../../../services/v1API";
import constants from "../../../config/constants";
import { FileAddOutlined } from "@ant-design/icons";

const { Meta } = Card;

const { Title, Text } = Typography;

function Project() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then(res => {
      setProjects(res.data.projects);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div className="text-center max-w-5xl w-screen mx-auto p-2">
      <Row gutter={[24, 24]} className="mt-6">
        <Col span={24}>
          <Title level={2}>My Projects</Title>
        </Col>
        <Col span={24}>
          <div className="text-right">
            <Link to={`/upload`}>
              <Button type="primary" icon={<FileAddOutlined />}>New Project</Button>
            </Link>
          </div>
        </Col>
        {projects.map((proj, index) => <Col span={6} key={index}>
          <Link to={`/result/${proj._id}`}>
            <Card
              hoverable
              key={index}
              style={{
                width: "100%",
              }}
              cover={<img alt="image" src={`${constants.SOCKET_URL}${proj.inputImages[0].path}`} />}
            >
              <Meta title={proj.name || "Untitled"} description="" />
            </Card>
          </Link>
        </Col>)}
        <Col span={24}>
          {/* <div className="text-center">
            <Button type="primary" size="large" onClick={handleNext} loading={loading}>Next step</Button>
          </div> */}
        </Col>
      </Row>
    </div>
  );
}

export default Project;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Image, Layout, Row, Spin, Typography } from "antd";

import { getProjects } from "../../../services/v1API";
import constants from "../../../config/constants";
import { FileAddOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Meta } = Card;

const { Title, Text } = Typography;

function Project() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then(res => {
      setProjects(res.data.projects);
      // if (res.data.projects.length == 0) {
      //   navigate('/welcome');
      // }
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div className="text-center max-w-5xl w-screen mx-auto px-6 sm:px-2 p-2">
      <Row gutter={[24, 24]} className="mt-6 items-stretch">
        <Col span={24}>
          <Title level={2}>My Projects</Title>
          <div className="text-right">
            <Link to={`/home`}>
              <Button type="primary" icon={<FileAddOutlined />}>New Project</Button>
            </Link>
          </div>
        </Col>
        {projects.map((proj, index) => <Col md={6} sm={8} xs={12} key={index}>
          <Link to={`/result/${proj._id}`}>
            <Card
              hoverable
              key={index}
              style={{
                width: "100%",
                height: "100%"
              }}
              cover={<div className="h-[200px] bg-cover bg-no-repeat bg-blue-200" style={{ backgroundImage: proj.inputImages[0].path.includes('https://') ? `url(${proj.inputImages[0].path})` : `url(${constants.SOCKET_URL}${proj.inputImages[0].path})` }}></div>}
            >
              {/* <img alt="image" className=" w-auto" src={} /> */}
              <Meta title={proj.name || "Untitled"} description={dayjs(proj.createdAt).format("MM/DD/YY hh:mm A")} />
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

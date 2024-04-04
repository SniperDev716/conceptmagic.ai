import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Layout, Row, Typography } from "antd";
import { getPlan } from "../../../redux/auth/authSlice";

const { Content, Sider } = Layout;
const { Title, Text } = Typography;

const categories = [
  { src: "", title: "Clothing Design" },
  { src: "", title: "Package Design" },
  { src: "", title: "Logo Design" },
  { src: "", title: "Product Design" },
  { src: "", title: "Room Design" },
  { src: "", title: "Store Design" },
  { src: "", title: "Album Art" },
  { src: "", title: "Resturant Design" },
  { src: "", title: "Advertisement Design" },
  { src: "", title: "Picture Design" },
]

function Photos() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { id } = useParams();

  useEffect(() => {
  }, []);

  // useEffect(() => {
  //   // console.log(id, plan);
  //   // if(!plan && !id) {
  //   //     navigate('/plans');
  //   // }
  // }, [plan]);

  return (
    <Content className="text-center max-w-7xl mx-auto p-2">
      <Row>
        <Col span={24}>
          <div className="p-5 mb-4 bg-gray-200 border-1 border-gray-400 border-solid">
            Package Design
          </div>
          <Title className="mb-5" level={4}>Select the images that have some element(s) that you like or pique your interest.</Title>
        </Col>
        <Col span={24}>
          <Row gutter={[32, 32]}>
            {categories.map((cat, index) => <Col key={index} span={8}>
              <div className="text-center">
                <div className="w-40 h-40 mx-auto bg-gray-300"></div>
                <Text>{cat.title}</Text>
              </div>
            </Col>)}
          </Row>
        </Col>
      </Row>
    </Content>
  );
}

export default Photos;

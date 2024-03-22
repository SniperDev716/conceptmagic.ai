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

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const plan = useSelector((state) => state.auth.plan);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPlan());
  }, []);

  useEffect(() => {
    // console.log(id, plan);
    // if(!plan && !id) {
    //     navigate('/plans');
    // }
  }, [plan]);

  return (
    <Content className="text-center max-w-5xl mx-auto p-2">
      <Row>
        <Col span={24}>
          <Title>We'll walk you through the first, and then let you explore your creativity. Pick a category to start with.</Title>
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

export default Home;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Layout, Row, Typography } from "antd";
import { getPlan } from "../../../redux/auth/authSlice";
import { setStorage } from "../../../helpers";

const { Content, Sider } = Layout;
const { Title, Text } = Typography;

const categories = [
  { src: "(1) Product Design.png", title: "Product Design" },
  { src: "(2) Packaging.png", title: "Package Design" },
  { src: "(3) Logo design.png", title: "Logo Design" },
  { src: "(4) Resturant Design.png", title: "Resturant Design" },
  { src: "(5) Home Design.png", title: "Room Design" },
  { src: "(6) Store Design.png", title: "Store Design" },
  { src: "(7) Advertisement.png", title: "Advertisement Design" },
  { src: "(8) App Design.png", title: "App Design" },
  { src: "(9) Website Design.png", title: "Website Design" },
  { src: "(10) Flyer Design.png", title: "Flyer Design" },
  { src: "(11) Business Cards.png", title: "Business Cards" },
  { src: "(12) Sticker Design.png", title: "Sticker Design" },
  { src: "(13) Album Art.png", title: "Album Art" },
  { src: "(14) Signage.png", title: "Signage Design" },
  { src: "(15) Automotive.png", title: "Automotive Design" },
  { src: "(16) Fashion.png", title: "Fashion Design" },
  { src: "(17) Furniture.png", title: "Furniture Design" },
  { src: "(18) Film Concept Art.png", title: "Film Concept Art" },
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

  const handleNext = (cat) => {
    setStorage('image_type', cat.title);
    navigate('/upload');
  }

  return (
    <Content className="text-center max-w-5xl mx-auto p-2 my-5">
      <Row>
        <Col span={24}>
          <Title level={3}>We'll walk you through the first, and then let you explore your creativity. Pick a category to start with.</Title>
        </Col>
        <Col span={24}>
          <Row gutter={[32, 32]}>
            {categories.map((cat, index) => <Col key={index} span={8}>
              <div className="text-center">
                <img src={`/imgs/category/${cat.src}`} className="w-[80%] mx-auto bg-gray-300 cursor-pointer rounded shadow-sm hover:shadow-lg" onClick={() => handleNext(cat)}></img> <br />
                <Text className="text-xl font-bold">{cat.title}</Text>
              </div>
            </Col>)}
          </Row>
        </Col>
      </Row>
    </Content>
  );
}

export default Home;

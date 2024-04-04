import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Image, Layout, Row, Typography } from "antd";
import { getPlan } from "../../../redux/auth/authSlice";
import { setStorage } from "../../../helpers";

const { Content, Sider } = Layout;
const { Title, Text } = Typography;

export const categories = [
  { src: "(1) Product Design.webp", value: "Product Design" },
  { src: "(2) Packaging.webp", value: "Package Design" },
  { src: "(3) Logo design.webp", value: "Logo Design" },
  { src: "(4) Resturant Design.webp", value: "Resturant Design" },
  { src: "(5) Room Design.webp", value: "Room Design" },
  { src: "(6) Store Design.webp", value: "Store Exterior" },
  { src: "(7) Advertisement.webp", value: "Advertisement Design" },
  { src: "(8) App Design.webp", value: "App Design" },
  { src: "(9) Website Design.webp", value: "Website Design" },
  { src: "(10) Flyer Design.webp", value: "Flyer Design" },
  { src: "(11) Business Cards.webp", value: "Business Cards" },
  { src: "(12) Sticker Design.webp", value: "Sticker Design" },
  { src: "(13) Album Art.webp", value: "Album Art" },
  { src: "(14) Signage.webp", value: "Signage Design" },
  { src: "(15) Automotive.webp", value: "Automotive Design" },
  { src: "(16) Fashion.webp", value: "Fashion Design" },
  { src: "(17) Furniture.webp", value: "Furniture Design" },
  { src: "(18) Film Concept Art.webp", value: "Film Concept Art" },
  { src: "(19) Stock Photos.webp", value: "Stock Photos" },
  { src: "(20) Food Photography.webp", value: "Food Photography" },
  { src: "(21) Character Design.webp", value: "Character Design" },
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
    setStorage('image_type', cat.value);
    navigate('/upload');
  }

  return (
    <Content className="text-center max-w-7xl mx-auto p-2 my-5">
      <Row>
        <Col span={24}>
          <h3 className="text-lg sm:text-xl md:text-2xl mb-6">Pick a Category to Explore Your Creativity</h3>
        </Col>
        <Col span={24}>
          <Row gutter={[24, 24]}>
            {categories.map((cat, index) => <Col key={index} span={8}>
              <div className="text-center hover:-m-1">
                <Image preview={false} src={`/imgs/category/${cat.src}`} className="!w-full md:w-[80%] mx-auto bg-gray-300 cursor-pointer rounded shadow-sm hover:shadow-lg" onClick={() => handleNext(cat)} placeholder={true}></Image> <br />
                <h4 className="text-md sm:text-lg md:text-xl mt-2">{cat.value}</h4>
              </div>
            </Col>)}
          </Row>
        </Col>
      </Row>
    </Content>
  );
}

export default Home;

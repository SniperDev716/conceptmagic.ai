import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Image, Layout, Row, Spin, Tag, Typography, Upload } from "antd";
import { getPlan } from "../../../redux/auth/authSlice";
import constants from "../../../config/constants";
import { CloseCircleTwoTone, FileImageOutlined } from "@ant-design/icons";
import { getStorage } from "../../../helpers";
import { generateImage, getConceptById, getImageDescription } from "../../../services/v1API";

const { Content, Sider } = Layout;
const { Title, Text } = Typography;
const { Dragger } = Upload;

function Description() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const plan = useSelector((state) => state.auth.plan);
  const { id } = useParams();

  const [concept, setConcept] = useState({});
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [prevIndex, setPrevIndex] = useState({});

  useEffect(() => {
    getConceptById(id).then(res => {
      setConcept(res.data.concept);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  // useEffect(() => {
  //   // console.log(id, plan);
  //   // if(!plan && !id) {
  //   //     navigate('/plans');
  //   // }
  // }, [plan]);

  // const handleChange = (info) => {
  //   setPercent(parseInt(info.file.percent));
  //   if (info.file.status === "done") {
  //     setPath(info.file.response?.path);
  //   }
  // };

  const handleAdd = (word, index, index1) => {
    let tmp = [...keywords];

    if (prevIndex.index == index) {
      if ((prevIndex.index1 - index1) == 1) {
        let prevWord = tmp.splice(-1, 1);
        let newWord = word + ' ' + prevWord;
        tmp = [...tmp, newWord];
      } else if ((prevIndex.index1 - index1) == -1) {
        let prevWord = tmp.splice(-1, 1);
        let newWord = prevWord + ' ' + word;
        tmp = [...tmp, newWord];
      } else if ((prevIndex.index1 - index1) == 0) {
      } else {
        tmp = [...tmp, word];
      }
    } else {
      tmp = [...tmp, word];
    }
    setKeywords([...tmp]);
    setPrevIndex({ index, index1 });
  }

  const handleDelete = (index) => {
    let tmp = [...keywords];
    tmp.splice(index, 1);
    setKeywords([...tmp]);
  }

  const handleNext = async () => {
    setLoading(true);
    try {
      // let res = await getImageDescription({
      //   path
      // });
      // console.log(res);
      let res = await generateImage(id, { keywords: keywords.join(" ") });
      console.log(res);
      navigate(`/result/${id}`);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }


  return (
    <div className="text-center max-w-5xl w-screen mx-auto p-2">
      <Row gutter={[32, 32]} className="mt-6">
        <Col span={24}>
          <Title level={2}>Click to <span className="bg-green-200 relative">select<span className="text-lg absolute top-[-15px] right-[-15px]"><CloseCircleTwoTone twoToneColor="red" /></span></span> the keywords that best describe what you want to create.</Title>
        </Col>
        <Col span={24}>
          <div className="border-1 border-solid border-gray-300 bg-gray-100 py-2 px-4 text-left">
            {(keywords.length == 0) && "no selected keywords!"}
            {keywords.map((keyword, index) => <Tag className="my-1 relative group/item" key={index}>{keyword} <span className="absolute -top-2 -right-2 cursor-pointer group-hover/item:inline hidden" onClick={() => { handleDelete(index) }}><CloseCircleTwoTone twoToneColor="#F00" /></span></Tag>)}
          </div>
        </Col>
        {concept.inputImages?.map((data, index) => <Fragment key={index}>
          <Col span={6}>
            <Image src={`${constants.SOCKET_URL}${data.path}`} width={'100%'} />
          </Col>
          <Col span={18}>
            <p className="break-words text-lg text-left">
              {data.desc.split(" ").map((word, index1) => <span className="group/item mr-1 hover:bg-green-200 cursor-pointer relative" key={`desc_${index}_${index1}`} onClick={() => handleAdd(word, index, index1)}>{word}
                {/* <span className="absolute top-[-15px] right-[-15px] z-[-10] group-hover/item:z-auto" onClick={() => {
                  alert("Hello")
                }}><CloseCircleTwoTone twoToneColor="red" /></span> */}
              </span>)}
            </p>
          </Col>
        </Fragment>)}
        <Col span={24}>
          <div className="text-center">
            <Button type="primary" size="large" onClick={handleNext} loading={loading}>Next step</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Description;

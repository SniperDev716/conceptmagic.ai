import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Divider, Image, Input, Layout, Row, Spin, Tag, Typography, Upload } from "antd";
import { CloseCircleTwoTone, FileImageOutlined } from "@ant-design/icons";
import { WithContext as ReactTags } from 'react-tag-input';

import { getPlan } from "../../../redux/auth/authSlice";
import constants from "../../../config/constants";
import { getStorage } from "../../../helpers";
import { generateImage, getConceptById, getImageDescription } from "../../../services/v1API";
import { useSocket } from "../../../context/socket";

import loadingGif from "../../../assets/images/loading.gif";

const { TextArea } = Input;
const { Title, Text } = Typography;

const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

function Result() {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const plan = useSelector((state) => state.auth.plan);
  const socket = useSocket();

  const { id } = useParams();

  const [isAdvanced, setIsAdvanced] = useState([]);
  const [concept, setConcept] = useState({});
  const [loading, setLoading] = useState(-1);
  const [keywords, setKeywords] = useState([]);
  const [prevIndex, setPrevIndex] = useState({});
  const [tags, setTags] = useState([]);
  const [advancedValue, setAdvancedValue] = useState([]);
  const [basicValue, setBasicValue] = useState([]);

  useEffect(() => {
    const getImage = () => {
      getConceptById(id).then(res => {
        setConcept(res.data.concept);
        if (res.data.concept) {
          setAdvancedValue(res.data.concept.resultImages.map(data => data.prompt));
          setIsAdvanced(res.data.concept.resultImages.map(() => false));
        }
      }).catch(err => {
        console.log(err);
      });
    }
    getImage();

    if (socket) {
      socket.on('IMAGE_GENERATED', (data) => {
        console.log('IMAGE_GENERATED');
        getImage();
      });
    }

    return () => {
      if (socket) {
        // socket.off('IMAGE_GENERATED');
      }
    }
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

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

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

  const handleRemove = (index) => {
    let tmp = [...keywords];
    tmp.splice(index, 1);
    setKeywords([...tmp]);
  }

  const handleGenerate = async (imageId, index) => {
    setLoading(index);
    try {
      // let res = await getImageDescription({
      //   path
      // });
      // console.log(res);
      let res = await generateImage(id, { keywords: isAdvanced[index] ? advancedValue[index] : basicValue[index], imageId, isAdvanced: isAdvanced[index] });
      // console.log(res);
      setConcept(res.data.concept);
    } catch (error) {
      console.log(error);
    }
    setLoading(-1);
  }


  return (
    <div className="text-center max-w-5xl w-screen mx-auto p-4">
      <Row gutter={[32, 32]} className="mt-6">
        <Col span={24}>
          <Title level={4}>Please wait 30 seconds while our AI Generates your starting image.</Title>
        </Col>
        {/* <Col span={24}>
          <div className="border-1 border-solid border-gray-300 bg-gray-100 py-2 px-4 text-left">
            {(keywords.length == 0) && "no selected keywords!"}
            {keywords.map((keyword, index) => <Tag className="my-1 relative group/item" key={index}>{keyword} <span className="absolute -top-2 -right-2 cursor-pointer group-hover/item:inline hidden" onClick={() => { handleRemove(index) }}><CloseCircleTwoTone twoToneColor="#F00" /></span></Tag>)}
          </div>
        </Col> */}
        <div className="bg-white p-4 rounded shadow mb-4 w-full">
          {(!concept.resultImages?.length) && <div className="w-full h-44 bg-center bg-no-repeat bg-[length:400px_300px]" style={{ backgroundImage: `url(${loadingGif})`, backgroundColor: "#E9E9EB" }}><br /><br /><br /><br /><br /><br /><br /><br />Loading...</div>}
          {concept.resultImages?.map((data, index) => <Row gutter={[12, 12]} key={index}>
            {data.urls.length > 0 && <Image.PreviewGroup>
              {data.urls.map((url, index1) => <Col key={`${index}_${index1}`} span={6}>
                <Image src={`${url}`} width={'100%'} />
              </Col>)}
            </Image.PreviewGroup>}
            {(data.status !== 'completed' && data.status !== 'failed') && new Array(4).fill(0).map((_, index1) => <Col key={`${index}_${index1}`} span={6}><div className="flex justify-center items-center flex-col bg-gray-200  p-5">
              <div className="loader"></div>
              <p className="mb-0">Generating...</p>
            </div></Col>)}
            {data.status == 'failed' && new Array(4).fill(0).map((_, index1) => <Col key={`${index}_${index1}`} span={6}><div className="flex justify-center items-center flex-col bg-gray-200  p-5">
              {/* <div className="loader"></div> */}
              <p className="mb-0">Failed</p>
            </div></Col>)}
            {/* <Col span={24}>
              <p className="break-words text-lg text-left p-2 bg-gray-50 border-l-4 border-0 border-l-gray-600 border-solid">
                {data.prompt.split(" ").map((word, index1) => <span className="group/item mr-1 hover:bg-green-200 cursor-pointer relative" key={`desc_${index}_${index1}`} onClick={() => handleAdd(word, index, index1)}>{word}
                  <span className="absolute top-[-15px] right-[-15px] z-[-10] group-hover/item:z-auto" onClick={() => {
                    alert("Hello");
                  }}><CloseCircleTwoTone twoToneColor="red" /></span>
                </span>)}
              </p>
            </Col> */}
            <Col span={24}>
              {/* <div className="border-1 border-solid border-gray-200 rounded p-2">
                <ReactTags
                  tags={tags}
                  suggestions={data.prompt.split(" ").filter(txt => txt.length > 5).map(txt => ({ id: txt, text: txt }))}
                  delimiters={delimiters}
                  handleDelete={handleDelete}
                  handleAddition={handleAddition}
                  handleDrag={handleDrag}
                  // handleTagClick={handleTagClick}
                  inputFieldPosition="inline"
                  autocomplete
                />
              </div> */}
              <TextArea placeholder={isAdvanced[index] ? "" : "Describe what you want to add, change, or remove from your initial renderings"} autoSize={{ maxRows: 5 }} value={isAdvanced[index] ? advancedValue[index] : basicValue[index]} onChange={(e) => {
                if (isAdvanced[index]) {
                  let tmp = [...advancedValue];
                  tmp[index] = e.target.value;
                  setAdvancedValue(tmp);
                } else {
                  let tmp = [...basicValue];
                  tmp[index] = e.target.value;
                  setBasicValue(tmp);
                }
              }} />

              <div className="mt-1 text-right">
                <Button type="text" onClick={() => {
                  
                  setIsAdvanced((prev) => {
                    prev[index] = !prev[index];
                    return [...prev];
                  });
                }}>{isAdvanced[index] ? "Basic Mode" : "Advanced"}</Button>
              </div>
            </Col>
            <Col span={24}>
              <div className="text-center mb-4">
                <Button type="primary" size="large" onClick={() => handleGenerate(data.imageId, index)} loading={loading == index}>Generate</Button>
              </div>
            </Col>
            <Divider />
          </Row>)}
        </div>
      </Row>
    </div>
  );
}

export default Result;

import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Col, Divider, Image, Input, Layout, Row, Spin, Tag, Typography, Upload } from "antd";
import { CloseCircleTwoTone, FileImageOutlined, FormOutlined } from "@ant-design/icons";
import { WithContext as ReactTags } from 'react-tag-input';

import { getPlan } from "../../../redux/auth/authSlice";
import constants from "../../../config/constants";
import { getStorage } from "../../../helpers";
import { generateImage, getConceptById, getImageDescription } from "../../../services/v1API";
import { useSocket } from "../../../context/socket";

import loadingGif from "../../../assets/images/loading.gif";
import usePrevious from "../../../Hooks/usePrevious";

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
  const [progress, setProgress] = useState({});
  const prevConcept = usePrevious(concept);

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
      socket.on('IMAGE_PROCESS', (data) => {
        console.log('IMAGE_PROCESS');
        if (!progress[data.id]) {
          getImage();
        }
        setProgress(prev => ({
          ...prev,
          [data.id]: {
            ...data,
          }
        }));
      });
    }

    return () => {
      if (socket) {
        socket.off('IMAGE_GENERATED');
        socket.off('IMAGE_PROCESS');
      }
    }
  }, []);

  useEffect(() => {
    if (concept?.resultImages?.length - prevConcept?.resultImages?.length == 1) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [concept?.resultImages?.length]);

  // console.log(advancedValue, isAdvanced);

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
      <Row gutter={[12, 12]} className="sm:mt-6">
        {/* <Col span={24}>
          <h2 className="sm:text-xl md:text-2xl !text-shadow-lg capitalize">{concept.name}</h2>
        </Col> */}
        <Col span={24}>
          {concept.resultImages?.filter(data => data.status == "completed").length > 0 ? <h4 className="bg-purple-500 rounded-full p-2 px-3 !text-white sm:text-lg md:text-xl">These images are <span className="text-black font-bold">AI Generated</span>. Use words to change them however you want.</h4> : <h4 className="sm:text-lg md:text-xl">Please wait 30 seconds while our AI Generates your starting image.</h4>}
        </Col>
        {/* <Col span={24}>
          <div className="border-1 border-solid border-gray-300 bg-gray-100 py-2 px-4 text-left">
            {(keywords.length == 0) && "no selected keywords!"}
            {keywords.map((keyword, index) => <Tag className="my-1 relative group/item" key={index}>{keyword} <span className="absolute -top-2 -right-2 cursor-pointer group-hover/item:inline hidden" onClick={() => { handleRemove(index) }}><CloseCircleTwoTone twoToneColor="#F00" /></span></Tag>)}
          </div>
        </Col> */}
        <div className="bg-white p-4 rounded shadow-none mb-4 w-full">
          {(!concept.resultImages) && <div className="w-full h-44 bg-center bg-no-repeat bg-[length:400px_300px]" style={{ backgroundImage: `url(${loadingGif})`, backgroundColor: "#E9E9EB" }}><br /><br /><br /><br /><br /><br /><br /><br />Loading...</div>}
          {concept.resultImages?.map((data, index) => <Row gutter={[24, 24]} key={index}>
            {data.addition && <Col span={24} className="">
              <p className="mb-0 text-left p-2 border-l-4 border-0 border-solid border-l-gray-500 bg-gray-100 text-gray-700 rounded-r-full">{data.addition}</p>
            </Col>}
            {data.urls?.length > 0 && <Image.PreviewGroup>
              {data.urls?.map((url, index1) => <Col key={`${index}_${index1}`} span={6}>
                <Image src={`${url}`} placeholder={<Image preview={false} src="data:image/png;base64,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" width={'100%'} />} width={'100%'} />
                {/* <div className="mt-2 text-center"><Button icon={<FormOutlined />}>Select</Button></div> */}
              </Col>)}
            </Image.PreviewGroup>}
            {(data.status !== 'completed' && data.status !== 'failed') && (data.parent ? concept.resultImages.filter(image => image.imageId == data.parent)[0].urls.map((url, index1) => <Col key={`${index}_${index1}`} span={6}><div className="relative flex justify-center items-center flex-col bg-gray-200">
              <img src={`${url}`} className="w-full blur" alt="product" />
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
                <div className="loader"></div>
                <p className="mb-0 text-white mt-2">{progress[data.imageId] ? `${progress[data.imageId].status}${progress[data.imageId].status == 'generating' ? ` (${progress[data.imageId].progress}%)` : ''}...` : `${data.status}...`}</p>
              </div>
            </div></Col>) : new Array(4).fill(0).map((_, index1) => <Col key={`${index}_${index1}`} span={6}><div className="flex justify-center items-center flex-col bg-gray-200 relative">
              <img src={concept.inputImages[0].path.includes('https://') ? `${concept.inputImages[0].path}` : `${constants.SOCKET_URL}${concept.inputImages[0].path}`} className="w-full blur" alt="product" />
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
                <div className="loader"></div>
                <p className="mb-0 text-white mt-2">{progress[data.imageId] ? `${progress[data.imageId].status}${progress[data.imageId].status == 'generating' ? ` (${progress[data.imageId].progress}%)` : ''}...` : `${data.status}...`}</p>
              </div>
            </div></Col>))}
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
              }}
                // autoFocus
                disabled={data.status != 'completed' && data.status != 'failed'}
              />
              <div className="mt-1 text-right">
                <Button type="text"
                  disabled={data.status != 'completed' && data.status != 'failed'}
                  onClick={() => {
                    setIsAdvanced((prev) => {
                      // prev[index] = !prev[index];
                      let tmp = [...prev];
                      tmp[index] = !tmp[index];
                      return [...tmp];
                    });
                  }}>{isAdvanced[index] ? "Basic Mode" : "Advanced"}</Button>
              </div>
            </Col>
            <Col span={24}>
              <div className="text-center mb-4">
                <Button type="primary" size="" onClick={() => handleGenerate(data.imageId, index)} loading={loading == index}>Generate</Button>
              </div>
              <Divider />
            </Col>
          </Row>)}
        </div>
      </Row>
    </div>
  );
}

export default Result;

import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames";

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

const ordersText = ['1st', '2nd', '3rd'];

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
  const isDarkMode = useSelector(state => state.app.isDarkMode);

  const [isAdvanced, setIsAdvanced] = useState([]);
  const [concept, setConcept] = useState({});
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(-1);
  const [keywords, setKeywords] = useState([]);
  const [prevIndex, setPrevIndex] = useState({});
  const [tags, setTags] = useState([]);
  const [advancedValue, setAdvancedValue] = useState([]);
  const [basicValue, setBasicValue] = useState([]);
  const [progress, setProgress] = useState({});
  const prevConcept = usePrevious(concept);
  const prevProgress = usePrevious(progress);

  useEffect(() => {
    getImage();
  }, []);

  useEffect(() => {
    if (socket) {
      console.log('socket event added!');
      socket.on('IMAGE_GENERATED', (data) => {
        console.log('IMAGE_GENERATED');
        getImage();
        setCount(data.count);
      });
      socket.on('IMAGE_PROCESS', (data) => {
        console.log('IMAGE_PROCESS'/* , data.url */);
        if (!progress[data.id]) {
          getImage();
        }
        setCount(data.count);
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
        console.log('socket event removed!');
        socket.off('IMAGE_GENERATED');
        socket.off('IMAGE_PROCESS');
      }
    }
  }, [socket]);


  const getImage = () => {
    getConceptById(id).then(res => {
      setConcept(res.data.concept);
      // setCount(res.data.count);
      if (res.data.concept) {
        setAdvancedValue((prev) => res.data.concept.resultImages.map((data, index) => prev[index] ? prev[index] : data.prompt));
        setIsAdvanced((prev) => {
          return res.data.concept.resultImages.map((_, index) => prev[index] ? true : false);
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  useEffect(() => {
    if (concept?.resultImages?.length - prevConcept?.resultImages?.length == 1) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [concept?.resultImages?.length]);

  // useEffect(() => {
  //   console.log(isAdvanced);
  // }, [isAdvanced])

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
    <div className="text-center max-w-7xl w-screen mx-auto p-4">
      <Row gutter={[12, 12]} className="sm:mt-6">
        {/* <Col span={24}>
          <h2 className="sm:text-xl md:text-2xl !text-shadow-lg capitalize">{concept.name}</h2>
        </Col> */}
        <Col span={24}>
          {(concept.resultImages?.filter(data => (data.status == "completed" || data.status == "faild")).length > 0 || (Object.values(progress).filter(pro => pro.status == 'generating')).length > 0) ? <h4 className="bg-purple-400 rounded-full p-2 px-3 !text-white sm:text-lg md:text-xl">These images are <span className="text-black font-bold">AI Generated</span>. Use words to change them however you want.</h4> : <h4 className="bg-purple-400 rounded-full p-2 px-3 !text-white sm:text-lg md:text-xl">You are <span className="text-black font-bold">{ordersText[count < 6 ? 6 : count] || `${count < 6 ? 6 : count + 1}th`}</span> in line for the <span className="text-black font-bold">Free Tier</span>. Please wait 3 minutes or <span className="text-purple-800 font-bold">Upgrade to PRO</span>.</h4>}
        </Col>
        {/* <Col span={24}>
          <div className="border-1 border-solid border-gray-300 bg-gray-100 py-2 px-4 text-left">
            {(keywords.length == 0) && "no selected keywords!"}
            {keywords.map((keyword, index) => <Tag className="my-1 relative group/item" key={index}>{keyword} <span className="absolute -top-2 -right-2 cursor-pointer group-hover/item:inline hidden" onClick={() => { handleRemove(index) }}><CloseCircleTwoTone twoToneColor="#F00" /></span></Tag>)}
          </div>
        </Col> */}
        <div className={classNames("p-4 rounded shadow-none mb-4 w-full", isDarkMode ? "bg-gray-800" : "bg-white")}>
          {(!concept.resultImages) && <div className="w-full h-44 bg-center bg-no-repeat bg-[length:400px_300px]" style={{ backgroundImage: `url(${loadingGif})`, backgroundColor: "#E9E9EB" }}><br /><br /><br /><br /><br /><br /><br /><br />Loading...</div>}
          {concept.resultImages?.map((data, index) => <Row gutter={[24, 24]} key={index}>
            {index == 1 && <Col span={24}>
              <div className="bg-black text-white p-2 rounded text-lg">We've automatically created 10 versions of your initial image to show you what is possible. Read the text above each image set to see the changes we told the AI to make for each version.</div>
            </Col>}
            {data.addition && <Col span={24} className="">
              <p className={classNames("mb-0 text-left p-2 border-l-4 border-0 border-solid rounded-r-full", isDarkMode ? "border-l-gray-300 bg-gray-700 text-gray-300" : "border-l-gray-500 bg-gray-100 text-gray-700")}>{data.addition}</p>
            </Col>}
            {data.urls?.length > 0 && <Col span={24}>
              <div className="relative">
                <span className="top-0 left-0 z-50 absolute text-white p-2 bg-purple-800 rounded-br-xl shadow-lg">{index + 1}</span>
                <Image.PreviewGroup>
                  <Row gutter={[12, 12]}>
                    {data.urls?.map((url, index1) => <Col key={`${index}_${index1}`} span={6}>
                      <Image src={`${constants.SOCKET_URL}/image/${url.split('/')[url.split('/').length - 2]}/${url.split('/')[url.split('/').length - 1]}?w=170&h=170`} preview={{ src: `${url}` }} /* placeholder={<Image preview={false} src={`${constants.SOCKET_URL}/image/${url.split('/')[url.split('/').length - 2]}/${url.split('/')[url.split('/').length - 1]}?w=100&h=100`} width={'100%'} />} */ width={'100%'} />
                      {/* <div className="mt-2 text-center"><Button icon={<FormOutlined />}>Select</Button></div> */}
                    </Col>)}
                  </Row>
                </Image.PreviewGroup>
              </div>
            </Col>}
            {(data.status !== 'completed' && data.status !== 'failed') && <Col span={24}>
              <div className="relative">
                <span className="top-0 left-0 z-50 absolute text-white p-2 bg-purple-800 rounded-br-xl shadow-lg">{index + 1}</span>
                <Row gutter={[12, 12]}>
                  {(data.parent ? ((concept.resultImages.filter(image => image.imageId == data.parent)[0].urls.length > 0 && index > 10) ? concept.resultImages.filter(image => image.imageId == data.parent)[0].urls.map((url, index1) => <Col key={`${index}_${index1}`} span={6}>
                    <div className="relative flex justify-center items-center flex-col bg-gray-200">
                      <div className="relative overflow-hidden"><Image src={`${progress[data.imageId]?.url ? progress[data.imageId].url : url}`} preview={false} fallback={concept.inputImages[0].path.includes('https://') ? `${concept.inputImages[0].path}` : `${constants.SOCKET_URL}${concept.inputImages[0].path}`} className={`transition-[filter] duration-1000 ease-in-out w-full clip_${prevProgress[data.imageId]?.url ? index1 : ''}`} alt="product" style={{
                        filter: `blur(${prevProgress[data.imageId]?.url ? '2px' : '23px'})`
                      }} /></div>
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
                        <span className="loader"></span>
                        <p className="mb-0 text-white mt-2">{progress[data.imageId] ? `${progress[data.imageId].status}${progress[data.imageId].status == 'generating' ? ` (${progress[data.imageId].progress}%)` : ''}...` : `${data.status}...`}</p>
                      </div>
                    </div>
                  </Col>) : new Array(4).fill(concept.inputImages[0].path.includes('https://') ? `${concept.inputImages[0].path}` : `${constants.SOCKET_URL}${concept.inputImages[0].path}`).map((url, index1) => <Col key={`${index}_${index1}`} span={6}>
                    <div className="relative flex justify-center items-center flex-col bg-gray-200">
                      <div className="relative overflow-hidden"><Image src={`${progress[data.imageId]?.url ? progress[data.imageId].url : url}`} preview={false} fallback={concept.inputImages[0].path.includes('https://') ? `${concept.inputImages[0].path}` : `${constants.SOCKET_URL}${concept.inputImages[0].path}`} className={`transition-[filter] duration-1000 ease-in-out w-full clip_${prevProgress[data.imageId]?.url ? index1 : ''}`} alt="product" style={{
                        filter: `blur(${prevProgress[data.imageId]?.url ? '2px' : '23px'})`
                      }} /></div>
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
                        <div className="loader"></div>
                        <p className="mb-0 text-white mt-2">{progress[data.imageId] ? `${progress[data.imageId].status}${progress[data.imageId].status == 'generating' ? ` (${progress[data.imageId].progress}%)` : ''}...` : `${data.status}...`}</p>
                      </div>
                    </div>
                  </Col>)) : new Array(4).fill(0).map((_, index1) => <Col key={`${index}_${index1}`} span={6}><div className="flex justify-center items-center flex-col bg-gray-200 relative">
                    <div className="relative overflow-hidden"><Image src={`${progress[data.imageId]?.url || (concept.inputImages[0].path.includes('https://') ? `${concept.inputImages[0].path}` : `${constants.SOCKET_URL}${concept.inputImages[0].path}`)}`} preview={false} fallback={concept.inputImages[0].path.includes('https://') ? `${concept.inputImages[0].path}` : `${constants.SOCKET_URL}${concept.inputImages[0].path}`} className={`transition-[filter] duration-1000 ease-in-out w-full clip_${prevProgress[data.imageId]?.url ? index1 : ''}`} alt="product" style={{
                      filter: `blur(${prevProgress[data.imageId]?.url ? '2px' : '23px'})`
                    }} /></div>
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
                      <div className="loader"></div>
                      <p className="mb-0 text-white mt-2">{progress[data.imageId] ? `${progress[data.imageId].status}${progress[data.imageId].status == 'generating' ? ` (${progress[data.imageId].progress}%)` : ''}...` : `${data.status}...`}</p>
                    </div>
                  </div></Col>))}
                </Row>
              </div>
            </Col>}
            {data.status == 'failed' && <Col span={24}>
              <div className="relative">
                <span className="top-0 left-0 z-50 absolute text-white p-2 bg-purple-800 rounded-br-xl shadow-lg">{index + 1}</span>
                <Row gutter={[12, 12]}>
                  {new Array(4).fill(0).map((_, index1) => <Col key={`${index}_${index1}`} span={6}><div className="flex justify-center items-center flex-col bg-gray-200  p-5">
                    {/* <div className="loader"></div> */}
                    <p className="mb-0">Failed</p>
                  </div></Col>)}
                </Row>
              </div>
            </Col>}
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
              <div className="text-center mb-4">
                <Button disabled={(data.status != 'completed' && data.status != 'failed') || loading == index} type="primary" size="" onClick={() => handleGenerate(data.imageId, index)} loading={loading == index}>Generate</Button>
              </div>
              <Divider />
            </Col>
          </Row>)}
          {/* {concept.resultImages?.length == 1 && new Array(10).fill(0).map((_, index) => {
            return (<Row gutter={[24, 24]} key={index}>
              {new Array(4).fill(0).map((_, index1) => <Col key={`${index}_${index1}`} span={6}><div className="flex justify-center items-center flex-col bg-gray-200 relative">
                <img src={concept.inputImages[0].path.includes('https://') ? `${concept.inputImages[0].path}` : `${constants.SOCKET_URL}${concept.inputImages[0].path}`} className="w-full blur-xl" alt="product" />
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
                  <div className="loader"></div>
                  <p className="mb-0 text-white mt-2">processing...</p>
                </div>
              </div></Col>)}
              <Col span={24}>
                <TextArea placeholder={"Describe what you want to add, change, or remove from your initial renderings"} autoSize={{ maxRows: 5 }}
                  disabled
                />
                <div className="mt-1 text-right">
                  <Button type="text"
                    disabled>Advanced</Button>
                </div>
                <div className="text-center mb-4">
                  <Button type="primary" size="" disabled>Generate</Button>
                </div>
                <Divider />
              </Col>
            </Row>)
          })} */}
        </div>
      </Row>
    </div>
  );
}

export default Result;

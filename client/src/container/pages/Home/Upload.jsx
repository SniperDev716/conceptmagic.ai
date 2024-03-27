import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Divider, Image, Input, Layout, Row, Skeleton, Spin, Typography, Upload, message } from "antd";
import { FileImageOutlined, SelectOutlined, UploadOutlined } from "@ant-design/icons";
import Gallery from "react-photo-gallery";
import InfiniteScroll from "react-infinite-scroll-component";
import $ from "jquery";

import constants from "../../../config/constants";
import { getStorage } from "../../../helpers";
import { getPlan } from "../../../redux/auth/authSlice";
import { deleteFile, getImageDescription, getImagesfromPin } from "../../../services/v1API";
import SelectedImage from "./Partials/SelectedImage";

const { Content, Sider } = Layout;
const { Title, Text } = Typography;
const { Dragger } = Upload;

function UploadContainer() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const plan = useSelector((state) => state.auth.plan);
  // const { id } = useParams();

  // const [percent, setPercent] = useState(0);
  const [search, setSearch] = useState(getStorage("image_type") || "Product Renderings");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pinLoading, setPinLoading] = useState(false);
  const [fileLists, setFileLists] = useState([]);
  const [name, setName] = useState("");
  const [path, setPath] = useState("");
  const [pinImages, setPinImages] = useState([]);
  const [setting, setSetting] = useState({});
  const [selected, setSelected] = useState(-1);

  const getPinImages = (flag = false) => {
    let data = { query: search };
    if (!flag) {
      data = { ...data, ...setting };
      setLoadingMore(true);
    } else {
      $("#imagelistview .infinite-scroll-component").scrollTop(0);
      setPinLoading(true);
    }
    getImagesfromPin(data).then(res => {
      // console.log(res.data);
      if (flag) {
        setPinImages(res.data.images);
      } else {
        setPinImages([...pinImages, ...res.data.images]);
      }
      setSetting({
        bookmarks: res.data.bookmarks,
        token: res.data.token,
        cookie: res.data.cookie,
      });
      // console.log(res.data.bookmarks);
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      setPinLoading(false);
      setLoadingMore(false);
    });
  };

  useEffect(() => {
    // dispatch(getPlan());
    getPinImages(true);
  }, []);

  // useEffect(() => {
  //   // setSetting({});
  // }, [search]);


  // useEffect(() => {
  //   // console.log(id, plan);
  //   // if(!plan && !id) {
  //   //     navigate('/plans');
  //   // }
  // }, [plan]);

  const handleSearch = () => {
    getPinImages(true);
  }

  const handleChange = (info) => {
    if (info.file.status === "done") {
      setPath(info.file.response?.path);
      info.file.thumbUrl = `${constants.SOCKET_URL}${info.file.response?.path}`;
    }
    setFileLists(info.fileList.length == 1 ? info.fileList : info.fileList.splice(1, 1));
    setSelected(-1);
  };

  const handleDelete = (file) => {
    deleteFile({
      path: file.response?.path,
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleNext = async () => {
    if (loading) return;
    if (!name) return message.warning('Please input name your project!');
    let data = fileLists.filter(file => file.status == 'done').map(file => file.response?.path);
    if (data.length == 0 && selected == -1) return message.warning("Please choose your inspiration image");
    setLoading(true);
    try {
      let res = await getImageDescription({
        fileLists: selected == -1 ? data : [pinImages[selected].src],
        name
      });
      // console.log(res);
      navigate(`/result/${res.data.id}`);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <div className="text-center max-w-5xl w-screen mx-auto px-6 md:px-2 p-2">
      <Row gutter={[24, 24]} className="mt-6">
        <Col span={24}>
          <Title level={3}>Select an image that you'd like to use as a starting point.</Title>
        </Col>
        <Col span={24} className="relative">
          <div className="max-w-xl absolute z-50 right-10 top-5">
            <Input.Search size="large" className="[&_input]:opacity-70 [&_input:hover]:opacity-100 [&_input:focus]:opacity-100" onSearch={() => handleSearch()} loading={pinLoading} value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div id="imagelistview" className="max-h-[calc(100vh_-_425px)] overflow-y-auto overflow-x-hidden border-4 border-solid border-blue-400 rounded-lg">
            {/* <Row gutter={[32, 32]}>
              {pinImages.map((image, index) => <Col span={6}>
                <Image src={image} alt="pin" />
              </Col>)}
            </Row> */}
            {/* {pinImages.map((image, index) => <img key={index} src={image} alt={'pin'} className="w-1/4"/>)} */}
            <InfiniteScroll
              dataLength={pinImages.length}
              next={() => { getPinImages() }}
              hasMore={true}
              scrollableTarget="imagelistview"
              height="calc(100vh - 440px)"
              loader={
                <div className="mt-2 flex">
                  <div className="w-1/4 p-1">
                    <Skeleton.Image
                      className="!w-full"
                      key={Date.now()}
                      active
                      loading={loadingMore}
                    />
                  </div>
                  <div className="w-1/4 p-1">
                    <Skeleton.Image
                      className="!w-full"
                      key={Date.now()}
                      active
                      loading={loadingMore}
                    />
                  </div>
                  <div className="w-1/4 p-1">
                    <Skeleton.Image
                      className="!w-full"
                      key={Date.now()}
                      active
                      loading={loadingMore}
                    />
                  </div>
                  <div className="w-1/4 p-1">
                    <Skeleton.Image
                      className="!w-full"
                      key={Date.now()}
                      active
                      loading={loadingMore}
                    />
                  </div>
                </div>
              }
              // endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
              scrollThreshold={1}
            // useWindow={false}
            >
              {pinImages.length > 0 && <Gallery photos={pinImages} direction="column" columns={4} onClick={(e) => {
                console.log(e.target, arguments);
              }}
                renderImage={({ index, left, top, key, photo }) => {
                  return (
                    <SelectedImage
                      selected={selected}
                      key={key}
                      margin={"2px"}
                      direction="column"
                      index={index}
                      photo={photo}
                      left={left}
                      top={top}
                      onClick={(pos) => {
                        setSelected(pos);
                        setFileLists([]);
                      }}
                    />
                  )
                }}
              />}
            </InfiniteScroll>
          </div>
        </Col>
        <Divider className="!m-0">Or</Divider>
        <Col span={24}>
          <Upload
            name="file"
            multiple={false}
            fileList={fileLists}
            action={`${constants.HOST_URL}v1/upload`}
            showUploadList={true}
            listType="picture"
            accept="image/*"
            headers={{
              Authorization: getStorage("token"),
            }}
            data={{
              oldFile: path,
            }}
            onChange={handleChange}
            onRemove={handleDelete}>
            <Button className="" size="large" icon={<UploadOutlined />}>Choose from your computer</Button>
          </Upload>
        </Col>
        <Col span={24}>
          <Input
            type="text"
            className="text-center"
            size="large"
            placeholder="Name Your Project..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Col>
        {/* <Col span={24}>
        </Col> */}
        {/* {path && <Col span={12}>
          <Image src={`${constants.SOCKET_URL}${path}`} width={'100%'} />
        </Col>} */}
        <Col span={24}>
          <div className="text-center">
            <Button type="primary" size="large" onClick={handleNext} loading={loading}>Next step</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default UploadContainer;

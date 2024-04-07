import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Badge, Button, Card, Col, Image, Layout, Row, Spin, Typography } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { getProjects } from "../../../services/v1API";
import constants from "../../../config/constants";
import { getPlans } from "../../../redux/plan/planSlice";
import { getUserSubscription } from "../../../services/planAPI";
import { setOpenPayModal } from "../../../redux/app/appSlice";

const { Meta } = Card;
const { Content } = Layout;
const { Title, Text } = Typography;

function Project() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openPayModal = useSelector(state => state.app.openPayModal);
  // const user = useSelector(state => state.auth.user);
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actSub, setActSub] = useState({});
  const [selSub, setSelSub] = useState({});

  useEffect(() => {
    setLoading(true);
    getProjects(id).then(res => {
      setProjects(res.data.projects);
      setUser(res.data.user);
      // if (res.data.projects.length == 0) {
      //   navigate('/welcome');
      // }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    });

    getUserSubscription().then(res => {
      setActSub(res.data.activeSubscription ?? {});
      setSelSub(res.data.selectedSubscription ?? {});
    });
  }, []);

  const setOpenModal = () => {
    dispatch(setOpenPayModal());
  }

  return (
    <Content className="text-center max-w-7xl w-screen mx-auto px-6 sm:px-2 p-2">
      <Row gutter={[24, 24]} className="md:mt-6 items-stretch">
        <Col span={24}>
          <h2 className="text-xl md:text-2xl">{(id && user) ? `${user.name}'s` : 'My'} Projects</h2>
          <div className="text-right">
            {/* <Link to={`/home`}> */}
            <Button onClick={() => {
              return navigate('/home');
              // if (user.activeSubscription) {
              // }
              // setOpenModal();
            }} type="primary" icon={<FileAddOutlined />}>New Project</Button>
            {/* </Link> */}
          </div>
        </Col>
        {loading &&
          <Col span={24}>
            <Spin spinning={loading} size="large"></Spin>
          </Col>
        }
        {projects.map((proj, index) => <Col md={6} sm={8} xs={12} key={index}>
          <Link to={`/result/${proj._id}`}>
            <Badge.Ribbon text={`${(proj.resultImages.filter(img => img.status == 'completed' || img.status == 'failed')).length}/${proj.resultImages.length}`} color="purple">
              <Card
                hoverable
                key={index}
                style={{
                  width: "100%",
                  height: "100%"
                }}
                cover={<div className="h-[150px] md:h-[200px] bg-cover bg-no-repeat bg-blue-200" style={{ backgroundImage: proj.inputImages[0].path.includes('https://') ? `url(${proj.inputImages[0].path})` : `url(${constants.SOCKET_URL}${proj.inputImages[0].path})` }}></div>}
              >
                {/* <img alt="image" className=" w-auto" src={} /> */}
                <Meta title={proj.name || "Untitled"} description={<small>{dayjs(proj.createdAt).format("MM/DD/YY hh:mm A")}</small>} />
              </Card>
            </Badge.Ribbon>
          </Link>
        </Col>)}
        {(!loading && projects.length == 0) && <Col span={24}>
          <h1>No Prjects</h1>
        </Col>}
      </Row>
    </Content>
  );
}

export default Project;

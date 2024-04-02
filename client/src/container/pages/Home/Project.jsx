import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Image, Layout, Row, Spin, Typography } from "antd";

import { getProjects } from "../../../services/v1API";
import constants from "../../../config/constants";
import { FileAddOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PayModal from "./Partials/PayModal";
import { getPlans } from "../../../redux/plan/planSlice";
import { getUserSubscription } from "../../../services/planAPI";

const { Meta } = Card;

const { Title, Text } = Typography;

const stripePromise = loadStripe(constants.stripePK);

function Project() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const plans = useSelector(state => state.plan.plans ?? []);

  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actSub, setActSub] = useState({});
  const [selSub, setSelSub] = useState({});

  useEffect(() => {
    setLoading(true);
    getProjects(id).then(res => {
      setProjects(res.data.projects);
      // if (res.data.projects.length == 0) {
      //   navigate('/welcome');
      // }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    });

    if (plans.length === 0) {
      dispatch(getPlans());
    }
    getUserSubscription().then(res => {
      setActSub(res.data.activeSubscription ?? {});
      setSelSub(res.data.selectedSubscription ?? {});
    });
  }, []);

  return (
    <div className="text-center max-w-5xl w-screen mx-auto px-6 sm:px-2 p-2">
      <Row gutter={[24, 24]} className="md:mt-6 items-stretch">
        <Col span={24}>
          <h2 className="text-xl md:text-2xl">My Projects</h2>
          <div className="text-right">
            <Link to={`/home`}>
              <Button /* onClick={() => { setOpen(true) }} */ type="primary" icon={<FileAddOutlined />}>New Project</Button>
            </Link>
          </div>
        </Col>
        {loading &&
          <Col span={24}>
            <Spin spinning={loading} size="large" tip="Loading...">
              <div className="p-5"></div>
            </Spin>
          </Col>
        }
        {projects.map((proj, index) => <Col md={6} sm={8} xs={12} key={index}>
          <Link to={`/result/${proj._id}`}>
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
          </Link>
        </Col>)}
        {(!loading && projects.length == 0) && <Col span={24}>
          <h1>No Prjects</h1>
        </Col>}
      </Row>
      <Elements stripe={stripePromise} nonce="random-nonce">
        <PayModal
          open={open}
          setOpen={setOpen}
          price={plans[0]?.price}
          planId={plans[0]?._id}
          setSuccessful={() => { }}
        />
      </Elements>
    </div>
  );
}

export default Project;

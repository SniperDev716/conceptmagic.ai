import React, { useEffect } from "react";
import { Button, Layout } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { ArrowLeftOutlined, FileAddOutlined, MoonFilled, PlusOutlined } from "@ant-design/icons";
import ScrollToTop from "react-scroll-to-top";
import PayModal from "../pages/Home/Partials/PayModal";

import constants from "../../config/constants";
import UserMenu from "./partials/UserMenu";
import { setDarkMode, setOpenPayModal } from "../../redux/app/appSlice";
import { getPlans } from "../../redux/plan/planSlice";

import LogoSrc from "../../assets/images/logo.png";
import smLogoSrc from "../../assets/images/logo-sm.png";

const { Header } = Layout;

const stripePromise = loadStripe(constants.stripePK);

function AuthLayout({ children }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDarkMode = useSelector(state => state.app.isDarkMode);
  const openPayModal = useSelector(state => state.app.openPayModal);
  const user = useSelector(state => state.auth.user);
  const plans = useSelector(state => state.plan.plans ?? []);

  useEffect(() => {
    if (plans.length === 0) {
      dispatch(getPlans());
    }
  }, [])

  const changeTheme = () => {
    dispatch(setDarkMode());
  }

  const setOpenModal = () => {
    dispatch(setOpenPayModal());
  }

  return (
    <>
      <Layout className="min-h-screen">
        <Header className={classNames("shadow sticky px-0 top-0 z-[999]", !isDarkMode && "bg-white")}>
          <div className="flex items-center justify-between px-2 max-w-7xl mx-auto">
            <div className={classNames("demo-logo h-[64px] mb-2", !isDarkMode && "bg-white")}>
              <Link to="/projects" className="hidden sm:inline">
                <img src={LogoSrc} alt="logo" className="w-[64px] p-3" />
              </Link>
              <Link to="/projects" className="inline sm:hidden">
                <img src={smLogoSrc} alt="logo" className="w-[64px] p-3" />
              </Link>
            </div>
            <div className="flex items-center">
              <div className="mr-2 sm:mr-6"><Button type="" onClick={changeTheme} shape="circle" icon={<MoonFilled />}></Button></div>
              <div>
                <Link to="/projects" className="mr-2 sm:mr-6">
                  My Projects
                </Link>
              </div>
              <div className="mr-2 sm:mr-6">
                <Button type="primary" icon={<FileAddOutlined />} onClick={() => {
                  return navigate('/home');
                  // if (user.activeSubscription) {
                  // }
                  // setOpenModal();
                }}>New Project</Button>
              </div>
              <UserMenu />
            </div>
          </div>
        </Header>
        <div onClick={() => {
          navigate(-1);
        }} className={classNames("sticky w-[75px] cursor-pointer top-20 -ml-11 hover:ml-0 ease-in-out transition-[margin] z-[998] px-2.5 py-2 rounded-e-3xl", isDarkMode ? "bg-gray-100" : "bg-gray-300")}>
          <span>Back</span> &nbsp; <ArrowLeftOutlined />
        </div>
        <Layout>
          {children}
        </Layout>
        <ScrollToTop smooth className="animate-bounce" />
        <Elements stripe={stripePromise} nonce="random-nonce">
          <PayModal
            open={openPayModal}
            setOpen={setOpenModal}
            price={plans[0]?.price}
            planId={plans[0]?._id}
            setSuccessful={() => { }}
          />
        </Elements>
      </Layout>
    </>
  );
}

export default AuthLayout;

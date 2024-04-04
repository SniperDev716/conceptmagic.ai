import React from "react";
import { Button, Layout } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { FileAddOutlined, MoonFilled, PlusOutlined } from "@ant-design/icons";
import ScrollToTop from "react-scroll-to-top";

import LogoSrc from "../../assets/images/logo.png";
import smLogoSrc from "../../assets/images/logo-sm.png";
import UserMenu from "./partials/UserMenu";
import { setDarkMode } from "../../redux/app/appSlice";

const { Header } = Layout;

function AuthLayout({ children }) {

  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.app.isDarkMode);

  const changeTheme = () => {
    dispatch(setDarkMode());
  }

  return (
    <Layout className="min-h-screen">
      <Header className={classNames("shadow sticky px-0 top-0 z-[999]", !isDarkMode && "bg-white")}>
        <div className="flex items-center justify-between px-2 max-w-7xl mx-auto">
          <div className={classNames("demo-logo h-[64px] mb-2", !isDarkMode && "bg-white")}>
            <Link to="/home" className="hidden sm:inline">
              <img src={LogoSrc} alt="logo" className="w-[64px] p-3" />
            </Link>
            <Link to="/home" className="inline sm:hidden">
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
            <div>
              <Link to="/home" className="mr-2 sm:mr-6">
                <Button type="primary" icon={<FileAddOutlined />}>New Project</Button>
              </Link>
            </div>
            <UserMenu />
          </div>
        </div>
      </Header>
      <Layout>{children}</Layout>
      <ScrollToTop smooth className="animate-bounce" />
    </Layout>
  );
}

export default AuthLayout;

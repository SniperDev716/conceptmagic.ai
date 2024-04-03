import React from "react";
import { Button, Layout } from "antd";
import { Link } from "react-router-dom";

import { FileAddOutlined, PlusOutlined } from "@ant-design/icons";
import ScrollToTop from "react-scroll-to-top";

import LogoSrc from "../../assets/images/logo.png";
import smLogoSrc from "../../assets/images/logo-sm.png";
import UserMenu from "./partials/UserMenu";

const { Header } = Layout;

function AuthLayout({ children }) {
  return (
    <Layout className="min-h-screen">
      <Header className="bg-white flex items-center justify-between px-[20px] shadow sticky top-0 z-[9999]">
        <div className="demo-logo h-[64px] bg-white mb-2">
          <Link to="/" className="hidden sm:inline">
            <img src={LogoSrc} alt="logo" className="w-[64px] p-3" />
          </Link>
          <Link to="/" className="inline sm:hidden">
            <img src={smLogoSrc} alt="logo" className="w-[64px] p-3" />
          </Link>
        </div>
        <div className="flex items-center">
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
      </Header>
      <Layout>{children}</Layout>
      <ScrollToTop smooth className="animate-bounce" />
    </Layout>
  );
}

export default AuthLayout;

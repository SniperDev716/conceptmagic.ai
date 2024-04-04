import React, { Suspense, useEffect, memo, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames";
// import HashLoader from "react-spinners/HashLoader";
import { ConfigProvider, theme } from "antd";
import { HappyProvider } from '@ant-design/happy-work-theme';

import "./App.css";
import PublicRoute from "./container/routes/PublicRoute";
import PrivateRoute from "./container/routes/PrivateRoute";
import ProtectedRoutes from "./container/routes/ProtectedRoutes";
import Login from "./container/pages/Auth/Login";
import Register from "./container/pages/Auth/Register";
import themeOverrides from "./config/themeOverrides";
import { SocketProvider } from "./context/socket";

const { defaultAlgorithm, darkAlgorithm } = theme;

const App = () => {

  const isDarkMode = useSelector(state => state.app.isDarkMode);

  return (
    <HappyProvider>
      <ConfigProvider theme={{ ...themeOverrides, algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm }}>
        <SocketProvider>
          <Router>
            <Suspense
              fallback={
                <div className={classNames("w-screen h-screen flex items-center justify-center", isDarkMode ? "bg-gray-800" : "bg-white")}>
                  <span className="loader1"></span>
                </div>
              }
            >
              <Routes>
                <Route element={<PublicRoute />}>
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/register" element={<Register />} />
                </Route>
                <Route element={<PrivateRoute />}>
                  <Route exact path="/*" element={<ProtectedRoutes />} />
                </Route>
                <Route exact path="/" element={<Navigate to="/login" />} />
              </Routes>
            </Suspense>
          </Router>
        </SocketProvider>
      </ConfigProvider>
    </HappyProvider>
  );
};

export default memo(App);

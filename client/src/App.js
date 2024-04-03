import React, { Suspense, useEffect, memo, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import HashLoader from "react-spinners/HashLoader";
import { ConfigProvider, message } from "antd";

import "./App.css";
import store from "./redux/store";
import PublicRoute from "./container/routes/PublicRoute";
import PrivateRoute from "./container/routes/PrivateRoute";
import ProtectedRoutes from "./container/routes/ProtectedRoutes";
import Login from "./container/pages/Auth/Login";
import Register from "./container/pages/Auth/Register";
import themeOverrides from "./config/themeOverrides";
import { SocketProvider } from "./context/socket";

const storeProvider = store();

const App = () => {

  return (
    <Provider store={storeProvider}>
      <ConfigProvider theme={themeOverrides}>
        <SocketProvider>
          <Router>
            <Suspense
              fallback={
                <div className="w-screen h-screen flex items-center justify-center bg-[#0000]">
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
    </Provider>
  );
};

export default memo(App);

import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { message } from "antd";

import constants from "../config/constants";
import { getStorage } from "../helpers";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [isConnected, setConnected] = useState(false);
  const socket = useRef(null);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  useEffect(() => {
    if (isAuthenticated && !isConnected) {
      socket.current = io(constants.SOCKET_URL, {
        query: {
          token: getStorage("token"),
        },
      });

      socket.current.on("connect", () => {
        console.info(`connected`);
        setConnected(true);
      });

      socket.current.on("disconnect", () => {
        // window.location.reload();
        console.info(`disconnected`);
        setConnected(false);
      });

      socket.current.on("error", (err) => {
        console.log("Socket Error:", err.message);
      });

      // socket.current.on('IMAGE_GENERATED', (data) => {
      //   // message.warning(data.message, 5);
      // });
    }

    return () => {
      if (socket.current && socket.current.connected && !isAuthenticated) {
        socket.current.disconnect();
      }
    };
  }, [isAuthenticated, isConnected]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

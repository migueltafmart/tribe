import React, { useEffect, useRef } from "react";
import { sendMessage, setSocket } from "../../../../Redux/actions";
import { STORE } from "../../../../Redux/store";
import { socket } from "../../../../service/socket";
import InputForm from "../../../InputForm/InputForm";
import Mssg from "../../../Mssg/Mssg";
import "./ChatMain.scss";

const ChatMain = () => {
  const messageList = STORE.getState().messageList;
  const color = STORE.getState().color;
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.open()
    socket.on("connect", () => {
      STORE.dispatch(setSocket(socket));
    });
    socket.on("chat message", (mssg) => {
      STORE.dispatch(sendMessage(mssg, STORE.getState().messageList));
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behaviour: "smooth" });
  };

  return (
    <>
      <main className="Chat">
        <div className="wrapper">
          {STORE.getState().messageList.length > 0 ? (
            STORE.getState().messageList.map((mssg, i) =>
              mssg.user.id === STORE.getState().user._id ? (
                <Mssg key={`message-${i}`} self mssg={mssg} color={color} />
              ) : (
                <Mssg key={`message-${i}`} mssg={mssg} />
              )
            )
          ) : (
            <></>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>
      <InputForm socket={socket} />
    </>
  );
};

export default ChatMain;

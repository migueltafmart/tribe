import React, { useEffect, useRef } from "react";
import { sendMessage, setSocket, userNear, setLocation } from "../../../../Redux/actions";
import { STORE } from "../../../../Redux/store";
import { socket } from "../../../../service/socket";
import InputForm from "../../../InputForm/InputForm";
import Map from "../../../Map/Map"
import Mssg from "../../../Mssg/Mssg";
import "./ChatMain.scss";
import axios from "axios";

const ChatMain = () => {
  const messageList = STORE.getState().messageList;
  const color = STORE.getState().user.color;
  const messagesEndRef = useRef(null);

  useEffect(() => {
    //* Hasta que no se tenga la ubicación disponible no se puede hacer nada más
    navigator.geolocation.getCurrentPosition(({coords}) =>{
      STORE.dispatch(
        setLocation({
          type: "Point",
          coordinates: [coords.longitude, coords.latitude],
        })
      );

    }, (err) => console.log("Your location is not available at this moment", err))
    //! Old code
    const currentLocation = STORE.getState().user.location;
    socket.open();
    socket.on("connect", () => {
      socket.emit("self connected", STORE.getState().user);
      STORE.dispatch(setSocket(socket));
    });

    socket.on("user connected", (id) => {
      console.log("Someone new! Socket: ", id);
      socket.emit("nearby", {...STORE.getState().user, socket: id})
      if (currentLocation && STORE.getState().user.socket && color) {
        axios
          .get(
            `/api/nearby?i=${id}&long=${
              STORE.getState().user.location.coordinates[0]
            }&latt=${STORE.getState().user.location.coordinates[1]}`,
            {
              withCredentials: true,
              proxy: {
                host: "192.168.1.19",
                port: 8080,
              },
            }
          )
          .then((response) => {
            console.log("Users near me: ", response.data);
            STORE.dispatch(userNear(...response.data));
          });
      }
    });

    socket.on("chat message", (mssg) => {
      STORE.dispatch(sendMessage(mssg, STORE.getState().messageList));
    });
    //* Cuando un usuario cerca se loguee en el servidor

    return () => {
      //*Remove users from nearby for other users

      socket.close();
    };
    //eslint-disable-next-line
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
      <Map />
    </>
  );
};

export default ChatMain;

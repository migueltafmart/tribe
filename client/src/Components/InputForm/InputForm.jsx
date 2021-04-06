import React from "react";
import ColorPicker from "./ColorPicker/ColorPicker";
import useLongPress from "../../Hooks/useLongPress";
import { STORE } from "../../Redux/store";
import {
  giveBackColor,
  setColor,
  sendMessage,
  newMessage,
  setColorPicker,
} from "../../Redux/actions";
import "./InputForm.scss";
const InputForm = ({ socket }) => {
  const colorPicker = STORE.getState().colorPicker;
  const color = STORE.getState().user.color;
  const onLongPress = () => {
    if (color !== "black") {
      STORE.dispatch(setColor("black"));
      STORE.dispatch(giveBackColor(color, STORE.getState().clusterColors));
    }
    STORE.dispatch(setColorPicker(false));
  };
  const onClick = () => {
    STORE.dispatch(setColorPicker(!colorPicker));
  };

  const longPressEvent = useLongPress(onLongPress, onClick, {
    shouldPreventDefault: true,
    delay: 800,
  });
  const message = (e) => {
    e.preventDefault();
    const msg = {
      user: {
        socket: STORE.getState().user.socket,
        id: STORE.getState().user._id,
      },
      mssg: STORE.getState().message,
      timestamp: new Date(),
      location: STORE.getState().user.location,
      color: color
    };
    if (STORE.getState().message.length > 0) {
      socket.emit("chat message", msg);
      STORE.dispatch(sendMessage(msg, STORE.getState().messageList));
      STORE.dispatch(newMessage(""));
    }
  };
  return (
    <form className="InputForm" onSubmit={message}>
      {colorPicker ? <ColorPicker /> : <></>}
      <div
        className="wrapper"
        style={{ borderBottom: `3px solid ${STORE.getState().user.color}` }}
      >
        <input
          autoComplete="off"
          autoFocus
          type="text"
          name="mssg"
          id="_mssg"
          value={STORE.getState().message}
          onChange={(e) => STORE.dispatch(newMessage(e.target.value))}
        />
        {STORE.getState().message.length > 0 ? (
          <input
            className="material-icons Send"
            type="submit"
            value="send"
            style={{ color: `${color}` }}
          />
        ) : (
          <button
            {...longPressEvent}
            className="material-icons"
            style={{ color: `${color}` }}
          >
            palette
          </button>
        )}
      </div>
    </form>
  );
};

export default InputForm;

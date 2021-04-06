const setColor = (color) => {
  return { type: "SET_COLOR", payload: { color: color } };
};
const removeColor = (chosenColor, clusterColors) => {
  return {
    type: "REMOVE_COLOR",
    payload: {
      clusterColors: clusterColors.filter((e) => chosenColor !== e),
    },
  };
};
const giveBackColor = (chosenColor, clusterColors) => {
  return {
    type: "GIVE_BACK_COLOR",
    payload: {
      clusterColors: [...clusterColors, chosenColor],
    },
  };
};

const setLocation = (location) => {
  return {
    type: "SET_LOCATION",
    payload: {
      location: location,
    },
  };
};
const sendMessage = (message, messageList) => {
  return {
    type: "SEND_MESSAGE",
    payload: {
      messageList: [...messageList, message],
    },
  };
};
const newMessage = (message) => {
  return {
    type: "NEW_MESSAGE",
    payload: {
      message: message,
    },
  };
};
const setColorPicker = (bool) => {
  return { type: "SET_COLOR_PICKER", payload: { colorPicker: bool } };
};
const setLoginPwd =(pwd) =>{
  return {type: "SET_LOGIN_PASSWORD", payload:{pwd:pwd}}
}
const setLoginEmail =(email) =>{
  return {type: "SET_LOGIN_EMAIL", payload:{email:email}}
}
const setUser = (user) =>{
  return{type:"LOG_IN", payload:{user:user}}
}
const setCookie = (cookie) =>{
  return{type:"SET_SESSION_COOKIE", payload:{cookie:cookie}}
}
const setSocket = (connection) =>{
  return{type: "SET_SOCKET", payload:{socket:connection.id}}
}
const setMenu = (bool) =>{
  return{type: "SET_MENU", payload:{menu:bool}}
}
const userNear = (user) =>{
  return {type:"USER_ENTERED", payload:{nearby:user}}
}
const userLeft = (user) =>{
  return {type:"USER_LEFT", payload:{nearby:user}}
}
const resetState = () =>{
  return {type:"RESET_STATE"}
}
export {
  setColor,
  removeColor,
  giveBackColor,
  setLocation,
  newMessage,
  sendMessage,
  setColorPicker,
  setLoginEmail,
  setLoginPwd,
  setUser,
  setCookie,
  setSocket,
  setMenu,
  userNear,
  userLeft,
  resetState
};

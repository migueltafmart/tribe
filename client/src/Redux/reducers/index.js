import { initialState } from "../store";

const REDUCER = (state, action) => {
  switch (action.type) {
    case "SET_COLOR":
      return {
        ...state,
        user: {
          ...state.user,
          color: action.payload.color,
        },
      };
    case "REMOVE_COLOR":
      return {
        ...state,
        clusterColors: action.payload.clusterColors,
      };
    case "GIVE_BACK_COLOR":
      return {
        ...state,
        clusterColors: action.payload.clusterColors,
      };
    case "SET_LOCATION":
      return {
        ...state,
        user: {
          ...state.user,
          location: action.payload.location,
        },
      };
    case "SEND_MESSAGE":
      return {
        ...state,
        messageList: action.payload.messageList,
      };
    case "NEW_MESSAGE":
      return {
        ...state,
        message: action.payload.message,
      };
    case "SET_COLOR_PICKER":
      return {
        ...state,
        colorPicker: action.payload.colorPicker,
      };
    case "SET_LOGIN_PASSWORD":
      return {
        ...state,
        login: {
          ...state.login,
          pwd: action.payload.pwd,
        },
      };
    case "SET_LOGIN_EMAIL":
      return {
        ...state,
        login: {
          ...state.login,
          email: action.payload.email,
        },
      };
    case "LOG_IN":
      return {
        ...state,
        user: action.payload.user,
      };
    case "SET_SESSION_COOKIE":
      return {
        ...state,
        auth_cookie: action.payload.cookie,
      };
    case "SET_SOCKET":
      return {
        ...state,
        user: { ...state.user, socket: action.payload.socket },
      };
    case "SET_MENU":
      return {
        ...state,
        menu: action.payload.menu,
      };
    case "USER_ENTERED":
      return {
        ...state,
        nearby: [...state.nearby, action.payload.nearby],
      };
    case "USER_LEFT":
      return {
        ...state,
        nearby: [state.nearby.filter((v) => v !== action.payload.nearby)],
      };
    case "RESET_STATE":
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
export { REDUCER };

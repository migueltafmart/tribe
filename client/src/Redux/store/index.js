import { createStore } from "redux";
import { REDUCER } from "../reducers";
const initialState = {
  color: "black",
  clusterColors: [
    "#FF5473",
    "#FFBB54",
    "#FFDE7B",
    "#A5E258",
    "#1DDF99",
    "#1CE7DA",
    "#46C2F6",
    "#4791FF",
    "#9074FF",
    "#C484FF",
    "#E988DF",
  ],
  messageList:[],
  message:"",
  colorPicker: false,
  login:{
    email:"",
    pwd:""
  },
  user:{
    _id:null,
    location:null,
    socket:null,
    room:null,
    strikes:0,
    displayName:null,
    age:null,
    gender:null,
    email:null,
    __v: null
  },
  auth_cookie: null,
  menu:false
};
const STORE = createStore(
  REDUCER,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export { STORE };

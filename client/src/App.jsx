import React, { useEffect } from "react";
import "./App.scss";
import { Switch, Route, Redirect } from "react-router-dom";
import MainChatPage from "./Components/Pages/MainChatPage/MainChatPage";
import LoginPage from "./Components/Pages/LoginPage/LoginPage";
import { STORE } from "./Redux/store";
import Cookies from "universal-cookie";
import { setCookie, setUser } from "./Redux/actions";
import axios from "axios";
function App() {
  const currentLocation = STORE.getState().user.location;
  const currentSocket = STORE.getState().user.socket;
  const currentColor = STORE.getState().user.color;
  useEffect(() => {
    const sessionCookie = new Cookies().get("auth_cookie");
    if (sessionCookie) {
      STORE.dispatch(setCookie(sessionCookie));
      axios
        .get("/api/reload", {
          withCredentials: true,
          proxy: {
            host: "192.168.1.19",
            port: 8080,
          },
        })
        .then((response) => {
          STORE.dispatch(setUser(response.data));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (
      currentLocation !== undefined &&
      currentLocation.coordinates !== [0, 0] &&
      STORE.getState().user._id
    ) {
      const body = {
        _id: STORE.getState().user._id,
        location: currentLocation,
      };
      axios
        .post("/api/update/location", body, {
          withCredentials: true,
          proxy: {
            host: "192.168.1.19",
            port: 8080,
          },
        })
        .catch((err) => console.log(err));
    }
  }, [currentLocation]);
  useEffect(() => {
    if (currentSocket !== null && STORE.getState().user._id) {
      const body = {
        _id: STORE.getState().user._id,
        socket: currentSocket,
      };
      axios
        .post("/api/update/socket", body, {
          withCredentials: true,
          proxy: {
            host: "192.168.1.19",
            port: 8080,
          },
        })
        .catch((err) => console.log(err));
    }
  }, [currentSocket]);
  useEffect(() => {
    if (currentColor !== null && STORE.getState().user._id) {
      const body = {
        _id: STORE.getState().user._id,
        color: currentColor,
      };
      axios
        .post("/api/update/color", body, {
          withCredentials: true,
          proxy: {
            host: "192.168.1.19",
            port: 8080,
          },
        })
        .catch((err) => console.log(err));
    }
  }, [currentColor]);

  return (
    <>
      <Switch>
        <Route path="/" exact>
          {STORE.getState().auth_cookie ? (
            <MainChatPage />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/login" exact>
          {!STORE.getState().auth_cookie ?( 
            <LoginPage />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
      </Switch>
    </>
  );
}

export default App;

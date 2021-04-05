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
          console.log(response.data)
          STORE.dispatch(setUser(response.data))})
        .catch((err) => console.log(err));
    }
  }, []);
  const currentLocation = STORE.getState().user.location;
  const currentSocket = STORE.getState().user.socket;

  useEffect(() => {
    if (currentLocation && currentSocket && STORE.getState().user._id) {
      const body = {
        _id: STORE.getState().user._id,
        location: currentLocation,
        socket: currentSocket,
      };
      axios
        .post("/api/update", body, {
          withCredentials: true,
          proxy: {
            host: "192.168.1.19",
            port: 8080,
          },
        })
        .catch((err) => console.log(err));
    }
  }, [currentLocation, currentSocket]);
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
          {!STORE.getState().auth_cookie ? <LoginPage /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </>
  );
}

export default App;

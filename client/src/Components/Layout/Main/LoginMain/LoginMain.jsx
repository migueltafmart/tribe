import React from "react";
import axios from "axios";
import {
  setLoginEmail,
  setLoginPwd,
  setUser,
  setCookie,
} from "../../../../Redux/actions";
import { STORE } from "../../../../Redux/store";
import "./LoginMain.scss";
import Cookies from "universal-cookie";

const LoginMain = () => {
  const logIn = (e) => {
    e.preventDefault();
    const body = STORE.getState().login;
    if (body.email && body.pwd) {
      axios
        .post("/api/login", body, {
          withCredentials: true,
          proxy: {
            host: "192.168.1.19",
            port: 8080,
          },
        })
        .then((payload) => {
          console.log(payload.data);
          if (typeof payload.data === "string") {
            STORE.dispatch(setLoginEmail(""));
            STORE.dispatch(setLoginPwd(""));
            alert(payload.data);
          } else {
            STORE.dispatch(setUser(payload.data));
            STORE.dispatch(setLoginEmail(""));
            STORE.dispatch(setLoginPwd(""));
            STORE.dispatch(setCookie(new Cookies().get("session_cookie")));
          }
        })
        .catch((e) => console.log(e));
    } else {
      console.log("Missing fields");
    }
  };
  return (
    <main className="Login">
      <div className="wrapper">
        <form method="POST" onSubmit={logIn}>
          <label htmlFor="_email">email</label>
          <input
            type="email"
            name="email"
            id="_email"
            value={STORE.getState().login.email}
            onChange={(e) => STORE.dispatch(setLoginEmail(e.target.value))}
          />
          <label htmlFor="_pwd">password</label>
          <input
            type="password"
            name="pwd"
            id="_pwd"
            value={STORE.getState().login.pwd}
            onChange={(e) => STORE.dispatch(setLoginPwd(e.target.value))}
          />
          <input type="submit" value="Log in" />
        </form>
      </div>
    </main>
  );
};

export default LoginMain;

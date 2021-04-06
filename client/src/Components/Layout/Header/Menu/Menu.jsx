import axios from "axios";
import React from "react";
import { setMenu, resetState, setCookie } from "../../../../Redux/actions";
import { STORE } from "../../../../Redux/store";
import "./Menu.scss";
const Menu = () => {
  const logOut = () => {
    const body = STORE.getState().user._id;
    axios
      .post(
        "/api/logout",
        { id: body },
        {
          credentials: "same-origin",
          proxy: {
            host: "192.168.1.19",
            port: 8080,
          },
        }
      )
      .then((res) => {
        STORE.dispatch(setCookie(null));
        STORE.dispatch(resetState());
      })
      .catch((err) => console.log(err));
  };
  return (
    <nav className="Menu" onBlur={() => STORE.dispatch(setMenu(false))}>
      {!STORE.getState().menu ? (
        <button
          onClick={() => STORE.dispatch(setMenu(!STORE.getState().menu))}
          className="material-icons"
        >
          menu
        </button>
      ) : (
        <>
          <button onClick={logOut} className="material-icons">
            explore
          </button>
          <button
            onClick={() => STORE.dispatch(setMenu(!STORE.getState().menu))}
            className="material-icons"
          >
            close
          </button>
          <button
            onClick={() => STORE.dispatch(setMenu(!STORE.getState().menu))}
            className="material-icons"
          >
            close
          </button>
          <button
            onClick={() => STORE.dispatch(setMenu(!STORE.getState().menu))}
            className="material-icons"
          >
            close
          </button>
        </>
      )}
    </nav>
  );
};

export default Menu;

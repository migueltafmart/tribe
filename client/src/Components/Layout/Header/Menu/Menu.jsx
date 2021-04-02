import React from "react";
import { setMenu } from "../../../../Redux/actions";
import { STORE } from "../../../../Redux/store";
import "./Menu.scss";
const Menu = () => {
  return (
    <nav className="Menu">
      {!STORE.getState().menu ? (
        <button
          onClick={() => STORE.dispatch(setMenu(!STORE.getState().menu))}
          className="material-icons"
        >
          menu
        </button>
      ) : (
        <>
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

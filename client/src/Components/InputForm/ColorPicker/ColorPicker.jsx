import React from "react";
import { STORE } from "../../../Redux/store";
import { setColor, removeColor, giveBackColor, setColorPicker } from "../../../Redux/actions";
import "./ColorPicker.scss";
const ColorPicker = () => {
  const color = STORE.getState().user.color;

  const pickColor = (e) => {
    if (color !== "black") {
      STORE.dispatch(setColor(e.target.value, STORE.getState().clusterColors));
      STORE.dispatch(giveBackColor(color, STORE.getState().clusterColors));
      STORE.dispatch(removeColor(e.target.value, STORE.getState().clusterColors));
    } else {
      STORE.dispatch(setColor(e.target.value));
      STORE.dispatch(removeColor(e.target.value, STORE.getState().clusterColors));
    }
    STORE.dispatch(setColorPicker(false));
  };

  return (
    <div className="ColorPicker">
      <div className="wrapper">
        <div>
          {STORE.getState().clusterColors.map((color, i) => (
            <button
              onClick={pickColor}
              className="color"
              key={`colorBtn-${i}`}
              value={color}
              style={{ background: `${color}` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;

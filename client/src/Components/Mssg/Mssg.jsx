import React from "react";
import "./Mssg.scss";
const Mssg = ({ self, mssg }) => {
  const goPrivate= () =>{
    if (self || mssg.location.properties.color === "black" ){
      return
    }else{
      alert(`going private with ${mssg.user.socket}`)
    }
  }
  return (
    <div
    onClick={goPrivate}
      className={self ? "Mssg self" : "Mssg"}
      style={
        mssg.location.properties.color === "black"
          ? { background: "black", color: "white" }
          : { background: `${mssg.color}`, color: "black" }
      }
    >
      <p>{mssg.mssg}</p>
    </div>
  );
};

export default Mssg;

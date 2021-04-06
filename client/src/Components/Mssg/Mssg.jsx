import React from "react";
import "./Mssg.scss";
const Mssg = ({ self, mssg }) => {
  const goPrivate= () =>{
    if (self || mssg.color === "black" ){
      return
    }else{
      alert(`going private with ${mssg.user.socket}`)
    }
  }
  console.log()
  return (

    <div
    onClick={goPrivate}
      className={self ? "Mssg self" : "Mssg"}
      style={
        mssg.color === "black"
          ? { background: "black", color: "white" }
          : { background: `${mssg.color}`, color: "black" }
      }
    >
      <p>{mssg.mssg}</p>
    </div>
  );
};

export default Mssg;

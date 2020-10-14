import React from "react";
import "../css/Loader.css";

export default function Loader(props) {
  return <div id="loader" className={handelClass()}></div>;
  function handelClass() {
    if (props.hide) return "hideLoader";
    return "nothing";
  }
}

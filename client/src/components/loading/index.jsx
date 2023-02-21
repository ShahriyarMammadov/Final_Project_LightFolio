import React from "react";
import "./index.css";

const LoadingComp = () => {
  return (
    <div id="loadingComponent">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingComp;

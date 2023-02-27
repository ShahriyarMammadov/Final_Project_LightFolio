import React from "react";
import "./index.css";

const LoadingComp = () => {
  return (
    <div id="loadingComponent">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingComp;

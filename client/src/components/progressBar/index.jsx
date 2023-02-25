import React, { useState } from "react";

const ProgressBar = ({ loadedPercent }) => {
  const [style, setStyle] = useState({});

  setTimeout(() => {
    const newStyle = {
      width: `${loadedPercent}%`,
      transition: "width 0.5s ease-out",
      backgroundColor: "green",
      height: "10px",
    };

    setStyle(newStyle);
  }, 200);

  return (
    <div className="progress">
      <div className="progress-bar" style={style}></div>
    </div>
  );
};

export default ProgressBar;

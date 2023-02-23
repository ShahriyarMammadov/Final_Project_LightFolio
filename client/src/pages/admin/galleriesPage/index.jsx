import React from "react";
import { useSelector } from "react-redux";
import "./index.scss";

const GalleriesPage = () => {
  const userData = useSelector((state) => state.getAllUserDataReducer);

  return (
    <div id="galleriesPage">
      <div className="galleries">GalleriesPage</div>
    </div>
  );
};

export default GalleriesPage;

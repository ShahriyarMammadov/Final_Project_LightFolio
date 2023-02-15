import React from "react";
import { useSelector } from "react-redux";
import "./index.scss";
import logo from "../../../assets/images/arrow-bottom.png";

const AboutMePage = () => {
  const userData = useSelector((state) => state.getAllUserDataReducer);

  console.log(userData);
  return (
    <div id="aboutMePage">
      <div className="aboutHeader">
        <h2>About Me</h2>
      </div>
      <div className="contactInformation">
        <div className="contactHeader">
          <h4>Contact Information</h4>
        </div>
      </div>
    </div>
  );
};

export default AboutMePage;

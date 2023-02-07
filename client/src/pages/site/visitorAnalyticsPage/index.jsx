import React from "react";
import mapImage from "../../../assets/images/gallery-visitor-list.jpg";
import "./index.scss";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const VisitorAnalytics = () => {
  return (
    <div id="visitorPage">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Gallery Visitors - LightFolio</title>
      </Helmet>
      <div className="headerSection">
        <div className="section1">
          <div className="left">
            <h1>Gallery Visitors</h1>
            <p>
              Want to know when your clients have viewed your gallery, how many
              times and on which devices? Lightfolio analytics gives you insight
              into all your gallery visitors.
            </p>
            <div className="link">
              <Link to={"/signup"}>GET STARTED</Link>
            </div>
          </div>

          <div className="right">
            <img src={mapImage} alt="" />
          </div>
        </div>
      </div>

      <div className="section2">
        <div className="cards">
          <div className="card">
            <div className="icon">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <div className="text">
              <h4>VISITOR INSIGHT</h4>
              <p>
                Want to know more about your gallery visitors? Easily keep track
                of client visits, their location and what devices they are using
                to view your galleries.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="icon">
              <i className="fa-solid fa-map"></i>
            </div>
            <div className="text">
              <h4>MAPS</h4>
              <p>
                By using geolocation technology, visitor maps give you a visual
                representation of the location of your gallery traffic.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="icon">
              <i className="fa-solid fa-calendar"></i>
            </div>
            <div className="text">
              <h4>DAILY/WEEKLY UPDATES</h4>
              <p>
                Regular email notifications alert you to new visitors. A weekly
                summary email gives you statistics on visitor trends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorAnalytics;

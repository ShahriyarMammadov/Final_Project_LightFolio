import React from "react";
import { Link } from "react-router-dom";
import image from "../../../assets/images/client-downloads.jpg";
import "./index.scss";

const DigitalDownloadsPage = () => {
  return (
    <div>
      <section id="downloadPage">
        <div className="section1">
          <div className="left">
            <h1>Client Downloads</h1>
            <p>
              Conveniently allow your clients to download their pictures.
              Restrict access and control file sizes at the click of a button.
            </p>
            <div className="link">
              <Link to={"/signup"}>GET STARTED</Link>
            </div>
          </div>

          <div className="right">
            <img src={image} alt="" />
          </div>
        </div>

        <div className="section2">
          <div className="cards">
            <div className="card">
              <div className="icon">
                <i className="fa-solid fa-down-long"></i>
              </div>
              <div className="text">
                <h4>DOWNLOAD SIZES</h4>
                <p>
                  Share and colloborate with clients in selecting photos. Enable
                  downloads, watermarks and solicit feedback through comments.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="icon">
                <i className="fa-solid fa-arrow-down"></i>
              </div>
              <div className="text">
                <h4>DOWNLOAD TYPES</h4>
                <p>
                  You choose whether clients can download single images, the
                  entire gallery, or both.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="icon">
                <i className="fa-solid fa-message"></i>
              </div>
              <div className="text">
                <h4>DOWNLOAD NOTIFICATION</h4>
                <p>
                  Receive in-app notifications to confirm your clients'
                  successful gallery downloads.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalDownloadsPage;

import React from "react";
import galleryImg from "../../../assets/images/gallery-directory1.jpg";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "./index.scss";

const GalleryDirectoriesPage = () => {
  return (
    <div id="galleryDirectories">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Gallery Directories - LightFolio</title>
      </Helmet>
      <section id="onlinePage">
        <div className="section1">
          <div className="left">
            <h1>Gallery directory</h1>
            <p>
              Give your clients an easy way to find all of your published
              galleries. Customize your directory by choosing from several
              themes and use the SEO settings to improve your Google rankings.
            </p>
            <div className="link">
              <Link to={"/signup"}>GET STARTED</Link>
            </div>
          </div>

          <div className="right">
            <img src={galleryImg} alt="" />
          </div>
        </div>

        <div className="section2">
          <div className="cards">
            <div className="card">
              <div className="icon">
                <i className="fa-solid fa-crop"></i>
              </div>
              <div className="text">
                <h4>CUSTOMIZATION</h4>
                <p>
                  Customize your directory by uploading your logo and by
                  choosing from one of several available themes.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="icon">
                <i className="fa-solid fa-magnifying-glass-plus"></i>
              </div>
              <div className="text">
                <h4>SEO</h4>
                <p>
                  Fine tune the available SEO settings to help Google index your
                  work and to drive more traffic to your galleries.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="icon">
                <i className="fa-solid fa-link"></i>
              </div>
              <div className="text">
                <h4>CONNECT YOUR DOMAIN</h4>
                <p>
                  Do you own a domain name for your studio? You can further
                  personalize your directory by connecting directly to your
                  domain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryDirectoriesPage;

import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const ErrorPage = () => {
  return (
    <div>
      <Helmet>
        <title>Page Not Found...</title>
      </Helmet>
      <p className="zoom-area">
        <b>Page Not Found.</b>{" "}
      </p>
      <section className="error-container">
        <span>




          
          <span>4</span>
        </span>
        <span>0</span>
        <span>

          
          <span>4</span>
        </span>
      </section>
      <div className="link-container">
        <Link to={"/"}>GO TO HOME</Link>
      </div>
    </div>
  );
};

export default ErrorPage;

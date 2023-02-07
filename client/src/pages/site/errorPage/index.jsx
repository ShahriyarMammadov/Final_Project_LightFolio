import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <p class="zoom-area">
        <b>Page Not Found.</b>{" "}
      </p>
      <section class="error-container">
        <span>
          <span>4</span>
        </span>
        <span>0</span>
        <span>
          <span>4</span>
        </span>
      </section>
      <div class="link-container">
        <Link to={"/"}>GO TO HOME</Link>
      </div>
    </div>
  );
};

export default ErrorPage;

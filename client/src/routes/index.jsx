import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../layouts/footer";
import Header from "../layouts/header";
import HomePage from "../pages/site/homePage";

const Router = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Router;

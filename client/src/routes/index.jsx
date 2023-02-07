import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../layouts/footer";
import Header from "../layouts/header";
import ErrorPage from "../pages/site/errorPage";
import HomePage from "../pages/site/homePage";
import PricingPage from "../pages/site/pricingPage";

const Router = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Router;

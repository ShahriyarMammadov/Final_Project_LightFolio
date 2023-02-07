import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../layouts/footer";
import Header from "../layouts/header";
import DigitalDownloadsPage from "../pages/site/digitalDownloadPages";
import ErrorPage from "../pages/site/errorPage";
import GalleriesPage from "../pages/site/galleriesPage";
import HomePage from "../pages/site/homePage";
import PricingPage from "../pages/site/pricingPage";

const Router = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/features" element={<GalleriesPage />} />
        <Route
          path="/deliver-photos-to-client"
          element={<DigitalDownloadsPage />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Router;

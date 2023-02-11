import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../layouts/footer";
import Header from "../layouts/header";
import DigitalDownloadsPage from "../pages/site/digitalDownloadPages";
import ErrorPage from "../pages/site/errorPage";
import GalleriesPage from "../pages/site/galleriesPage";
import GalleryDirectoriesPage from "../pages/site/galleryDirectoriesPage";
import HomePage from "../pages/site/homePage";
import LoginPage from "../pages/admin/login";
import OnlineStorePage from "../pages/site/onlineStorePage";
import PricingPage from "../pages/site/pricingPage";
import ProofingPage from "../pages/site/proofingPage";
import ThemesPage from "../pages/site/themesPage";
import VisitorAnalytics from "../pages/site/visitorAnalyticsPage";
import SignupPage from "../pages/admin/signup";
import DashboardPage from "../pages/admin/dashboard";
import AdminHome from "../pages/admin/adminHome";

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
        <Route path="/visitor-analytics" element={<VisitorAnalytics />} />
        <Route path="/online-store" element={<OnlineStorePage />} />
        <Route path="/photo-proofing" element={<ProofingPage />} />
        <Route
          path="/gallery-directories"
          element={<GalleryDirectoriesPage />}
        />
        <Route path="/themes" element={<ThemesPage />} />

        {/* Admin  */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/signup" element={<SignupPage />} />
        {/* <Route path="/admin/signup" element={<SignupPage />} /> */}
        <Route path="/crm/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Router;

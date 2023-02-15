import React from "react";
// import { Route, Routes, Router } from "react-router-dom";
// import Footer from "../layouts/footer";
// import Header from "../layouts/header";
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
// import AdminHome from "../pages/admin/adminHome";
import MainRoot from "../components/site/";
import AdminRoot from "../components/admin/";

const ROUTES = [
  {
    path: "/",
    element: <MainRoot />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "pricing",
        element: <PricingPage />,
      },
      {
        path: "features",
        element: <GalleriesPage />,
      },
      {
        path: "deliver-photos-to-client",
        element: <DigitalDownloadsPage />,
      },
      {
        path: "visitor-analytics",
        element: <VisitorAnalytics />,
      },
      {
        path: "online-store",
        element: <OnlineStorePage />,
      },
      {
        path: "photo-proofing",
        element: <ProofingPage />,
      },
      {
        path: "gallery-directories",
        element: <GalleryDirectoriesPage />,
      },
      {
        path: "themes",
        element: <ThemesPage />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: "/admin/",
    element: <AdminRoot />,
    children: [
      {
        path: "",
        element: <DashboardPage />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
];

export default ROUTES;

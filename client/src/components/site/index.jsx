import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../layouts/site/header";
import Footer from "../../layouts/site/footer";

const MainRoot = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainRoot;

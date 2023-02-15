import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../../layouts/admin/header";
import AdminLeftNav from "../../layouts/admin/leftNav";

const AdminRoot = () => {
  return (
    <>
      <AdminHeader />
      <AdminLeftNav />
      <Outlet />
    </>
  );
};

export default AdminRoot;

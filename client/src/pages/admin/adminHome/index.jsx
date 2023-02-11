import React from "react";
import { Outlet } from "react-router-dom";

const AdminHome = () => {
  return (
    <div>
      AdminHome
      <Outlet />
    </div>
  );
};

export default AdminHome;

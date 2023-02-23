import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "../../layouts/admin/header";
import AdminLeftNav from "../../layouts/admin/leftNav";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllcountryAction,
  getUserAllDataAction,
} from "../../redux/action/user.Action";

const AdminRoot = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.getAllUserDataReducer);

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:3000/",
          {},
          {
            withCredentials: true,
          }
        );

        if (!data?.status) {
          removeCookie("jwt");
          navigate("/login");
        } else {
          // const response = await axios.get(
          //   `http://localhost:3000/user/${data.user}`
          // );
          await dispatch(getUserAllDataAction(data.data));
          // dispatch(getAllcountryAction());
        }
      }
    };

    verifyUser();
  }, [cookies, removeCookie, navigate]);

  return (
    <>
      <AdminHeader />
      <AdminLeftNav />
      <Outlet />
    </>
  );
};

export default AdminRoot;

import React from "react";
import { NavLink } from "react-router-dom";
import "./index.scss";
import { useSelector } from "react-redux";
import { Badge } from "antd";
import axios from "axios";

const AdminLeftNav = () => {
  const userData = useSelector((state) => state.getAllUserDataReducer);
  console.log(userData);

  const readingUpdated = async () => {
    try {
      const { data } = await axios.patch(
        `http://localhost:3000/readingUpdate`,
        { id: userData?.data._id }
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const unreadCount = userData?.data?.whatsNew?.filter(
    (item) => !item.reading
  )?.length;

  return (
    <div>
      <div className="leftNav">
        <NavLink to={""}>
          <i className="fa-solid fa-house"></i>
          <div className="textNav">
            <h5>Home</h5>
          </div>
        </NavLink>
        <NavLink to={"/admin/galleries/"}>
          <i className="fa-solid fa-image"></i>
          <div className="textNav">
            <h5>Galleries</h5>
          </div>
        </NavLink>
        <NavLink to={"/a"}>
          <i className="fa-solid fa-store"></i>
          <div className="textNav">
            <h5>Store</h5>
          </div>
        </NavLink>
        <NavLink to={"/d"}>
          <i className="fa-solid fa-globe"></i>
          <div className="textNav">
            <h5>Website</h5>
          </div>
        </NavLink>
        <NavLink to={"/a"}>
          <i className="fa-solid fa-database"></i>
          <div className="textNav">
            <h5>Studio Manager</h5>
          </div>
        </NavLink>
        {/* <div className="studioNav">123456789</div> */}

        <div className="whatsNew" onClick={readingUpdated}>
          <i className="fa-solid fa-bell"></i>
          <Badge count={unreadCount}>
            <h5>What's New</h5>
          </Badge>
        </div>
      </div>
    </div>
  );
};
export default AdminLeftNav;

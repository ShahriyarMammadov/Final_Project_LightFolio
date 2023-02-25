import React, { useEffect, useState } from "react";
import userPhoto from "../../../assets/images/title-logo.png";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import logo from "../../../assets/images/logo_lightfolio_mark_gold.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./index.scss";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const AdminHeader = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  let location = useLocation();

  const userData = useSelector((state) => state.getAllUserDataReducer);

  const logout = () => {
    removeCookie("jwt");
    navigate("/");
  };

  useEffect(() => {
    if (
      location.pathname === "/admin/user/" ||
      location.pathname === "/admin/business/" ||
      location.pathname === "/admin/employees/" ||
      location.pathname === "/admin/subscription/"
    ) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }, [location]);

  return (
    <div className="adminHeader">
      <div className="header">
        <nav>
          <div className="logo">
            <i className="fa-solid fa-bars"></i>
            <Link to={""}>
              <img src={logo} alt="logo" />
            </Link>
          </div>
          {toggle && (
            <div className="settingsNav">
              <nav>
                <NavLink to={"/admin/business/"}>Settings</NavLink>
                <NavLink to={"/admin/user/"}>About Me + Email</NavLink>
                <NavLink to={"/admin/subscription/"}>Subscription</NavLink>
                <NavLink to={"/admin/employees/"}>Team</NavLink>
              </nav>
            </div>
          )}
          <div className="navigator">
            <p className="pricing">Add more storage now: </p>
            <NavLink to={"/"}>UPGRADE</NavLink>
            <Menu isLazy>
              <MenuButton>
                <div className="user">
                  <img
                    src={
                      userData?.data?.profilePhoto
                        ? userData?.data?.profilePhoto
                        : userPhoto
                    }
                    alt="ProfilePhoto"
                  />
                  <div className="name">
                    <h6>{userData?.data?.companyName}</h6>
                    <p>{userData?.data?.fullName}</p>
                  </div>
                </div>
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    navigate("/admin/business/");
                  }}
                >
                  <i className="fa-solid fa-gear"></i> <span>Settings</span>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/admin/user/");
                  }}
                >
                  <i className="fa-solid fa-user"></i>{" "}
                  <span>About Me + Email</span>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/admin/subscription/");
                  }}
                >
                  <i className="fa-solid fa-dollar-sign"></i>{" "}
                  <span>Subscription</span>
                </MenuItem>
                <hr />
                <MenuItem onClick={logout}>
                  <i className="fa-solid fa-right-from-bracket"></i>
                  <span>Log Out</span>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default AdminHeader;

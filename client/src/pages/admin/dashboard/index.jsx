import React, { useEffect } from "react";
import "./index.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import userPhoto from "../../../assets/images/title-logo.png";
import "./index.scss";
import axios from "axios";
import { useCookies } from "react-cookie";
import logo from "../../../assets/images/logo_lightfolio_mark_gold.png";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

const DashboardPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/admin/login");
      } else {
        const { data } = axios.post(
          "http://localhost:3000/",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/admin/login");
        } else {
          alert("hi");
        }
      }
    };

    verifyUser();
  }, []);

  const logout = () => {
    removeCookie("jwt");
    navigate("/");
  };

  return (
    <div id="dashboard">
      <div className="header">
        <nav>
          <div className="logo">
            <i className="fa-solid fa-bars"></i>
            <Link to={"/home"}>
              <img src={logo} alt="logo" />
            </Link>
          </div>

          <div className="navigator">
            <p className="pricing">Add more storage now: </p>
            <NavLink to={"/"}>UPGRADE</NavLink>
            <Menu isLazy>
              <MenuButton>
                <div className="user">
                  <img src={userPhoto} alt="" />
                  <div className="name">
                    <h6>Shahriyar</h6>
                    <p>Shahriyar Mammadov</p>
                  </div>
                </div>
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <i className="fa-solid fa-gear"></i> <span>Settings</span>
                </MenuItem>
                <MenuItem>
                  <i className="fa-solid fa-user"></i>{" "}
                  <span>About Me + Email</span>
                </MenuItem>
                <MenuItem>
                  <i className="fa-solid fa-dollar-sign"></i>{" "}
                  <span>Subscription</span>
                </MenuItem>
                <hr />
                <MenuItem
                  onClick={() => {
                    logout();
                  }}
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                  <span>Log Out</span>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </nav>
      </div>
      <hr />

      <div className="leftNav">
        <NavLink to={"/crm/dashboard"}>
          <i className="fa-solid fa-house"></i>
          <div className="textNav">
            <h5>Home</h5>
          </div>
        </NavLink>
        <NavLink to={"/"}>
          <i className="fa-solid fa-image"></i>
          <div className="textNav">
            <h5>Galleries</h5>
          </div>
        </NavLink>
        <NavLink to={"/"}>
          <i className="fa-solid fa-store"></i>
          <div className="textNav">
            <h5>Store</h5>
          </div>
        </NavLink>
        <NavLink to={"/"}>
          <i className="fa-solid fa-globe"></i>
          <div className="textNav">
            <h5>Website</h5>
          </div>
        </NavLink>
        <NavLink to={"/"}>
          <i className="fa-solid fa-database"></i>
          <div className="textNav">
            <h5>Studio Manager</h5>
          </div>
        </NavLink>
        {/* <div className="studioNav">123456789</div> */}

        <div className="whatsNew">
          <i className="fa-solid fa-bell"></i>
          <h5>What's New</h5>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

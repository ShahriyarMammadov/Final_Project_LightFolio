import React from "react";
import userPhoto from "../../../assets/images/title-logo.png";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import logo from "../../../assets/images/logo_lightfolio_mark_gold.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./index.scss";
import { useCookies } from "react-cookie";

const AdminHeader = () => {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate();

  const logout = () => {
    removeCookie("jwt");
    navigate("/");
  };

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
    </div>
  );
};

export default AdminHeader;

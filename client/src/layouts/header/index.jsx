import React from "react";
import logo from "../../assets/images/logo-dark.png";
import "./index.scss";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  return (
    <header
      style={{
        background: useLocation().pathname === "/" ? "transparent" : "red",
      }}
    >
      <div id="header">
        <div className="logo">
          <Link to={"/"}>
            {" "}
            <img src={logo} alt="" />
          </Link>

          <nav>
            <Link to={"/pricing"}>PRICING</Link>
            <div class="dropdown">
              <Link to={"/features"} className="galleries">
                GALLERIES <i class="fa-solid fa-chevron-down"></i>
              </Link>
              <div class="dropdown-content">
                <Link to={"/photo-proofing"} title="Photo Proofing">
                  <i class="fa-solid fa-database"></i>
                  <div className="text">
                    Proofing <p>Easy online photo Proofing</p>
                  </div>
                </Link>
                <Link
                  to={"/deliver-photos-to-client"}
                  title="Digital Downloads"
                >
                  <i class="fa-solid fa-database"></i>
                  <div className="text">
                    Digital Downloads <p>Allow client photo downloads</p>
                  </div>
                </Link>
                <Link to={"/visitor-analytics"} title="Visitor Analytics">
                  <i class="fa-solid fa-database"></i>
                  <div className="text">
                    Visitor Analytics <p>Gallery visitor stats</p>
                  </div>
                </Link>
                <Link to={"/online-store"} title="Online Store">
                  <i class="fa-solid fa-database" title="Online Store"></i>
                  <div className="text">
                    Online Store <p>Set up shop</p>
                  </div>
                </Link>
                <Link to={"/gallery-directories"} title="Gallery Directories">
                  <i
                    class="fa-solid fa-database"
                    title="Gallery Directories"
                  ></i>
                  <div className="text">
                    Gallery Directories <p>Gallery websites</p>
                  </div>
                </Link>
                <Link to={"/themes"} title="Themes">
                  <i class="fa-solid fa-database"></i>
                  <div className="text">
                    Themes <p>Customize your galleries</p>
                  </div>
                </Link>
              </div>
            </div>

            <div class="dropdown">
              <Link to={"/crm-for-photographers"} className="crm">
                CRM <i class="fa-solid fa-chevron-down"></i>
              </Link>
              <div class="dropdown-content dropdown-content-crm">
                <div className="left">
                  <Link to={"/crm-for-photographers"}>
                    <i class="fa-solid fa-database"></i>
                    <div className="text">
                      Studio Manager{" "}
                      <p>CRM bulit to serve the needs of photographers</p>
                    </div>
                  </Link>
                  <Link to={"/photography-invoices"}>
                    <i class="fa-solid fa-file-invoice-dollar"></i>
                    <div className="text">
                      Invoices <p>Send invoices and collect payment online</p>
                    </div>
                  </Link>
                  <Link to={"/mini-sessions"}>
                    <i class="fa-solid fa-camera"></i>
                    <div className="text">
                      Mini Sessions{" "}
                      <p>Set up mini sessions and start booking online</p>
                    </div>
                  </Link>
                </div>
                <div className="right">
                  <Link to={"/photography-contracts"}>
                    <i class="fa-solid fa-file-contract"></i>
                    <div className="text">
                      Contracts <p>10+ free photography contract templates</p>
                    </div>
                  </Link>
                  <Link to={"/photographer-booking-site"}>
                    <i class="fa-solid fa-globe"></i>
                    <div className="text">
                      Booking Site{" "}
                      <p>Set your availability and start booking 24x7</p>
                    </div>
                  </Link>
                  <Link to={"/photography-forms"}>
                    <i class="fa-solid fa-globe"></i>
                    <div className="text">
                      Forms <p>Over a dozen form and questionnaire templates</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <Link to={"/websites"}>WEBSITES</Link>
          </nav>
        </div>

        <div className="signupLogin">
          <Link to={"/login"}>LOGIN</Link>
          <Link to={"/signup"} className="signUp">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

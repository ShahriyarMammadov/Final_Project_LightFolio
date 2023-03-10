import React, { useState } from "react";
import logo from "../../../assets/images/logo-dark.png";
import "./index.scss";
import { Link, useLocation } from "react-router-dom";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  let wisharr = JSON.parse(localStorage.getItem("wishList")) ?? [];

  return (
    <header
      style={{
        background: useLocation().pathname === "/" ? "transparent" : "white",
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
            <div className="dropdown">
              <Link to={"/features"} className="galleries">
                GALLERIES <i className="fa-solid fa-chevron-down"></i>
              </Link>
              <div className="dropdown-content">
                <Link to={"/photo-proofing"} title="Photo Proofing">
                  <i className="fa-solid fa-layer-group"></i>
                  <div className="text">
                    Proofing <p>Easy online photo Proofing</p>
                  </div>
                </Link>
                <Link
                  to={"/deliver-photos-to-client"}
                  title="Digital Downloads"
                >
                  <i className="fa-solid fa-download"></i>
                  <div className="text">
                    Digital Downloads <p>Allow client photo downloads</p>
                  </div>
                </Link>
                <Link to={"/visitor-analytics"} title="Visitor Analytics">
                  <i className="fa-solid fa-chart-simple"></i>
                  <div className="text">
                    Visitor Analytics <p>Gallery visitor stats</p>
                  </div>
                </Link>
                <Link to={"/online-store"} title="Online Store">
                  <i className="fa-solid fa-store" title="Online Store"></i>
                  <div className="text">
                    Online Store <p>Set up shop</p>
                  </div>
                </Link>
                <Link to={"/gallery-directories"} title="Gallery Directories">
                  <i className="fa-solid fa-images"></i>
                  <div className="text">
                    Gallery Directories <p>Gallery websites</p>
                  </div>
                </Link>
                <Link to={"/themes"} title="Themes">
                  <i className="fa-solid fa-palette"></i>
                  <div className="text">
                    Themes <p>Customize your galleries</p>
                  </div>
                </Link>
              </div>
            </div>

            <div className="dropdown">
              <Link to={"/crm-for-photographers"} className="crm">
                CRM <i className="fa-solid fa-chevron-down"></i>
              </Link>
              <div className="dropdown-content dropdown-content-crm">
                <div className="left">
                  <Link to={"/crm-for-photographers"}>
                    <i className="fa-solid fa-database"></i>
                    <div className="text">
                      Studio Manager{" "}
                      <p>CRM bulit to serve the needs of photographers</p>
                    </div>
                  </Link>
                  <Link to={"/photography-invoices"}>
                    <i className="fa-solid fa-file-invoice-dollar"></i>
                    <div className="text">
                      Invoices <p>Send invoices and collect payment online</p>
                    </div>
                  </Link>
                  <Link to={"/mini-sessions"}>
                    <i className="fa-solid fa-camera"></i>
                    <div className="text">
                      Mini Sessions{" "}
                      <p>Set up mini sessions and start booking online</p>
                    </div>
                  </Link>
                </div>
                <div className="right">
                  <Link to={"/photography-contracts"}>
                    <i className="fa-solid fa-file-contract"></i>
                    <div className="text">
                      Contracts <p>10+ free photography contract templates</p>
                    </div>
                  </Link>
                  <Link to={"/photographer-booking-site"}>
                    <i className="fa-solid fa-globe"></i>
                    <div className="text">
                      Booking Site{" "}
                      <p>Set your availability and start booking 24x7</p>
                    </div>
                  </Link>
                  <Link to={"/photography-forms"}>
                    <i className="fa-solid fa-file-waveform"></i>
                    <div className="text">
                      Forms <p>Over a dozen form and questionnaire templates</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <Link to={"/galleries"} className="crm">
              All Galleries
            </Link>
          </nav>
        </div>

        <div className="signupLogin">
          <Link to={"/wishList"} title="Your Favorite galleries">
            {" "}
            <i className="fa-solid fa-heart"></i>
            {wisharr.length}
          </Link>
          <Link to={"/login"}>LOGIN</Link>
          <Link to={"/signup"} className="signUp">
            Sign Up
          </Link>
        </div>
      </div>
      <i
        className="fa-solid fa-bars"
        onClick={() => {
          setToggle(!toggle);
          onOpen();
        }}
      ></i>

      {toggle && (
        <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Link to={"/"}>LIGHTFOLIO</Link>
            </ModalHeader>
            <ModalBody>
              <Link to={"/"} className="home">
                HOME
              </Link>
              <Link to={"/pricing"}>PRICING</Link>
              <Link to={"/galleries"}>ALL GALLERIES</Link>
              <Link to={"/photo-proofing"}>PROOFING</Link>
              <Link to={"/deliver-photos-to-client"}>DIGITAL DOWNLOADS</Link>
              <Link to={"/visitor-analytics"}>VISITOR ANALYTICS</Link>
              <Link to={"/online-store"}>ONLINE STORE</Link>
              <Link to={"/gallery-directories"}>GALLERY DIRECTORIES</Link>
              <Link to={"/themes"}>THEMES</Link>
              <Link to={"/crm-for-photographers"}>CRM</Link>
              <Link to={"/wishList"}>YOUR WISH LIST</Link>
              <Link to={"/login"}>LOGIN</Link>
              <Link to={"/signup"}>SIGN UP</Link>
              <Link to={"/"}>WEBSITES</Link>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </header>
  );
};

export default Header;

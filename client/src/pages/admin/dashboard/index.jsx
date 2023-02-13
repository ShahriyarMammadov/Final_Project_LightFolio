import React, { useEffect, useState } from "react";
import "./index.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import userPhoto from "../../../assets/images/title-logo.png";
import "./index.scss";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { useCookies } from "react-cookie";
import logo from "../../../assets/images/logo_lightfolio_mark_gold.png";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

const DashboardPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [latitude, setLatitude] = useState(30);
  const [longitude, setLongitude] = useState(30);
  const navigate = useNavigate();
  const [postImage, setPostImage] = useState({ myFile: "" });

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

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

        if (!data?.status) {
          removeCookie("jwt");
          // navigate("/admin/login");
        } else {
          alert("hi");
        }
      }
    };

    verifyUser();
  }, [cookies, navigate]);

  // const userData = async () => {
  //   let response = await axios.get("http://localhost:3000/user/");
  //   console.log(response.data);
  // };

  // useEffect(() => {
  //   userData();
  // }, []);

  const logout = () => {
    removeCookie("jwt");
    navigate("/");
  };

  const createPost = async (newImage) => {
    try {
      await axios.post("http://localhost:3000/uploads", newImage);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });
  };

  const handlePost = () => {
    createPost(postImage);
  };

  // Google Maps
  const containerStyle = {
    width: "800px",
    height: "400px",
  };

  const center = {
    lat: latitude,
    lng: longitude,
  };

  const options = {
    mapTypeId: "satellite",
  };
  // -----------------------

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }
  }, []);

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

      <div className="menu">
        <div className="dashboardHeader">
          <h3>Home</h3>
          <button onClick={onOpen}>+ NEW GALLERY</button>
        </div>

        <LoadScript googleMapsApiKey="AIzaSyCEotFdnmCMqDKPcHM81rbgcynBLP9Qarg">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            options={options}
            zoom={14}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>

        <Modal
          onClose={onClose}
          size={""}
          isOpen={isOpen}
          scrollBehavior={"inside"}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader style={{ textDecoration: "none" }}>
              Create New Gallery
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div id="form">
                <FormControl
                  isRequired
                  style={{ display: "flex", marginTop: "20px" }}
                >
                  <div className="left">
                    <FormLabel>Gallery Name</FormLabel>
                    <FormHelperText>
                      Give your gallery a descriptive name.
                    </FormHelperText>
                  </div>
                  <Input type="text" />
                </FormControl>

                <FormControl
                  style={{ display: "flex", marginTop: "20px", gap: "30px" }}
                >
                  <div className="left">
                    <FormLabel>Event date</FormLabel>
                    <FormHelperText>
                      The date the photos were taken.
                    </FormHelperText>
                  </div>
                  <Input type="date" />
                </FormControl>

                <FormControl
                  style={{ display: "flex", marginTop: "20px", gap: "30px" }}
                >
                  <div className="left">
                    <FormLabel>Expiration date</FormLabel>
                    <FormHelperText>
                      The gallery will no longer be visible after the expiration
                      date.
                    </FormHelperText>
                  </div>
                  <Input type="date" />
                </FormControl>

                <FormControl
                  style={{
                    display: "flex",
                    marginTop: "20px",
                    gap: "30px",
                  }}
                >
                  <div className="left">
                    <FormLabel>Gallery directory</FormLabel>
                    <FormHelperText>
                      Share this gallery with the public by displaying it in
                      your <Link to={"/crm/dashboard"}>gallery directory.</Link>
                    </FormHelperText>
                  </div>

                  <div>
                    {" "}
                    <input type="checkbox" id="check" />
                    <label htmlFor="check"> Display in gallery directory</label>
                  </div>
                </FormControl>
                <span>Additional Options</span>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
              <Button className="next" onClick={onClose}>
                Next: Choose a Cover Layout
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default DashboardPage;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new fileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

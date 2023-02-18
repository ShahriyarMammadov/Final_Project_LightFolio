import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
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
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  FormHelperText,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import whatsNewImage from "../../../assets/images/dashboardWhatsNew.jpg";
import { useForm } from "react-hook-form";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const DashboardPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [latitude, setLatitude] = useState(30);
  const [longitude, setLongitude] = useState(30);
  const navigate = useNavigate();

  const userData = useSelector((state) => state.getAllUserDataReducer);

  // Google Maps
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: latitude,
    lng: longitude,
  };

  const options = {
    mapTypeId: "satellite",
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }
  }, []);

  // Modal New Gallery Form
  const [toggle, setToggle] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 1000);
    });
  }
  // -------------------------------

  // Expiring Date Handle
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}/${current.getHours()}/${current.getMinutes()}`;

  console.log(date);

  return (
    <div id="dashboard">
      <Helmet>
        <title>Home </title>
      </Helmet>

      <div className="menu">
        <div className="dashboardHeader">
          <h3>Home</h3>
          <button onClick={onOpen}>+ NEW GALLERY</button>
        </div>

        {/* New Gallery Modal */}
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
            <div className="modalHeader">
              <h5>Create a New Gallery</h5>
            </div>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.galleryName}>
                  <div className="left">
                    <FormLabel htmlFor="galleryName">Gallery Name</FormLabel>
                    <FormHelperText>
                      Give your gallery a descriptive name.
                    </FormHelperText>
                  </div>
                  <Input
                    id="galleryName"
                    type={"text"}
                    {...register("galleryName", {
                      required: "Gallery Name is required",
                      minLength: {
                        value: 3,
                        message: "Minimum length should be 3",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.galleryName && errors.galleryName.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl>
                  <div className="left">
                    <FormLabel htmlFor="eventDate">Event Date</FormLabel>
                    <FormHelperText>
                      The date the photos were taken.
                    </FormHelperText>
                  </div>
                  <Input
                    {...register("eventDate")}
                    type={"datetime-local"}
                    id="eventDate"
                  />
                </FormControl>

                <FormControl>
                  <div className="left">
                    <FormLabel htmlFor="expirationDate">
                      Expiration Date
                    </FormLabel>
                    <FormHelperText>
                      The gallery will no longer be visible after the expiration
                      date.
                    </FormHelperText>
                  </div>
                  <Input
                    {...register("expirationDate")}
                    type={"datetime-local"}
                    id="expirationDate"
                  />
                </FormControl>

                <FormControl>
                  <div className="left">
                    <FormLabel htmlFor="galleryDirection">
                      Gallery directory
                    </FormLabel>
                    <FormHelperText>
                      Share this gallery with the public by displaying it in
                      your <Link to={"/galleries"}>gallery directory.</Link>
                    </FormHelperText>
                  </div>
                  <input
                    {...register("galleryDirection")}
                    type={"checkbox"}
                    id="galleryDirection"
                  />
                  <label htmlFor="galleryDirection">
                    Display in gallery directory
                  </label>
                </FormControl>

                <p
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  <i className="fa-solid fa-chevron-down"></i> Additional
                  options
                </p>

                {toggle && (
                  <>
                    <FormControl>
                      <div className="left">
                        <FormLabel htmlFor="project">Project</FormLabel>
                        <FormHelperText>
                          Associate this gallery with a project or booked
                          mini-session.
                        </FormHelperText>
                      </div>
                      <Input
                        type={"text"}
                        id="project"
                        {...register("project")}
                      />
                    </FormControl>

                    <FormControl>
                      <div className="left">
                        <FormLabel htmlFor="description">Description</FormLabel>
                        <FormHelperText>
                          Event location, details, etc.
                        </FormHelperText>
                      </div>
                      <Input
                        type={"text"}
                        id="description"
                        {...register("description")}
                      />
                    </FormControl>

                    <FormControl>
                      <div className="left">
                        <FormLabel htmlFor="seoTitle">SEO Title</FormLabel>
                        <FormHelperText>
                          Recommended to be around 60 characters long
                        </FormHelperText>
                      </div>
                      <Input
                        type={"text"}
                        id="seoTitle"
                        {...register("seoTitle")}
                      />
                    </FormControl>

                    <FormControl>
                      <div className="left">
                        <FormLabel htmlFor="seoDescription">
                          SEO Description
                        </FormLabel>
                        <FormHelperText>
                          Recommended to be between 50 to 160 characters long
                        </FormHelperText>
                      </div>
                      <Input
                        type={"text"}
                        id="seoDescription"
                        {...register("seoDescription")}
                      />
                    </FormControl>
                  </>
                )}

                <Button mt={4} isLoading={isSubmitting} type="submit">
                  Next: Choose a Cover Layout
                </Button>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/* ----------------------------- */}

        <div className="galleryCardAndStudioVisit">
          <div className="galleryCards">
            <Link to={`/galleryImageDetail`}>
              <div className="card">
                <div className="expired">
                  <p>EXPIRED</p>
                </div>
                <div className="galleryImage">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8mEIWZjRFdiO4YIkq790lTaNzTtCH6DcwrQ&usqp=CAU"
                    alt="GalleryImage"
                  />
                </div>

                <div className="galleryName">
                  <p>Shahriyar's Gallery</p>
                  <div className="visitorAndImageLength">
                    <span>0</span>
                    <i className="fa-solid fa-images"></i>
                    <span>1</span>
                    <i className="fa-solid fa-eye"></i>
                  </div>
                </div>
              </div>
            </Link>

            <Link to={`/galleryImageDetail`}>
              <div className="card">
                <div className="galleryImage">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8mEIWZjRFdiO4YIkq790lTaNzTtCH6DcwrQ&usqp=CAU"
                    alt="GalleryImage"
                  />
                </div>

                <div className="galleryName">
                  <p>Shahriyar's Gallery</p>
                  <div className="visitorAndImageLength">
                    <span>0</span>
                    <i className="fa-solid fa-images"></i>
                    <span>1</span>
                    <i className="fa-solid fa-eye"></i>
                  </div>
                </div>
              </div>
            </Link>

            <Link to={`/galleryImageDetail`}>
              <div className="card">
                <div className="galleryImage">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8mEIWZjRFdiO4YIkq790lTaNzTtCH6DcwrQ&usqp=CAU"
                    alt="GalleryImage"
                  />
                </div>

                <div className="galleryName">
                  <p>Shahriyar's Gallery</p>
                  <div className="visitorAndImageLength">
                    <span>0</span>
                    <i className="fa-solid fa-images"></i>
                    <span>1</span>
                    <i className="fa-solid fa-eye"></i>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="studioManagerVisit">
            <div className="leftText">
              <h5>What's New?</h5>

              <h6>Studio Manager:</h6>
              <p>Online booking, mini-sessions, biolinks & morel</p>

              <Link to={"/manager"}>Get Started</Link>
            </div>

            <div className="rightImage">
              <img src={whatsNewImage} alt="" />
            </div>
          </div>
        </div>

        <section className="dashboardSection2">
          {" "}
          {/* Google Maps */}
          <div className="maps">
            <div className="headText">
              <h5>Gallery Visitor Map</h5>
              <p>
                <i className="fa-solid fa-location-dot"></i> Pins represent the
                number of page views from an approximate location.
              </p>
            </div>
            <LoadScript googleMapsApiKey="AIzaSyCEotFdnmCMqDKPcHM81rbgcynBLP9Qarg">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                options={options}
                zoom={10}
              >
                <Marker position={center} />
              </GoogleMap>
            </LoadScript>
          </div>
          {/* ----------------------------- */}
          <div className="notification">
            <div className="headText">
              <h5>Notification</h5>
              <p>Gallery, Document and Form activity notifications</p>
            </div>
            <hr />
            <div className="alert">
              {userData.activity.length === 0 ? (
                <h2>No Activity</h2>
              ) : (
                userData?.activity?.map((element) => {
                  return (
                    <Link to={"/crm/dashboard"}>
                      <div className="card">
                        <div className="icon">
                          {element.activityName === "Password Changed" ? (
                            <i className="fa-solid fa-unlock"></i>
                          ) : element.activityName === "Email Changed" ? (
                            <i className="fa-solid fa-envelope-open-text"></i>
                          ) : (
                            <i className="fa-solid fa-signature"></i>
                          )}
                        </div>
                        <div className="text">
                          <h6>{element.activityName}</h6>
                          <p>{element.activityDate}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </section>

        <section className="dashboardSection3">
          {" "}
          <div className="visitorDetail">
            <div className="headText">
              <h5>Gallery Visitor Details</h5>
            </div>
            <div className="tab">
              <Tabs variant="soft-rounded" colorScheme="green">
                <TabList>
                  <Tab>LAST DAY</Tab>
                  <Tab>LAST WEEK</Tab>
                  <Tab>LAST MONTH</Tab>
                  <Tab>CUSTOM</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <i className="fa-solid fa-users"></i>
                  </TabPanel>
                  <TabPanel>
                    <p>two!</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
          </div>
          <div className="orders">
            <div className="headText">
              <h5>Recent Orders</h5>
            </div>
            <hr />
            <div className="alert">
              <div className="card">
                <div className="icon">
                  <i className="fa-solid fa-signature"></i>
                </div>
                <div className="text">
                  <h6>Test Client</h6>
                  <p>completed Wedding Invoice (Demo)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="dashboardSection4">
          <div className="giphy">
            <Link to={"/blog/introducing-animated-gifs"}>
              <div>
                <div className="text">
                  <h6>LIGHTFOLIO BLOG</h6>
                  <h5>Introduction Animated GIFs</h5>
                  <p>by Lightfolio Staff</p>
                </div>
              </div>
            </Link>
            <p>TUESDAY, AUG 31, 2021 · NEWS</p>
          </div>
          <div className="orders">
            <div className="headText">
              <h5>Knowledge Base Highlights</h5>
            </div>
            <div className="alert">
              <div className="card">
                <Link to={"/help"}>How Do I Set-up Sales?</Link>
                <p>Sales</p>
              </div>
              <hr />
              <div className="card">
                <Link to={"/help"}>
                  Can I Move Images to Another Folder or Gallery?
                </Link>
                <p>Client Galleries</p>
              </div>
              <hr />
              <div className="card">
                <Link to={"/help"}>How do I sell Digital Downloads?</Link>
                <p>Sales</p>
              </div>
              <hr />
              <div className="card">
                <Link to={"/help"}>View all articles</Link>
              </div>
              <hr />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;

import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
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
import axios from "axios";
import LoadingComp from "../../../components/loading/index";
import { convertToBase64, createPost } from "../../../services";
import ProgressBar from "../../../components/progressBar";

const DashboardPage = () => {
  const [loadedPercent, setLoadedPercent] = useState(0);
  const [loading, setLoading] = useState(false);

  // Modal State's
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: coverİmageOpen,
    onOpen: onCoverİmageOpen,
    onClose: onCoverClose,
  } = useDisclosure();

  // Image Download State
  const [postImage, setPostImage] = useState({
    myFile: "",
  });
  const [albomId, setAlbomId] = useState("");

  // dropzone file download
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      handleFileUpload(acceptedFiles[0]);
    },
  });

  // Get User Data
  const userData = useSelector((state) => state.getAllUserDataReducer);

  //Get User Country and City Name
  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        let locationObj = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        localStorage.setItem("location", JSON.stringify(locationObj));
      });
    }
  };
  useEffect(() => {
    GetCountryCity();
    getLocation();
  }, []);

  // Google Maps
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  let lat = JSON.parse(localStorage.getItem("location"));
  const center = {
    lat: lat?.lat,
    lng: lat?.lon,
  };

  const options = {
    mapTypeId: "satellite",
  };

  // Country and City Name
  const GetCountryCity = async () => {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat.lat}&lon=${lat.lon}&format=json`
    );
    localStorage.setItem("userLocation", JSON.stringify(response.data));
  };

  // Modal New Gallery Form
  const [toggle, setToggle] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    const { data } = await axios.post(
      `http://localhost:3000/galleryCreate/${userData.data._id}`,
      values
    );
    onCoverİmageOpen();

    setAlbomId(data.galleryId);
  };
  // -------------------------------

  // Expiring Date Handle
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}/${current.getHours()}/${current.getMinutes()}`;

  //Cover Image Convert to base64
  const handleFileUpload = async (e) => {
    const file = e;
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });
  };

  const handleFileInput = async (e) => {
    const file = e.target.file[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });
  };

  const handleImageUpload = async () => {
    setLoading(true);
    await createPost(
      postImage,
      "coverImage",
      albomId,
      userData.data._id,
      setLoadedPercent
    );
    setLoading(false);
  };
  //-------------------------------------------

  useEffect(() => {
    if (loadedPercent === 100) {
      setTimeout(() => {
        onCoverClose();
        onClose();
      }, 1000);
    }
  }, [loadedPercent]);

  // expiration Date
  const expiration = new Date();
  const expirationDate =
    expiration.getMonth() + 1 < 10
      ? `${expiration.getFullYear()}-0${
          expiration.getMonth() + 1
        }-${expiration.getDate()}T${expiration.getHours()}:${expiration.getMinutes()}`
      : `${expiration.getFullYear()}-${
          expiration.getMonth() + 1
        }-${expiration.getDate()}T${expiration.getHours()}:${expiration.getMinutes()}`;

  localStorage.setItem("id", userData?.data?._id);

  return (
    <div id="dashboard">
      <Helmet>
        <title>Home </title>
      </Helmet>

      {userData.loading ? (
        <LoadingComp />
      ) : (
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
                        The gallery will no longer be visible after the
                        expiration date.
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
                          <FormLabel htmlFor="description">
                            Description
                          </FormLabel>
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
              {userData.data.galleries.length === 0 ? (
                <div className="gallerislength" onClick={onOpen}>
                  <i className="fa-solid fa-camera"></i>
                  <p>No Galleries</p>
                </div>
              ) : (
                userData.data.galleries.reverse().map((e, i) => {
                  if (i < 3) {
                    return (
                      <Link to={`galleries/galleriesDetail/${e._id}`} key={i}>
                        <div className="card">
                          <div className="expired">
                            {e?.expirationDate !== "" &&
                            e?.expirationDate?.slice(0, 10) >=
                              expirationDate?.slice(0, 10) ? (
                              ""
                            ) : (
                              <p>EXPIRED</p>
                            )}
                          </div>
                          <div className="galleryImage">
                            <img
                              src={`${e?.coverImage?.coverImg}`}
                              alt={e?.galleryName}
                            />
                            <h6>{e?.galleryName}</h6>
                          </div>

                          <div className="galleryName">
                            <p>{e?.galleryName}</p>
                            <div className="visitorAndImageLength">
                              <span>{e?.galleryImage?.length}</span>
                              <i className="fa-solid fa-images"></i>
                              <span>1</span>
                              <i className="fa-solid fa-eye"></i>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  } else {
                    null;
                  }
                })
              )}
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
                  <i className="fa-solid fa-location-dot"></i> Pins represent
                  the number of page views from an approximate location.
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
                {userData?.data?.activity?.length === 0 ? (
                  <div className="noNotification">
                    <i className="fa-solid fa-bell"></i>
                    <h4>No recent notifications</h4>
                  </div>
                ) : (
                  userData?.data?.activity?.reverse().map((element, index) => {
                    return (
                      <Link to={"/crm/dashboard"} key={index}>
                        <div className="card">
                          <div className="icon">
                            {element.activityName === "Password Changed" ? (
                              <i className="fa-solid fa-unlock"></i>
                            ) : element.activityName === "Email Changed" ? (
                              <i className="fa-solid fa-envelope-open-text"></i>
                            ) : element.activityName === "Name Updated" ? (
                              <i className="fa-solid fa-pen-nib"></i>
                            ) : element.activityName === "Name Updated" ? (
                              <i className="fa-solid fa-signature"></i>
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
            <div className="orders knowledge">
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
      )}
      {/* CoverImage Modal */}
      <Modal
        closeOnOverlayClick={false}
        isOpen={coverİmageOpen}
        onClose={onCoverClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload to your Gallery Cover Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <div {...getRootProps()} className="coverImage">
                <FormLabel htmlFor="coverImage">Cover Image</FormLabel>
                <FormHelperText>The date the photos were taken.</FormHelperText>
                <input
                  {...getInputProps()}
                  id="coverImage"
                  onChange={(e) => {
                    handleFileInput(e);
                  }}
                />
                {acceptedFiles.length > 0 && (
                  <p>Selected file: {acceptedFiles[0].name}</p>
                )}
              </div>
              <div className="progress-text">{loadedPercent}%</div>
              <ProgressBar loadedPercent={loadedPercent} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              isLoading={loading}
              onClick={handleImageUpload}
            >
              Save
            </Button>
            <Button onClick={onCoverClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DashboardPage;

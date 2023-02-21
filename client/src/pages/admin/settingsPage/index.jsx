import React, { useState } from "react";
import { Helmet } from "react-helmet";
import logo from "../../../assets/images/digital downloads photo.jpg";
import "./index.scss";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const SettingsPage = () => {
  const [toggle, setToggle] = useState(false);
  const userData = useSelector((state) => state.getAllUserDataReducer);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    return new Promise((resolve) => {
      alert(JSON.stringify(values, null, 2));
      resolve();
    });
  }

  function socialMediaLinks(values) {
    axios.patch(`http://localhost:3000/business/${userData._id}`);
    return new Promise((resolve) => {
      alert(JSON.stringify(values, null, 2));
      resolve();
    });
  }
  // -----------------------------------

  // Image convert Base64 and mongo DB upload
  const [postImage, setPostImage] = useState({
    myFile: "",
  });

  const url = `http://localhost:3000/uploads/${userData._id}`;
  const createImage = async (newImage) => {
    await axios.patch(url, newImage);
    setLoading(false);
  };

  const createPost = async (post) => {
    try {
      await createImage(post);
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(loading);

  const handleSubmitImage = (e) => {
    e.preventDefault();
    createPost(postImage);
    setLoading(true);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });
  };

  // ---------------------------------------

  //------------------- User Location ------------------
  let userLocation = JSON.parse(localStorage.getItem("userLocation"));
  //----------------------------------------------------

  return (
    <div id="settings">
      <Helmet>
        <title>Business Setup</title>
      </Helmet>
      <div className="settings">
        <div className="settingsHeader">
          <h2>Settings</h2>
        </div>

        <div className="settingsFlex">
          <div className="businessProfile">
            <div className="contactHeader">
              <h4>Business Profile</h4>
              <button>SELECT LOGO</button>
            </div>

            <div className="companyLogo">
              <img src={logo} alt="company logo" />
              <p>
                <i className="fa-solid fa-circle-info"></i>
                <span>Upload your company logo</span> . Jpeg, gif or png files
                only.
              </p>
            </div>

            <div className="businnesAccount">
              <div className="favicon">
                <p>Favicon</p>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  multiple
                />
              </div>

              <div className="businessAbout">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl isRequired isInvalid={errors.businessName}>
                    <FormLabel htmlFor="businessName">Business Name</FormLabel>
                    <Input
                      id="businessName"
                      name="businessName"
                      placeholder="Business Name"
                      defaultValue={userData?.companyName}
                      {...register("businessName", {
                        required: "Business Name is required",
                        minLength: {
                          value: 3,
                          message: "Minimum length should be 3",
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.businessName && errors.businessName.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormLabel htmlFor="businessWebSite">
                    Business Web Site
                  </FormLabel>
                  <Input
                    id="businessWebSite"
                    name="businessWebSite"
                    placeholder="http://www.mycompany.com"
                    {...register("businessWebSite")}
                  />

                  <FormLabel htmlFor="businessEmail">Business Email</FormLabel>
                  <Input
                    id="businessEmail"
                    name="businessEmail"
                    defaultValue={userData.email}
                    {...register("businessEmail")}
                  />
                  <div className="toggleBtn">
                    <h6
                      onClick={() => {
                        setToggle(!toggle);
                      }}
                    >
                      Show more details{" "}
                      <i className="fa-solid fa-chevron-down"></i>
                    </h6>
                  </div>

                  {toggle && (
                    <>
                      <div className="faxAndPhone">
                        <div>
                          <FormLabel htmlFor="businessPhone">
                            Business Phone
                          </FormLabel>
                          <Input
                            id="businessPhone"
                            name="businessPhone"
                            {...register("businessPhone")}
                          />
                        </div>

                        <div>
                          <FormLabel htmlFor="faxNumber">Fax Number</FormLabel>
                          <Input
                            id="faxNumber"
                            name="faxNumber"
                            {...register("faxNumber")}
                          />
                        </div>
                      </div>
                      <FormLabel htmlFor="businessWebSite">
                        Business Address
                      </FormLabel>
                      <Input
                        defaultValue={
                          userLocation ? userLocation.display_name : ""
                        }
                        id="addressLine1"
                        name="addressLine1"
                        placeholder="Address Line 1"
                        {...register("addressLine1")}
                      />

                      <Input
                        className="input"
                        id="addressLine2"
                        name="addressLine2"
                        placeholder="Address Line 2"
                        {...register("addressLine2")}
                      />
                      <div className="cityAndPostal">
                        <Input
                          className="input"
                          defaultValue={
                            userLocation ? userLocation.address.city : ""
                          }
                          id="city"
                          name="city"
                          placeholder="City"
                          {...register("city")}
                        />

                        <Input
                          className="input"
                          defaultValue={
                            userLocation ? userLocation.address.postcode : ""
                          }
                          id="postalCode"
                          name="postalCode"
                          placeholder="Postal Code"
                          {...register("postalCode")}
                        />
                      </div>
                      <Select
                        placeholder={
                          userLocation
                            ? userLocation.address.country
                            : "Please Select Country"
                        }
                        className="input"
                      >
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </Select>
                    </>
                  )}

                  {/* <Button mt={4} isLoading={loading} type="submit">
                    SAVE
                  </Button> */}
                </form>
              </div>

              {/* <div className="imageDownload">
                <div>
                  <form onSubmit={handleSubmitImage}>
                    <input
                      type="file"
                      label="Image"
                      name="myFile"
                      accept=".jpeg, .png, .jpg"
                      onChange={(e) => handleFileUpload(e)}
                    />

                    <button>Submit</button>
                  </form>
                </div>
              </div> */}
              {/* {userData?.galleries?.map((e, i) => {
                return <img key={i} src={`${e?.data}`} alt={"asd"} />;
              })} */}
            </div>
            
            <div className="socialMediaLinks">
              <div className="socialHeaderText">
                <h4>Social Media Links</h4>
                <p>
                  Make it easy for clients to connect with your social media
                  presence by adding links to your{" "}
                  <Link to={"/galleries/directory"}>gallery directory</Link>.
                </p>
              </div>

              <form onSubmit={handleSubmit(socialMediaLinks)}>
                <FormLabel htmlFor="facebookUrl">Facebook URL</FormLabel>
                <Input
                  id="facebookUrl"
                  name="facebookUrl"
                  placeholder="https://www.facebook.com/username"
                  {...register("facebookUrl")}
                />

                <FormLabel htmlFor="twitterUrl">Twitter URL</FormLabel>
                <Input
                  id="twitterUrl"
                  name="twitterUrl"
                  placeholder="https://www.twitter.com/username"
                  {...register("twitterUrl")}
                />

                <FormLabel htmlFor="instagramUrl">Instagram URL</FormLabel>
                <Input
                  id="instagramUrl"
                  name="instagramUrl"
                  placeholder="https://www.instagram.com/username"
                  {...register("instagramUrl")}
                />

                <FormLabel htmlFor="pinterestUrl">Pinterest URL</FormLabel>
                <Input
                  id="pinterestUrl"
                  name="pinterestUrl"
                  placeholder="https://www.pinterest.com/username"
                  {...register("pinterestUrl")}
                />

                <FormLabel htmlFor="youtubeUrl">Youtube URL</FormLabel>
                <Input
                  id="youtubeUrl"
                  name="youtubeUrl"
                  placeholder="https://www.youtube.com/username"
                  {...register("youtubeUrl")}
                />

                <FormLabel htmlFor="tiktokUrl">Tiktok URL</FormLabel>
                <Input
                  id="tiktokUrl"
                  name="tiktokUrl"
                  placeholder="https://www.tiktok.com/username"
                  {...register("tiktokUrl")}
                />

                <FormLabel htmlFor="snapchatrUrl">Snapchat URL</FormLabel>
                <Input
                  id="snapchatrUrl"
                  name="snapchatrUrl"
                  placeholder="https://www.snapchat.com/username"
                  {...register("snapchatrUrl")}
                />
                <Button mt={4} isLoading={loading} type="submit">
                  SAVE
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
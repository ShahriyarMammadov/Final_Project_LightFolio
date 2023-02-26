import React, { useEffect, useState } from "react";
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
  Switch,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingComp from "../../../components/loading";
import { convertToBase64, createPost } from "../../../services";

const SettingsPage = () => {
  const [toggle, setToggle] = useState(false);
  const userData = useSelector((state) => state.getAllUserDataReducer);
  const countryData = useSelector((state) => state.getAllCountryReducer);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    // return new Promise((resolve) => {
    //   alert(JSON.stringify(values, null, 2));
    //   resolve();
    // });
  }
  // -----------------------------------

  // Image convert Base64 and mongo DB upload
  const [postImage, setPostImage] = useState({
    myFile: "",
  });

  const handleSubmitImage = async (e) => {
    e.preventDefault();
    await createPost(
      postImage,
      "uploads",
      "63f888f45e4e08b9eb262aa0",
      userData.data._id
    );
    setLoading(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });
  };

  // -----------------------------------------------------

  //------------------- User Location --------------------
  let userLocation = JSON.parse(localStorage.getItem("userLocation"));
  //------------------------------------------------------

  //------------------ Update Business Data --------------
  const socialMediaLinks = async (values) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:3000/business/${userData?.data?._id}`,
        values
      );
      console.log(data);
      toast({
        title: `${data.message}`,
        position: "bottom-right",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: `${data.message}`,
        position: "bottom-right",
        status: "error",
        isClosable: true,
      });
    }
  };
  //------------------------------------------------------

  return (
    <div id="settings">
      <Helmet>
        <title>Business Setup</title>
      </Helmet>

      {userData.loading ? (
        <LoadingComp />
      ) : (
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
                      <FormLabel htmlFor="companyName">Business Name</FormLabel>
                      <Input
                        id="companyName"
                        name="companyName"
                        placeholder="Business Name"
                        defaultValue={userData?.data?.companyName}
                        {...register("companyName", {
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
                      defaultValue={userData?.data?.business?.businessWebSite}
                      id="businessWebSite"
                      name="businessWebSite"
                      placeholder="http://www.mycompany.com"
                      {...register("businessWebSite")}
                    />

                    <FormLabel htmlFor="businessEmail">
                      Business Email
                    </FormLabel>
                    <Input
                      id="businessEmail"
                      name="businessEmail"
                      defaultValue={userData?.data?.email}
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
                              defaultValue={
                                userData?.data?.business?.businessPhone
                              }
                              id="businessPhone"
                              name="businessPhone"
                              {...register("businessPhone")}
                            />
                          </div>

                          <div>
                            <FormLabel htmlFor="faxNumber">
                              Fax Number
                            </FormLabel>
                            <Input
                              defaultValue={userData?.data?.business?.faxNumber}
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
                            userData?.data?.business?.addressLine1
                              ? userData?.data?.business?.addressLine1
                              : userLocation?.display_name
                          }
                          id="addressLine1"
                          name="addressLine1"
                          placeholder="Address Line 1"
                          {...register("addressLine1")}
                        />

                        <Input
                          defaultValue={userData?.data?.business?.addressLine2}
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
                              userData?.data?.business?.city
                                ? userData?.data?.business?.city
                                : userLocation?.address?.city
                            }
                            id="city"
                            name="city"
                            placeholder="City"
                            {...register("city")}
                          />

                          <Input
                            className="input"
                            defaultValue={
                              userData?.data?.business?.postalCode
                                ? userData?.data?.business?.businessPhone
                                : userLocation?.address?.postcode
                            }
                            id="postalCode"
                            name="postalCode"
                            placeholder="Postal Code"
                            {...register("postalCode")}
                          />
                        </div>
                        <Select
                          name="country"
                          id="country"
                          placeholder={
                            userData?.data?.business?.country
                              ? userData?.data?.business?.country
                              : userLocation?.address?.country
                          }
                          className="input"
                          {...register("postalCode")}
                        >
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </Select>
                      </>
                    )}
                  </form>
                </div>
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
                    defaultValue={userData?.data?.socialMedia?.facebookUrl}
                    id="facebookUrl"
                    name="facebookUrl"
                    placeholder="https://www.facebook.com/username"
                    {...register("facebookUrl")}
                  />

                  <FormLabel htmlFor="twitterUrl">Twitter URL</FormLabel>
                  <Input
                    defaultValue={userData?.data?.socialMedia?.twitterUrl}
                    id="twitterUrl"
                    name="twitterUrl"
                    placeholder="https://www.twitter.com/username"
                    {...register("twitterUrl")}
                  />

                  <FormLabel htmlFor="instagramUrl">Instagram URL</FormLabel>
                  <Input
                    defaultValue={userData?.data?.socialMedia?.instagramUrl}
                    id="instagramUrl"
                    name="instagramUrl"
                    placeholder="https://www.instagram.com/username"
                    {...register("instagramUrl")}
                  />

                  <FormLabel htmlFor="pinterestUrl">Pinterest URL</FormLabel>
                  <Input
                    defaultValue={userData?.data?.socialMedia?.pinterestUrl}
                    id="pinterestUrl"
                    name="pinterestUrl"
                    placeholder="https://www.pinterest.com/username"
                    {...register("pinterestUrl")}
                  />

                  <FormLabel htmlFor="youtubeUrl">Youtube URL</FormLabel>
                  <Input
                    defaultValue={userData?.data?.socialMedia?.youtubeUrl}
                    id="youtubeUrl"
                    name="youtubeUrl"
                    placeholder="https://www.youtube.com/username"
                    {...register("youtubeUrl")}
                  />

                  <FormLabel htmlFor="tiktokUrl">Tiktok URL</FormLabel>
                  <Input
                    defaultValue={userData?.data?.socialMedia?.tiktokUrl}
                    id="tiktokUrl"
                    name="tiktokUrl"
                    placeholder="https://www.tiktok.com/username"
                    {...register("tiktokUrl")}
                  />

                  <FormLabel htmlFor="snapchatrUrl">Snapchat URL</FormLabel>
                  <Input
                    defaultValue={userData?.data?.socialMedia?.snapchatUrl}
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

            <div className="appSettings">
              <div className="app">
                <label htmlFor="">Default Country</label>
                <Select
                  placeholder={
                    userLocation
                      ? userLocation.address.country
                      : "Please Select Country"
                  }
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
                <div className="currencyAndDateFormat">
                  <div>
                    <label htmlFor="">Base Currency</label>
                    <Select
                      placeholder={
                        userLocation
                          ? userLocation.address.country
                          : "Please Select Country"
                      }
                    >
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </Select>
                  </div>
                  <div className="select2">
                    <label htmlFor="">Date Format</label>
                    <Select
                      placeholder={
                        userLocation
                          ? userLocation.address.country
                          : "Please Select Country"
                      }
                    >
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </Select>
                  </div>
                </div>

                <label htmlFor="">Time Zone</label>
                <Select
                  placeholder={
                    userLocation
                      ? userLocation.address.country
                      : "Please Select Country"
                  }
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>

                <div className="checkbox">
                  <input name="daylight" id="daylight" type="checkbox" />{" "}
                  <label htmlFor="daylight">
                    Observe Daylight Savings Time
                  </label>
                </div>

                <div className="checkboxsForBranding">
                  <div className="headerBranding">
                    <h4>Lightfolio Branding</h4>
                  </div>
                  <div className="switch">
                    <Switch id="galleries" isInvalid />
                    <FormLabel htmlFor="galleries">
                      <span>Galleries:</span> Hide Lightfolio branding.
                    </FormLabel>
                  </div>
                  <div className="switch">
                    <Switch id="forms" isInvalid />
                    <FormLabel htmlFor="forms">
                      <span> Forms:</span> Hide Lightfolio branding.:
                    </FormLabel>
                  </div>
                </div>

                <div className="activityNotificationEmail">
                  <div className="activityHeader">
                    <h4>Activity Notification Emails</h4>
                  </div>

                  <div className="control">
                    <p>
                      Control how frequently you'd like to receive gallery
                      activity notifications by email:
                    </p>

                    <button>Never</button>
                    <button className="leftBtn">Daily</button>
                    <button className="leftBtn">Weekly</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;

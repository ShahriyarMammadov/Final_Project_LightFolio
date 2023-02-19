import React from "react";
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
} from "@chakra-ui/react";

const SettingsPage = () => {
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
      }, 3000);
    });
  }

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
                  <FormControl isInvalid={errors.name}>
                    <FormLabel htmlFor="name">First name</FormLabel>
                    <Input
                      id="name"
                      placeholder="name"
                      {...register("name", {
                        required: "This is required",
                        minLength: {
                          value: 4,
                          message: "Minimum length should be 4",
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.name && errors.name.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

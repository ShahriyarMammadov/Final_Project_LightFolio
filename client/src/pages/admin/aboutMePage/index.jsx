import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Helmet from "react-helmet";
import "./index.scss";
import logo from "../../../assets/images/gallery-directory1.jpg";
import { useForm } from "react-hook-form";
import { FormHelperText } from "@chakra-ui/react";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";

const AboutMePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const userData = useSelector((state) => state.getAllUserDataReducer);

  console.log(userData);
  // Change userData
  const changeData = async (values) => {
    const { data } = await axios.put(
      `http://localhost:3000/user/${userData._id}`,
      values
    );
    console.log(data);
    location.reload();
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  // Object split metodu ile fullName-nin first ve last name-e ayrilmasi
  let firstAndLastName = userData?.fullName?.split(" ");

  // Form onSubmit
  function onSubmit(values) {
    return new Promise((resolve) => {
      values.firstName = values.firstName + " " + values.lastName;
      values["fullName"] = values["firstName"];
      delete values.lastName;
      delete values.firstName;
      changeData(values);
      console.log(values);
      resolve();
    });
  }

  // Email Change
  const changeEmail = () => {
    axios.put()
  };

  return (
    <div className="about">
      <div id="aboutMePage">
        <Helmet>
          <title>About Me</title>
        </Helmet>
        <div className="aboutHeader">
          <h2>About Me</h2>
        </div>
        <div className="contactInformation">
          <div className="contactHeader">
            <h4>Contact Information</h4>
          </div>

          <div className="contactFill">
            <div className="image">
              <p>UPLOAD IMAGE</p>
              <img src={logo} alt="userImage" />
            </div>

            <div className="userInformation">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="inputs">
                  <FormControl isInvalid={errors.firstName}>
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <Input
                      id="firstName"
                      placeholder="First"
                      defaultValue={firstAndLastName && firstAndLastName[1]}
                      {...register("firstName", {
                        required: "This is required",
                        minLength: {
                          value: 3,
                          message: "Minimum length should be 3",
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.firstName && errors.firstName.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.lastName}>
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <Input
                      id="lastName"
                      placeholder="Last"
                      defaultValue={firstAndLastName && firstAndLastName[1]}
                      {...register("lastName", {
                        required: "This is required",
                        minLength: {
                          value: 3,
                          message: "Minimum length should be 3",
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.lastName && errors.lastName.message}
                    </FormErrorMessage>
                  </FormControl>
                </div>

                <div className="changeEmail">
                  <FormLabel htmlFor="firstName">Email</FormLabel>
                  <div className="email">
                    <Input
                      id="firstName"
                      isDisabled
                      defaultValue={userData?.email}
                      placeholder={userData?.email}
                      {...register("firstName", {
                        required: "This is required",
                        minLength: {
                          value: 3,
                          message: "Minimum length should be 3",
                        },
                      })}
                    />
                    <span onClick={onOpen}>Change Email</span>
                  </div>
                  <p>
                    <i className="fa-solid fa-circle-info"></i> This email
                    address will be used for logging into Lightfolio.
                  </p>
                </div>

                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  SAVE
                </Button>
              </form>

              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Change Your Email Address</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl>
                      <FormLabel>New Email</FormLabel>
                      <Input
                        placeholder="First name"
                        onChange={(e) => {
                          setNewEmail(e.target.value);
                        }}
                      />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Password</FormLabel>
                      <Input
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        placeholder="Last name"
                      />
                    </FormControl>

                    <p>
                      * Changing an email address will require confirmation of
                      the new address. After clicking Save, an email will be
                      sent to the new address containing a verification link.
                      The link must be clicked before account access is
                      restored.
                    </p>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={changeEmail}>
                      Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMePage;

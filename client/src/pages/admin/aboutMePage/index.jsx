import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Helmet from "react-helmet";
import "./index.scss";
import logo from "../../../assets/images/gallery-directory1.jpg";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
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
  const {
    isOpen: emailOpen,
    onOpen: onEmailOpen,
    onClose: onEmailClose,
  } = useDisclosure();
  const {
    isOpen: passwordOpen,
    onOpen: onPasswordOpen,
    onClose: onPasswordClose,
  } = useDisclosure();

  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [signature, setSignature] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}/${current.getHours()}:${current.getMinutes()}`;

  const userData = useSelector((state) => state.getAllUserDataReducer);
  console.log(userData);

  // Change userData
  const changeData = async (values) => {
    values.activity = "Name Updated";
    values.activityDate = date;
    setLoading(true);

    const { data } = await axios.put(
      `http://localhost:3000/user/${userData._id}`,
      values
    );
    setLoading(false);
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
  const changeEmail = async () => {
    try {
      setLoading(true);
      let { data } = await axios.patch(
        `http://localhost:3000/email/${userData._id}`,
        { newEmail, password, activity: "Email Changed", activityDate: date }
      );
      toast({
        title: `${data.message}`,
        position: "bottom-right",
        status: "success",
        isClosable: true,
      });
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: `${error.response.data.message}`,
        position: "bottom-right",
        status: "error",
        isClosable: true,
      });
      setLoading(false);
    }
  };

  // Password Change
  const changePassword = async () => {
    if (newPassword !== newPasswordConfirm) {
      setConfirmError("Passwords are not suitable");
    } else {
      setConfirmError("");
      try {
        setLoading(true);
        const { data } = await axios.patch(
          `http://localhost:3000/password/${userData._id}`,
          {
            newPassword,
            currentPassword,
            activity: "Password Changed",
            activityDate: date,
          }
        );
        toast({
          title: `${data.message}`,
          position: "bottom-right",
          status: "success",
          isClosable: true,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast({
          title: `${error.response.data.message}`,
          position: "bottom-right",
          status: "error",
          isClosable: true,
        });
        setLoading(false);
      }
    }
  };

  // Signature Added
  const changeSignature = async () => {
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `http://localhost:3000/signature/${userData._id}`,
        { signature, activity: "Signature Changed", activityDate: date }
      );
      toast({
        title: `${data.message}`,
        position: "bottom-right",
        status: "success",
        isClosable: true,
      });
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: `${data.message}`,
        position: "bottom-right",
        status: "error",
        isClosable: true,
      });
      setLoading(false);
    }
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
          <div className="contactFill">
            <div className="contactHeader">
              <h4>Contact Information</h4>
            </div>
            <div className="changePassword">
              <div className="image">
                <p>UPLOAD IMAGE</p>
                <img src={logo} alt="userImage" />
              </div>

              <div className="userInformation">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="inputs">
                    <FormControl isInvalid={errors.firstName} isRequired>
                      <FormLabel htmlFor="firstName">First Name</FormLabel>
                      <Input
                        id="firstName"
                        placeholder="First"
                        defaultValue={firstAndLastName && firstAndLastName[0]}
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

                    <FormControl isInvalid={errors.lastName} isRequired>
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
                    <FormControl isInvalid={errors.email} isRequired>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <div className="email">
                        <Input
                          id="email"
                          value={userData?.email}
                          placeholder={userData?.email}
                          {...register("email", {
                            required: "This is required",
                            minLength: {
                              value: 3,
                              message: "Minimum length should be 3",
                            },
                          })}
                        />
                        <span onClick={onEmailOpen}>Change Email</span>
                      </div>
                    </FormControl>

                    <p>
                      <i className="fa-solid fa-circle-info"></i> This email
                      address will be used for logging into Lightfolio.
                    </p>
                  </div>
                  <Button mt={4} isLoading={isSubmitting} type="submit">
                    SAVE
                  </Button>
                </form>

                <div className="changePassword">
                  <p>Password</p>
                  <h6 onClick={onPasswordOpen}>Change Password</h6>
                </div>

                <Modal isOpen={passwordOpen} onClose={onPasswordClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Change Your Password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <FormControl isRequired>
                        <FormLabel>Old Password:</FormLabel>
                        <Input
                          type={"email"}
                          onChange={(e) => {
                            setCurrentPassword(e.target.value);
                          }}
                        />
                      </FormControl>

                      <FormControl mt={4} isRequired>
                        <FormLabel>New Password</FormLabel>
                        <Input
                          minLength={5}
                          type={"password"}
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                          }}
                        />
                        <div>{confirmError ? confirmError : ""}</div>
                      </FormControl>

                      <FormControl mt={4} isRequired>
                        <FormLabel>Confirm New Password</FormLabel>
                        <Input
                          minLength={5}
                          type={"password"}
                          onChange={(e) => {
                            setNewPasswordConfirm(e.target.value);
                          }}
                        />
                        <div>{confirmError ? confirmError : ""}</div>
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
                      <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={changePassword}
                        isLoading={loading}
                      >
                        Save
                      </Button>
                      <Button onClick={onPasswordClose}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

                <Modal isOpen={emailOpen} onClose={onEmailClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Change Your Email Address</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <FormControl isRequired>
                        <FormLabel>New Email</FormLabel>
                        <Input
                          type={"email"}
                          placeholder="New Email"
                          onChange={(e) => {
                            setNewEmail(e.target.value);
                          }}
                        />
                      </FormControl>

                      <FormControl mt={4} isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                          type={"password"}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          placeholder="Password"
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
                      <Button
                        colorScheme="teal"
                        mr={3}
                        onClick={changeEmail}
                        isLoading={loading}
                      >
                        Save
                      </Button>
                      <Button onClick={onEmailClose}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </div>
            </div>
          </div>

          <div className="sendingEmail">
            <div className="emailHeader">
              <h5>Sending Email</h5>
            </div>

            <div className="sendingEmailText">
              <p>
                By default, email sent on your behalf from Lightfolio (such as
                gallery invitations, download notifications, sales receipts,
                etc) are sent through our email servers. We recommend that you
                connect to your own, private email accounts (Gmail, Yahoo,
                Outlook, etc) for both higher deliverability rates and to have a
                copy of sent mail stored within your email service.
              </p>

              <p className="addEmail">
                Click <span>Add Email Account</span> to connect to your personal
                email address.
              </p>
            </div>

            <div className="addedEmail">
              <div className="aboutUserEmail">
                <div className="icon">
                  <i className="fa-solid fa-star"></i>
                  <p>Active</p>
                </div>
                <div className="aboutEmail">
                  <h6>Lightfolio Email</h6>
                  <p className="email">clientservices@lightfolio.com</p>
                  <p>Shahriyar Mammadov</p>
                </div>
              </div>
              <span>Edit</span>
            </div>
            <hr />
            <div className="addedBtn">
              <button>Add Email Account</button>
            </div>
          </div>

          <div className="emailSignature">
            <div className="emailHeader">
              <h5>Email Signature</h5>
            </div>

            <div className="textarea">
              <p>Signature</p>
              <textarea
                onChange={(value) => {
                  setSignature(value.target.value.trim());
                }}
                name="signature"
                id="signature"
                defaultValue={userData?.signature}
              ></textarea>
            </div>
            <button onClick={changeSignature}>SAVE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMePage;

import { Field, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import signupSchema from "./schema/index";
import axios from "axios";
import { Helmet } from "react-helmet";
import emailjs from "@emailjs/browser";

const SignupPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [randomNumber, setRandomNumber] = useState(0);
  const [formChanged, setFormChanged] = useState(true);
  const [finish, setFinish] = useState(false);
  const form = useRef();

  const handleSignupAuth = async (values) => {
    try {
      let { data } = await axios.post(
        "http://localhost:3000/register",
        values,
        {
          withCredentials: true,
        }
      );

      if (data?.created) {
        navigate("/login");
        const sendEmail = () => {
          emailjs
            .sendForm(
              "service_8545699",
              "template_nd84v7x",
              form.current,
              "yBlJtI3RX3LO5fbXF"
            )
            .then(
              (result) => {
                console.log(result);
              },
              (error) => {
                console.log(error.text);
              }
            );
        };
        sendEmail();
      } else {
        setError(`email is already registered!!`);
        alert("email is already registered!!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const randomVerificationNumber = () => {
    setLoading(true);
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    setRandomNumber(randomNum);

    var templateParams = {
      email: form.current[1].value,
      verificationCode: randomNum.toString(),
    };

    emailjs
      .send(
        "service_8545699",
        "template_nd84v7x",
        templateParams,
        "yBlJtI3RX3LO5fbXF"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          setFormChanged(false);
          setLoading(false);
        },
        function (error) {
          alert("FAILED...", error);
          setLoading(false);
        }
      );
  };

  const verificationController = (code) => {
    if (+code === randomNumber) {
      setFinish(true);
    } else {
      setError("verification code is not correct");
    }
  };

  return (
    <div id="signUpPage">
      <Helmet>
        <title>Create your free account - LightFolio</title>
        <meta name="description" content="photoGraphers studio photo" />
      </Helmet>
      <div className="form">
        <div className="headerTxt">
          <h3>Create your free Lightfolio account</h3>
          <p>No credit card required</p>
        </div>
        <Formik
          initialValues={{
            companyName: "",
            email: "",
            fullName: "",
            password: "",
          }}
          validationSchema={signupSchema}
          onSubmit={(values) => {
            finish ? handleSignupAuth(values) : null;
          }}
        >
          {formChanged ? (
            ({ errors, touched }) => (
              <Form ref={form}>
                <Field name="companyName" placeholder="Company Name" />
                {errors.companyName && touched.companyName ? (
                  <div>{errors.companyName}</div>
                ) : null}

                <Field name="email" type="email" placeholder="Email" />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
                {error && (
                  <div>
                    {error.email} <Link to={"/login"}>Login</Link>
                  </div>
                )}

                <Field name="fullName" placeholder="Your Full Name" />
                {errors.fullName && touched.fullName ? (
                  <div>{errors.fullName}</div>
                ) : null}

                <Field
                  name="password"
                  placeholder="Password"
                  type={"password"}
                />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
                <button type="submit" onClick={randomVerificationNumber}>
                  {loading ? <span className="loader"></span> : "Let's Do It"}
                </button>
              </Form>
            )
          ) : (
            <Form>
              <input
                type="number"
                placeholder="verification code"
                onChange={(e) => {
                  verificationController(e.target.value);
                }}
              />
              {error && <div>{error}</div>}
            </Form>
          )}
        </Formik>
        <p className="footerText">
          By clicking this button you agree to the Lightfolio{" "}
          <Link to={"/termsofuse"}>terms of use</Link> and{" "}
          <Link to={"/privacypolicy"}>privacy policy</Link>.
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

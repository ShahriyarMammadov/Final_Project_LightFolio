import { Field, Form, Formik } from "formik";
import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import signupSchema from "./schema/index";
import axios from "axios";

const SignupPage = () => {
  const handleSignupAuth = (values) => {
    console.log(values);
    try {
      axios.post("http://localhost:3000/register", values, {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="signUpPage">
      <div className="form">
        <div className="headerTxt">
          <h3>Create your free Lightfolio account</h3>
          <p>No credit card required</p>
        </div>
        <Formik
          initialValues={{
            // companyName: "",
            email: "",
            // fullName: "",
            password: "",
          }}
          validationSchema={signupSchema}
          onSubmit={(values) => {
            handleSignupAuth(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              {/* <Field name="companyName" placeholder="Company Name" />
              {errors.companyName && touched.companyName ? (
                <div>{errors.companyName}</div>
              ) : null} */}

              <Field name="email" type="email" placeholder="Email" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}

              {/* <Field name="fullName" placeholder="Your Full Name" />
              {errors.fullName && touched.fullName ? (
                <div>{errors.fullName}</div>
              ) : null} */}

              <Field name="password" placeholder="Password" />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
              <button type="submit">Let's Do It</button>
            </Form>
          )}
        </Formik>
        <p>
          By clicking this button you agree to the Lightfolio{" "}
          <Link to={"/termsofuse"}>terms of use</Link> and{" "}
          <Link to={"/privacypolicy"}>privacy policy</Link>.
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

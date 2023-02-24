import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import "./index.scss";
import { Link, Navigate, useNavigate } from "react-router-dom";
import signupSchema from "./schema/index";
import axios from "axios";
import { Helmet } from "react-helmet";

const SignupPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignupAuth = async (values) => {
    try {
      setLoading(true);
      let { data } = await axios.post(
        "http://localhost:3000/register",
        values,
        {
          withCredentials: true,
        }
      );

      if (data?.created) {
        setLoading(false);
        navigate("/login");
      }
      setError(data.errors);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="signUpPage">
      <Helmet>
        <title>Create your free account - LightFolio</title>
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
            handleSignupAuth(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name="companyName" placeholder="Company Name" />
              {errors.companyName && touched.companyName ? (
                <div>{errors.companyName}</div>
              ) : null}

              <Field name="email" type="email" placeholder="Email" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
              {error && (
                <div>
                  {error.email} <Link to={"/login"}>Login</Link>
                </div>
              )}

              <Field name="fullName" placeholder="Your Full Name" />
              {errors.fullName && touched.fullName ? (
                <div>{errors.fullName}</div>
              ) : null}

              <Field name="password" placeholder="Password" type={"password"} />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
              <button type="submit">
                {loading ? <span className="loader"></span> : "Let's Do It"}
              </button>
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

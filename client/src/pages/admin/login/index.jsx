import React from "react";
import { Formik, Form, Field } from "formik";
import LoginSchema from "./schema/index";
import axios from "axios";
import "./schema/index";
import "./index.scss";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/title-logo.png";

const LoginPage = () => {
  const handleLoginAuth = async (values) => {
    try {
      let { data } = await axios.post(
        "http://localhost:3000/login",
        {
          email: "sehriyarmemmedovvv4@gmail.com",
          password: "sehriyar123",
        },
        { withCredentials: true }
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="login">
      <Helmet>
        <title>Login | Lightfolio</title>
      </Helmet>
      <div className="left">
        <div className="text">
          <h2>
            Welcome to <span>Lightfolio</span>
          </h2>
          <p>Please log in to access your account.</p>
        </div>
      </div>

      <div className="right">
        <div className="logo">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <Formik
          initialValues={{
            password: "",
            email: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            handleLoginAuth(values);
            try {
              axios.post(
                "http://localhost:3000",
                {
                  email: "sehriyarmemmedovvv4@gmail.com",
                  password: "sehriyar123",
                },
                { withCredentials: true }
              );
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name="email" type="email" placeholder="Email Address" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
              <Field name="password" placeholder="Password" />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
              <button type="submit">LOG IN</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;

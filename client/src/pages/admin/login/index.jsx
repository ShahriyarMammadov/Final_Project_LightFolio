import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import LoginSchema from "./schema/index";
import axios from "axios";
import "./schema/index";
import "./index.scss";
import { Helmet } from "react-helmet";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/title-logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginAuth = async (values) => {
    try {
      let { data } = await axios.post("http://localhost:3000/login", values, {
        withCredentials: true,
      });

      setError(data.errors);

      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) {
            // setEmail(email);
          } else if (password) {
            // setPassword(password);
          }
        } else {
          navigate("/crm/dashboard");
        }
      }
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
              <Field
                name="email"
                type="email"
                placeholder="Email Address"
                style={
                  errors.email && touched.email ? { borderColor: "red" } : null
                }
              />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
              {<div>{error.email}</div>}

              <Field
                name="password"
                placeholder="Password"
                style={
                  errors.password && touched.password
                    ? { borderColor: "red" }
                    : null
                }
              />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
              {<div>{error.password}</div>}

              <button type="submit">LOG IN</button>
            </Form>
          )}
        </Formik>
      </div>
      <Outlet />
    </div>
  );
};

export default LoginPage;

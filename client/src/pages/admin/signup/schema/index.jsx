import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  // fullName: Yup.string()
  //   .min(4, "Too Short!")
  //   .max(40, "Too Long!")
  //   .required("Full Name is required."),
  // companyName: Yup.string()
  //   .min(4, "Too Short!")
  //   .max(50, "Too Long!")
  //   .required("Company Name is required."),
  password: Yup.string()
    .min(10, "Too Short!")
    .max(50, "Too Long!")
    .required("Password is required."),
});

export default LoginSchema;

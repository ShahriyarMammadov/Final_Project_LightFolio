import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(10, "Too Short!")
    .max(20, "Too Long!")
    .required("Password is required."),
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
});

export default LoginSchema;

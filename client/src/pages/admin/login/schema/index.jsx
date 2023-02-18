import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(1, "Too Short!")
    .max(100, "Too Long!")
    .required("Password is required."),
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
});

export default LoginSchema;

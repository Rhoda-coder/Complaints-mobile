import * as yup from "yup";

const staffIdRegex = /^[A-Z]{3}\d{4}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const signInFormSchema = yup.object().shape({
  staffId: yup
    .string()
    .matches(staffIdRegex, {
      message: "Enter a valid staff Id",
    })
    .required("Staff ID is required"),
});

export const passwordFormSchema = yup.object().shape({
  password: yup
    .string()
    .min(6)
    // .matches(passwordRegex, {
    //   message: "Password must include a special character and a number",
    // })
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords don't match")
    .required("Confirm password is required"),
});

export const loginInFormSchema = yup.object().shape({
  staffId: yup
    .string()
    .matches(staffIdRegex, {
      message: "Enter a valid staff Id",
    })
    .required("Staff ID is required"),
  password: yup.string().min(6).required("Password is required"),
  // .matches(passwordRegex, {
  //   message: "Password must include a special character and a number",
  // })
});

export const complaintFormSchema = yup.object({
  title: yup.string().required("Please enter a title for your complaint"),
  description: yup.string().required("Please describe your complaint"),
  priority: yup
    .string()
    .required("Please select the priority of your complaint"),
  location: yup.string(),
  visibility: yup.string().required("Please select your visibility status"),
  category: yup
    .string()
    .required("Please select who your complaints should go to"),
});

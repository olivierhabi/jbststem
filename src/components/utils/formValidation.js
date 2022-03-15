import { RegisterOptions } from "react-hook-form";

const EMAIL_REGEX_PATTERN = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

const FULL_NAME_PATTERN = /(?=^.{0,40}$)^[a-zA-Z-]+\s[a-zA-Z-]+$/;

export const Validations = {
  firstName: {
    required: { value: true, message: "Enter a First Name" },
    minLength: {
      value: 3,
      message: "First Name must be at least 3 characters long",
    },
  },
  lastName: {
    required: { value: true, message: "Enter a Last Name" },
    minLength: {
      value: 3,
      message: "Last Name must be at least 3 characters long",
    },
  },
  emailAddress: {
    required: { value: true, message: "Enter email address" },
    pattern: {
      value: EMAIL_REGEX_PATTERN,
      message: "Must be an email",
    },
  },
  location: {
    required: { value: true, message: "Enter a Location" },
    minLength: {
      value: 3,
      message: "Location must be at least 3 characters long",
    },
  },
  oneTimeCode: {
    required: { value: true, message: "Enter your one-time code" },
    pattern: {
      value: /^\d{6}$/,
      message: "One-time code is a 6 digit number",
    },
  },
};

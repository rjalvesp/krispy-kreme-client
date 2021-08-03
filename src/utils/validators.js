import * as R from "ramda";

export const validateEmail = (value) => {
  if (!value) {
    return { code: "required", text: 'Email is required' };
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
    return { code: "invalid", text: 'Email is invalid' };
  }
  if (value.length < 4) {
    return { code: "minlength", text: "Email is too short" };
  }
  if (value.length > 24) {
    return { code: "maxlength", text: "Email is too long" };
  }
  return;
};

export const validateUsername = (value) => {
  if (!value) {
    return "required";
  }
  if (!/^[A-Z0-9._%+-]{4,}$/i.test(value)) {
    return "invalid";
  }
  if (value.length < 4) {
    return "minlength";
  }
  if (value.length > 24) {
    return "maxlength";
  }
  return;
};

export const validatePassword = (value) => {
  if (!value) {
    return { code: "required", text: 'Password is required' };
  }
  if (!/^((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,24})$/.test(value)) {
    return { code: "invalid", text: 'Password is invalid' };
  }
  if (value.length < 8) {
    return { code: "minlength", text: "Password is too short" };
  }
  if (value.length > 24) {
    return { code: "maxlength", text: "Password is too long" };
  }
  return;
};

export const validateCode = (value) => {
  if (!value) {
    return { code: "required", text: 'Code is required' };
  }
  if (isNaN(value)) {
    return { code: "invalid", text: 'Code is invalid' };
  }
  if (`${value}`.length < 6) {
    return { code: "minlength", text: "Code is too short" };
  }
  if (`${value}`.length > 6) {
    return { code: "maxlength", text: "Code is too long" };
  }
  return;
};

export const isFormValid = R.pipe(
  R.values,
  R.reject(R.isNil),
  R.propEq("length", 0)
);

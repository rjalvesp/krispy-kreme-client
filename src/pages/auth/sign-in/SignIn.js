import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import {
  isFormValid,
  validateEmail,
  validatePassword,
} from "utils/validators";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { NotificationContext } from "contexts/NotificationContext";
import { KrispyForm } from "components/inputs/KrispyForm";
import { KrispyInput } from "components/inputs/KrispyInput";
import CognitoUserPool from "services/CognitoUserPool";
import { NavLink } from "react-router-dom";
import { ActionWrapper } from "components/layout/ActionWrapper";

const SignIn = () => {
  const initialValues = { email: "", password: "" };
  const validate = (values) => {
    const errors = {
      email: validateEmail(values.email),
      password: validatePassword(values.password),
    };
    return isFormValid(errors) ? null : errors;
  };

  const onSubmit =
    (setNotification) =>
    ({ email: Username, password: Password }, { setSubmitting }) => {
      const user = new CognitoUser({ Username, Pool: CognitoUserPool });
      const authDetails = new AuthenticationDetails({ Username, Password });
      const onSignIn = {
        onSuccess: (value) => {
          setTimeout(() => {
            window.location = "/";
          }, 300);
        },
        onFailure: (a) => {
          setNotification({
            text: "Something wrong happened :(",
            type: "error",
          });
          setSubmitting(false);
        },
      };
      user.authenticateUser(authDetails, onSignIn);
    };
  return (
    <>
      <h3>Introduce your email and password.</h3>
      <NotificationContext.Consumer>
        {({ setNotification }) => (
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={onSubmit(setNotification)}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <KrispyForm onSubmit={handleSubmit} className="flex flex-column">
                <FormControl
                  variant="filled"
                  error={errors.email && touched.email}
                >
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <KrispyInput
                    id="email"
                    name="email"
                    minLength="4"
                    maxLength="24"
                    required
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    describedby="email-error-text"
                    error={errors.email}
                  />
                </FormControl>
                <FormControl
                  variant="filled"
                  error={errors.password && touched.password}
                >
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <KrispyInput
                    id="password"
                    name="password"
                    type="password"
                    minLength="8"
                    maxLength="24"
                    required
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    describedby="password-error-text"
                    error={errors.password}
                  />
                </FormControl>
                  <ActionWrapper>
                    <NavLink to="/auth/sign-up" className="action">Are you new? Register now</NavLink>
                    <NavLink to="/auth/recover" className="action">Forgot your password?</NavLink>
                  </ActionWrapper>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Sign in
                  </Button>
              </KrispyForm>
            )}
          </Formik>
        )}
      </NotificationContext.Consumer>
    </>
  );
}

export default SignIn;

import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import CognitoUserPool from "services/CognitoUserPool";
import {
  validateEmail,
  validatePassword,
  isFormValid,
} from "utils/validators";
import { useHistory } from "react-router";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { NotificationContext } from "contexts/NotificationContext";
import { KrispyForm } from "components/inputs/KrispyForm";
import { KrispyInput } from "components/inputs/KrispyInput";
import { ActionWrapper } from "components/layout";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const history = useHistory();

  const initialValues = { email: "", username: "", password: "" };

  const validate = (values) => {
    const errors = {
      email: validateEmail(values.email),
      password: validatePassword(values.password),
    };
    return isFormValid(errors) ? null : errors;
  };

  const onSubmit =
    (setNotification) =>
    ({ email, password }, { setSubmitting }) => {
      const onSignUp = (err) => {
        setSubmitting(false);
        if (!err) {
          setNotification({
            text: "You have been registered, check your email to activate your account",
            type: "success",
          });
          return history.push("/auth/sign-in");
        }
        setNotification({ text: "Something wrong happened :(", type: "error" });
      };
      const attributes = [
        new CognitoUserAttribute({
          Name: "email",
          Value: email,
        }),
      ];
      CognitoUserPool.signUp(email, password, attributes, null, onSignUp);
    };

  return (
    <>
      <h3>Please register your credentials.</h3>
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
                    maxLength="100"
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
                  <NavLink to="/auth/sign-in" className="action">Already have an account? Sign in</NavLink>
                </ActionWrapper>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Sign up
                </Button>
              </KrispyForm>
            )}
          </Formik>
        )}
      </NotificationContext.Consumer>
    </>
  );
}

export default SignUp;

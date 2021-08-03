import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import {
  isFormValid,
  validateCode,
  validatePassword,
} from "utils/validators";
import { CognitoUser } from "amazon-cognito-identity-js";
import { NotificationContext } from "contexts/NotificationContext";
import { KrispyForm } from "components/inputs/KrispyForm";
import { KrispyInput } from "components/inputs/KrispyInput";
import CognitoUserPool from "services/CognitoUserPool";
import { NavLink, useHistory } from "react-router-dom";
import { ActionWrapper } from "components/layout/ActionWrapper";

const ResetPassword = () => {
  const history = useHistory();
  const initialValues = { code: null, password: "" };
  const { 
    location: { 
      state: { Username } 
    }
  } = history;
  const validate = (values) => {
    const errors = {
      code: validateCode(values.code),
      password: validatePassword(values.password)
    };
    return isFormValid(errors) ? null : errors;
  };

  const onSubmit =
    (setNotification) =>
    ({ code, password }, { setSubmitting }) => {
      const user = new CognitoUser({ Username, Pool: CognitoUserPool });
      const onResetPassword = {
        onSuccess: (value) => {
          setNotification({
            text: "You password have been reset!",
            type: "success",
          });
          setSubmitting(false);
          history.push("/auth/sign-in");
        },
        onFailure: (a) => {
          setNotification({
            text: "Something wrong happened :(",
            type: "error",
          });
          setSubmitting(false);
        },
      };
      user.confirmPassword(`${code}`, password, onResetPassword);
    };
  return (
    <>
      <h3>Set your new password.</h3>
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
                  error={errors.code && touched.code}
                >
                  <InputLabel htmlFor="code">Code</InputLabel>
                  <KrispyInput
                    id="code"
                    name="code"
                    minLength="6"
                    maxLength="6"
                    type="number"
                    required
                    value={values.code}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    describedby="code-error-text"
                    error={errors.code}
                  />
                </FormControl>
                <FormControl
                  variant="filled"
                  error={errors.password && touched.password}
                >
                  <InputLabel htmlFor="password">New Password</InputLabel>
                  <KrispyInput
                    id="password"
                    name="password"
                    type="password"
                    minLength="4"
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
                  <NavLink to="/auth/sign-in" className="action">
                    Go back to sign in
                  </NavLink>
                  <NavLink to="/auth/recover" className="action">
                    Didn't received my code
                  </NavLink>
                </ActionWrapper>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Change password
                </Button>
              </KrispyForm>
            )}
          </Formik>
        )}
      </NotificationContext.Consumer>
    </>
  );
}

export default ResetPassword;

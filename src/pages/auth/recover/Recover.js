import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import {
  isFormValid,
  validateEmail,
} from "utils/validators";
import { CognitoUser } from "amazon-cognito-identity-js";
import { NotificationContext } from "contexts/NotificationContext";
import { KrispyForm } from "components/inputs/KrispyForm";
import { KrispyInput } from "components/inputs/KrispyInput";
import CognitoUserPool from "services/CognitoUserPool";
import { NavLink, useHistory } from "react-router-dom";
import { ActionWrapper } from "components/layout/ActionWrapper";

const Recover = () => {
  const history = useHistory();
  const initialValues = { email: "" };
  const validate = (values) => {
    const errors = {
      email: validateEmail(values.email)
    };
    return isFormValid(errors) ? null : errors;
  };

  const onSubmit =
    (setNotification) =>
    ({ email: Username }, { setSubmitting }) => {
      const user = new CognitoUser({ Username, Pool: CognitoUserPool });
      const onRecover = {
        onSuccess: (value) => {
          setNotification({
            text: "We have sent instructions to your email",
            type: "success",
          });
          setSubmitting(false);
          history.push("/auth/reset-password", { Username });
        },
        onFailure: (a) => {
          setNotification({
            text: "Something wrong happened :(",
            type: "error",
          });
          setSubmitting(false);
        }
      };
      user.forgotPassword(onRecover);
    };
  return (
    <>
      <h3>Introduce your email.</h3>
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
                <ActionWrapper>
                  <NavLink to="/auth/sign-in" className="action">
                    Go back to sign in
                  </NavLink>
                  <NavLink to="/auth/reset-password" className="action">
                    I already have a code
                  </NavLink>
                </ActionWrapper>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Recover password
                </Button>
              </KrispyForm>
            )}
          </Formik>
        )}
      </NotificationContext.Consumer>
    </>
  );
}

export default Recover;

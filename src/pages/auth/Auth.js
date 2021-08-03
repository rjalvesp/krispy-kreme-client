import AuthWrapper from "./AuthWrapper";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import SignIn from "./sign-in/SignIn";
import SignUp from "./sign-up/SignUp";
import Recover from "./recover/Recover";
import ResetPassword from "./reset-password/ResetPassword";

const Auth = () => {
  let match = useRouteMatch();
  return (
    <Router>
      <AuthWrapper>
        <Switch>
          <Route exact path={`${match.url}/sign-up`} component={SignUp} />
          <Route exact path={`${match.url}/sign-in`} component={SignIn} />
          <Route exact path={`${match.url}/recover`} component={Recover} />
          <Route
            exact
            path={`${match.url}/reset-password`}
            component={ResetPassword}
          />
          <Redirect from="*" to="/sign-in" />
        </Switch>
      </AuthWrapper>
    </Router>
  );
};

export default Auth;

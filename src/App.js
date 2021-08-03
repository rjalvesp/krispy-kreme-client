import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NotificationBar from "components/notification-bar/NotificationBar";
import { NotificationContext } from "contexts/NotificationContext";
import { ThemeProvider } from "styled-components";
import { mainTheme } from "theme";
import Auth from "pages/auth/Auth";
import { isAuthenticated } from "services/UserService";
import Dashboard from "pages/dashboard/Dashboard";

const App = () => {
  const [theme] = useState(mainTheme);
  const [authenticated, setAuthenticated] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [notification, setNotification] = useState();
  const contextValue = {
    notification,
    setNotification,
  };

  useEffect(() => {
    isAuthenticated()
      .then(setAuthenticated)
      .then(() => setLoaded(true));
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <ThemeProvider theme={theme}>
      <NotificationContext.Provider value={contextValue}>
        <Router>
          <NotificationBar></NotificationBar>
          <Switch>
            <Route
              path="/auth"
              render={(props) => {
                return authenticated === "AUTHENTICATED" ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Auth {...props} />
                );
              }}
            />
            <Route
              path="/dashboard"
              render={(props) => {
                return authenticated !== "AUTHENTICATED" ? (
                  <Redirect to="/auth" />
                ) : (
                  <Dashboard {...props} />
                );
              }}
            />
            <Redirect from="*" to="/auth" />
          </Switch>
        </Router>
      </NotificationContext.Provider>
    </ThemeProvider>
  );
};

export default App;

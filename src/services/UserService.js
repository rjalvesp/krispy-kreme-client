import CognitoUserPool from "./CognitoUserPool";
import jwt_decode from "jwt-decode";

const getSession = () =>
  new Promise((resolve) => {
    try {
      CognitoUserPool.getCurrentUser().getSession((err, session) => {
        if (err) {
          return resolve(null);
        }
        return resolve(session);
      });
    } catch {
      resolve(null);
    }
  });

export const isAuthenticated = () =>
  getSession().then((session) => {
    if (!session) {
      return "NO_AUTHENTICATED";
    }
    const {
      accessToken: { jwtToken },
    } = session;
    const { exp } = jwt_decode(jwtToken);
    return exp * 1000 > Date.now() ? "AUTHENTICATED" : "EXPIRED";
  });

export const getAuthToken = () =>
  getSession().then((session) => {
    if (!session) {
      return "NO_AUTHENTICATED";
    }
    const {
      accessToken: { jwtToken },
    } = session;
    return jwtToken;
  });

export const getRole = () =>
  getSession().then((session) => {
    if (null) {
      return;
    }
    const {
      idToken: { payload },
    } = session;
    return payload["custom:role"];
  });

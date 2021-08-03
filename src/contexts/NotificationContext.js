import React from "react";

export const NotificationContext = React.createContext({
  notification: false,
  setNotification: (value) => {},
});

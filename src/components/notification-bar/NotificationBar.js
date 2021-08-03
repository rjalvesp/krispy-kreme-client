import * as R from "ramda";
import React, { useContext, useEffect, useState } from "react";
import Alert from "@material-ui/lab/Alert";
import { NotificationContext } from "contexts/NotificationContext";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core";

const NotificationBarContainer = styled.div`
  position: fixed;
  width: 100%;
  
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const useStyles = makeStyles(() => ({
  alert: {
    marginTop: "1rem"
  }
}));

const NotificationBar = () => {
  const classes = useStyles();
  const [notifications, setNotifications] = useState([]);
  const { notification } = useContext(NotificationContext);

  useEffect(() => {
    if (!notification) {
      return;
    }
    setNotifications(R.append(notification));
    setTimeout(() => setNotifications(R.tail), 3000);
  }, [notification]);

  return (
    <NotificationBarContainer>
      {notifications.map(({ type, text }, idx) => (
        <div key={`notification-${idx}`}>
          <Alert variant="filled" severity={type} className={classes.alert}>
            {text}
          </Alert>
        </div>
      ))}
    </NotificationBarContainer>
  );
};

export default NotificationBar;

import React from "react";
import * as Moment from "moment";
import { Card, List, ListItem, ListItemText } from "@material-ui/core";
import { capitalCase } from "change-case";

const OrderCard = ({ data: { logs = [] } }) => {
  const getItemText = (idx, status) =>
    `${capitalCase(
      logs[idx - 1] ? logs[idx - 1].status : "ORDERED"
    )} to ${capitalCase(status)}`;
  return (
    <Card>
      <List>
        {logs.map(({ status, timestamp }, idx) => (
          <ListItem button>
            <ListItemText
              primary={getItemText(idx, status)}
              secondary={Moment(timestamp).calendar()}
            />
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default OrderCard;

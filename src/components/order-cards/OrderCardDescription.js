import React from "react";
import { CardContent, Grid, Typography } from "@material-ui/core";

const OrderCardDescription = ({ data, classes }) => {
  const {
    payment_method,
    payment_reference,
    deliverer_name,
    deliverer_phone,
    client_name,
    client_phone,
  } = data;

  return (
    <>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            Payment reference:
            <Typography variant="body2" color="textSecondary" component="p">
              {payment_reference}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            Payment Method:
            <Typography variant="body2" color="textSecondary" component="p">
              {payment_method}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardContent>
        <Grid container spacing={3} className={classes.spacing}>
          <Grid item xs={6}>
            Delivered by:
            <Typography variant="body2" color="textSecondary" component="p">
              {deliverer_name}. If you need, you can contact the delivery person
              at {deliverer_phone}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            Delivered to:
            <Typography variant="body2" color="textSecondary" component="p">
              {client_name}. If you need, you can contact the client at{" "}
              {client_phone}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </>
  );
};

export default OrderCardDescription;

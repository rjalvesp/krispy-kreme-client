import React, { useEffect, useState } from "react";
import * as OrdersService from "services/OrdersService";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import OrderCard from "components/order-cards/OrderCard";
import OrderLogs from "components/order-logs/OrderLogs";

const useStyles = makeStyles((theme) => ({
  divider: {
    marginBottom: "2rem",
  },
}));

const OrderDetails = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      return;
    }
    OrdersService.Fetch(id)
      .then((value) => setData(value))
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const saveStatus = (status) => {
    setLoading(true);
    return OrdersService.Update(id, status)
      .then(() => setData({ ...data, status }))
      .finally(() => setLoading(false));
  };

  if (!data && loading) return <CircularProgress color="primary" />;

  return (
    <>
      <Typography variant="h6">
        <strong>Order #{id}</strong>
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className={classes.divider}
        startIcon={<ArrowBackIosIcon />}
        onClick={() => history.push("/dashboard")}
      >
        Dashboard
      </Button>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <OrderCard
            data={data}
            loading={loading}
            onStatusChange={saveStatus}
          />
        </Grid>
        <Grid item xs={6}>
          <OrderLogs data={data}></OrderLogs>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderDetails;

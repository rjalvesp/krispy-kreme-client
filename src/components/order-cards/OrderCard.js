import React from "react";
import {
  Card,
  CardMedia,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import OrderCardHeader from "./OrderCardHeader";
import OrderCardDescription from "./OrderCardDescription";
import OrderCardPrices from "./OrderCardPrices";
import OrderCardItems from "./OrderCardItems";

const useStyles = makeStyles((theme) => ({
  newFieldSet: {
    display: "flex",
  },
  row: {
    display: "flex",
    paddingBottom: "0.5rem",
  },
  spacing: {
    marginBottom: "2rem",
  },
  spacingRight: {
    marginRight: "1rem",
  },
  alignRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  media: {
    height: 0,
    paddingTop: "30%",
  },
}));

const OrderCard = ({ data, loading, onStatusChange }) => {
  const classes = useStyles();

  if (!data && loading) return <CircularProgress color="primary" />;

  return (
    <Card>
      <OrderCardHeader
        data={data}
        classes={classes}
        loading={loading}
        onStatusChange={onStatusChange}
      />
      <CardMedia
        className={classes.media}
        image="https://cdn.vox-cdn.com/thumbor/DhwdHGx1rj1PXra1LphR4AR7rZc=/0x0:1920x1080/920x613/filters:focal(807x387:1113x693):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/69085308/KrispyKremeOreoGlaze.0.jpeg"
      />
      <OrderCardDescription data={data} classes={classes} />
      <OrderCardItems data={data} />
      <OrderCardPrices data={data} classes={classes} />
    </Card>
  );
};

export default OrderCard;

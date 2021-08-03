import React from "react";
import { CardContent, Chip, Typography } from "@material-ui/core";
import { capitalCase } from "change-case";
import { decimalFormatter } from "utils/formatters";

const OrderCardPrices = ({ data, classes }) => {
  const { total, coupon, discount, sub_total, iva } = data;

  return (
    <CardContent className={classes.alignRight}>
      <Typography variant="body1">
        <small>
          <strong>Sub-total: </strong>
        </small>
        ${decimalFormatter(sub_total)}
      </Typography>
      {coupon && (
        <Typography variant="body1">
          <small>
            <strong>Discount coupon {capitalCase(coupon)}: </strong>
            -${decimalFormatter(discount)}
          </small>
        </Typography>
      )}
      <Typography variant="body1" className={classes.row}>
        <small>
          <strong>IVA (16%): </strong>
          -${decimalFormatter(iva)}
        </small>
      </Typography>
      <Chip label={`Total $${decimalFormatter(total)}`} color="primary" />
    </CardContent>
  );
};

export default OrderCardPrices;

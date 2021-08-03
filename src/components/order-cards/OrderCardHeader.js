import React, { useEffect, useState } from "react";
import * as R from "ramda";
import * as Moment from "moment";
import {
  CardHeader,
  Chip,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import styled from "styled-components";
import { capitalCase } from "change-case";
import { MoreVert } from "@material-ui/icons";
import { statusActionMapper } from "utils/mappers";
import { getAuthToken, getRole } from "services/UserService";

const getOptions = R.pipe(
  (value) => R.omit([value], statusActionMapper),
  R.keys
);

const ItemTitle = styled.div`
  display: flex;
  padding-bottom: 0.5rem;

  .date {
    margin-left: 0.5rem;
  }
`;

const OrderCardHeader = ({ data, loading, classes, onStatusChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [canActivate, setCanActivate] = useState(false);

  useEffect(() => {
    getRole()
      .then((value) => setCanActivate(value === "ADMIN"))
      .catch(() => setCanActivate(false));
  }, [data]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onStatusClick = (status) => {
    onStatusChange(status).then(handleClose);
  };

  if (!data && loading) return <CircularProgress color="primary" />;

  const { items, created_at, provider, reference, status } = data;

  return (
    <CardHeader
      title={
        <ItemTitle>
          {loading && (
            <CircularProgress
              color="primary"
              size={26}
              className={classes.spacingRight}
            />
          )}
          <Chip label={capitalCase(status)} />
          <div className="date">{Moment(created_at).calendar()}</div>
        </ItemTitle>
      }
      subheader={
        <Typography variant="subtitle2" className={classes.row}>
          <strong>{reference.toUpperCase()}</strong>
          <div>
            : {items.length} items -{" "}
            {capitalCase(provider || "Unknown provider")}
          </div>
        </Typography>
      }
      action={
        canActivate && (
          <>
            <IconButton aria-label="actions" onClick={handleClick}>
              <MoreVert />
            </IconButton>
            <Menu
              id="actions"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {getOptions(status).map((value) => (
                <MenuItem onClick={() => onStatusClick(value)}>
                  {statusActionMapper[value]}
                </MenuItem>
              ))}
            </Menu>
          </>
        )
      }
    />
  );
};

export default OrderCardHeader;

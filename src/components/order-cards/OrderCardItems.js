import React from "react";
import * as R from "ramda";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  List,
  Typography,
} from "@material-ui/core";
import { decimalFormatter } from "utils/formatters";
import { ExpandMore } from "@material-ui/icons";
import styled from "styled-components";

const getExtraPrice = R.pipe(
  R.defaultTo([]),
  R.pluck("price"),
  R.sum,
  R.ifElse(
    R.equals(0),
    R.always(""),
    (value) => `+ $${decimalFormatter(value)}`
  )
);

const ItemHeading = styled.div`
  display: flex;
  width: 100%;

  .tag {
    display: flex;
    flex: 1 1 auto;
    justify-content: flex-end;
  }
`;

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  .content {
    margin-bottom: 2rem;
  }
  .extra {
    padding: 0.5rem;
    border-bottom: 1px solid #dadada;
  }
`;

const renderModifiers = (modifiers) => {
  if (!modifiers || !modifiers.length) {
    return null;
  }
  return (
    <>
      <Typography>Extras</Typography>
      <List dense={true}>
        {(modifiers || []).map(({ name, group, price }) => (
          <div className="extra">
            <small>{group}</small> - {name}{" "}
            <Chip
              size="small"
              label={price ? decimalFormatter(price) : "FREE"}
            />
          </div>
        ))}
      </List>
    </>
  );
};

const OrderCardItems = ({ data }) => {
  const { items } = data;

  return (items || []).map(
    ({ id, name, price, type, description, modifiers }, idx) => (
      <Accordion key={`${id}-${idx}`}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <ItemHeading>
            <Typography>
              <small>{type}</small> - {name}
            </Typography>
            <div className="tag">
              ${decimalFormatter(price)} {getExtraPrice(modifiers)}
            </div>
          </ItemHeading>
        </AccordionSummary>
        <AccordionDetails>
          <ItemContent>
            <Typography
              className="content"
              variant="subtitle2"
              color="textSecondary"
            >
              {description}
            </Typography>
            {renderModifiers(modifiers)}
          </ItemContent>
        </AccordionDetails>
      </Accordion>
    )
  );
};

export default OrderCardItems;

import * as R from "ramda";

export const decimalFormatter = R.unless(
  R.either(R.isNil, R.isEmpty),
  new Intl.NumberFormat("en-US", {
    style: "decimal",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format
);

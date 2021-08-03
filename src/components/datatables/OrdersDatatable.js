import React, { useEffect, useState } from "react";
import * as R from "ramda";
import * as Moment from "moment";
import { DataGrid } from "@material-ui/data-grid";
import * as OrdersService from "services/OrdersService";
import { CircularProgress, Typography } from "@material-ui/core";
import { decimalFormatter } from "utils/formatters";
import { capitalCase } from "change-case";
import { NavLink } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";

const columns = [
  {
    field: "status",
    headerName: "Status",
    width: 150,
    filterable: true,
    valueFormatter: ({ row: { status } }) => capitalCase(status || ""),
  },
  {
    field: "provider",
    headerName: "Provider",
    width: 150,
    filterable: true,
    valueFormatter: ({ row: { provider } }) => capitalCase(provider || ""),
  },
  {
    field: "reference",
    headerName: "Reference",
    width: 150,
    filterable: true,
  },
  {
    field: "sub_total",
    headerName: "Sub Total",
    width: 150,
    align: "right",
    filterable: false,
    valueFormatter: ({ row: { sub_total } }) => decimalFormatter(sub_total),
  },
  {
    field: "payment_method",
    width: 200,
    headerName: "Payment Method",
    align: "center",
    filterable: false,
    valueFormatter: ({ row: { payment_method } }) =>
      capitalCase(payment_method || ""),
  },
  {
    field: "coupon",
    width: 150,
    headerName: "Coupon",
    valueFormatter: ({ row: { coupon } }) => capitalCase(coupon || ""),
  },
  {
    field: "total",
    headerName: "Total",
    width: 150,
    align: "right",
    filterable: false,
    valueFormatter: ({ row: { total } }) => decimalFormatter(total),
  },
  {
    field: "created_at",
    headerName: "Ordered on",
    width: 150,
    filterable: false,
    valueFormatter: ({ row: { created_at } }) =>
      Moment(created_at).format("YYYY-MM-DD HH:mm"),
  },
  {
    field: "",
    headerName: "",
    width: 150,
    sortable: false,
    disableColumnMenu: true,
    align: "center",
    renderCell: ({ row: { id } }) => (
      <NavLink to={`/dashboard/orders/${id}`}>
        <VisibilityIcon />
      </NavLink>
    ),
  },
];
const limit = 10;

const getSorting = (sorting) => {
  let sort = {
    sortingField: "created_at",
    sortingDirection: "DESC",
  };
  if (sorting) {
    sort.sortingField = sorting.field;
    sort.sortingDirection = sorting.sort.toUpperCase();
  }
  return sort;
};
const getFiltering = (value) => {
  if (!value) return;
  return R.pipe(R.omit(["id"]), R.objOf("filtering"))(value);
};

const OrdersDatatable = () => {
  const [loading, setLoading] = useState(true);
  const [datatable, setDatatable] = useState();
  const [sorting, setSorting] = useState();
  const [filtering, setFiltering] = useState();
  const [page, setPage] = useState(0);

  useEffect(() => {
    setLoading(true);
    OrdersService.Paginate({
      offset: page * limit,
      limit,
      ...getSorting(sorting),
      ...getFiltering(filtering),
    })
      .then(setDatatable)
      .then(() => setLoading(false));
  }, [page, sorting, filtering]);

  if (!datatable && loading) {
    return <CircularProgress color="primary" />;
  }

  return (
    <div style={{ height: 700, width: "100%" }}>
      <Typography variant="h6">Orders</Typography>
      <DataGrid
        columns={columns}
        rows={datatable.data}
        rowCount={datatable.total}
        pageSize={10}
        pagination
        sortingMode="server"
        filterMode="server"
        paginationMode="server"
        onFilterModelChange={({ items }) => setFiltering(items[0])}
        onSortModelChange={(sortingItem) => setSorting(sortingItem[0])}
        onPageChange={({ page }) => setPage(page)}
        loading={loading}
      />
    </div>
  );
};

export default OrdersDatatable;

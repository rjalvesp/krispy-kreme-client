import * as R from "ramda";
import { api } from "./AxiosService";

export const Paginate = (body) =>
  api.post("/orders/datatable", body).then(R.propOr({}, "data"));

export const Fetch = (id) =>
  api.get(`/orders/${id}`).then(R.propOr({}, "data"));

export const Update = (id, status) =>
  api.put(`/orders/${id}`, { status }).then(R.propOr({}, "data"));

import DashboardWrapper from "./DashboardWrapper";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import Home from "./home/Home";
import OrderDetails from "./order-details/OrderDetails";

const Dashboard = () => {
  let match = useRouteMatch();
  return (
    <Router>
      <DashboardWrapper>
        <Switch>
          <Route exact path={`${match.url}`} component={Home} />
          <Route
            exact
            path={`${match.url}/orders/:id`}
            component={OrderDetails}
          />
        </Switch>
        <Redirect from="*" to={match.url} />
      </DashboardWrapper>
    </Router>
  );
};

export default Dashboard;

import React, { Suspense, Fragment, lazy } from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import Loader from "./components/Loader/Loader";
import AdminLayout from "./layouts/AdminLayout";

import GuestGuard from "./components/Auth/GuestGuard";
import AuthGuard from "./components/Auth/AuthGuard";

import { BASE_URL } from "./config/constant";

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes)
                  ) : (
                    <Component {...props} />
                  )}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [
  {
    exact: true,
    guard: GuestGuard,
    path: "/auth/signin-1",
    component: lazy(() => import("./views/auth/signin/SignIn1")),
  },
  {
    path: "*",
    layout: AdminLayout,
    guard: AuthGuard,
    routes: [
      {
        exact: true,
        path: "/app/dashboard/default",
        component: lazy(() => import("./views/dashboard/DashDefault")),
      },
      {
        exact: true,
        path: "/setup/users",
        component: lazy(() => import("./views/User/Users")),
      },
      {
        exact: true,
        path: "/setup/Customers",
        component: lazy(() => import("./views/Customer/Customers")),
      },
      {
        exact: true,
        path: "/setup/Companies",
        component: lazy(() => import("./views/Company/Companies")),
      },
      {
        exact: true,
        path: "/setup/branches",
        component: lazy(() => import("./views/Branch/Branches")),
      },
      {
        exact: true,
        path: "/quatation/form",
        component: lazy(() => import("./views/Quotation/Quotation")),
      },
      {
        path: "*",
        exact: true,
        component: () => <Redirect to={BASE_URL} />,
      },
    ],
  },
];

export default routes;

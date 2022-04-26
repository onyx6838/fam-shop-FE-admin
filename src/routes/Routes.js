import React from "react";
import { BrowserRouter as Router, Route, Routes as Switch } from "react-router-dom";
import {
    dashboard as dashboardRoutes,
    page as pageRoutes
} from "./index";

import DashboardLayout from "../layouts/Dashboard";
import AuthLayout from "../layouts/Auth";

const childRoutes = (Layout, routes) =>
    routes.map(({ children, path, component: Component }, index) =>
        children ? (
            // Route item with children
            children.map(({ path, component: Component }, index) => (
                <Route
                    key={index}
                    path={path}
                    //   render={props => (
                    //     <Layout>
                    //       <Component {...props} />
                    //     </Layout>
                    //   )}
                    element={
                        <Layout>
                            <Component/>
                        </Layout>
                    }
                />
            ))
        ) : (
            // Route item without children
            <Route
                key={index}
                path={path}
                // render={props => (
                //     <Layout>
                //         <Component {...props} />
                //     </Layout>
                // )}
                element={
                    <Layout>
                        <Component />
                    </Layout>
                }
            />
        )
    );

const Routes = () => (
    <Router>
        <Switch>
            {childRoutes(DashboardLayout, dashboardRoutes)}
            {childRoutes(AuthLayout, pageRoutes)}
        </Switch>
    </Router>
);

export default Routes;
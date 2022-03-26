import async from "../components/Async";

import {
  Sliders as SlidersIcon,
  List as ListIcon,
} from "react-feather";

// Dashboards
const Default = async(() => import("../pages/dashboards/Default"));
const Social = async(() => import("../pages/dashboards/Social"));

const PaginationTables = async(() => import("../pages/tables/Pagination"));

const dashboardRoutes = {
  path: "/",
  name: "Dashboards",
  header: "Pages",
  badgeColor: "primary",
  badgeText: "2",
  icon: SlidersIcon,
  containsHome: true,
  children: [
    {
      path: "/",
      name: "Default",
      component: Default
    },
    {
      path: "/social",
      name: "Social",
      component: Social
    }
  ]
};

const advancedTablesRoutes = {
  path: "/advanced-tables",
  name: "Advanced Tables",
  icon: ListIcon,
  children: [
    {
      path: "/advanced-tables/pagination",
      name: "Pagination",
      component: PaginationTables
    }
  ]
};

// Dashboard specific routes
export const dashboard = [
  dashboardRoutes,
  advancedTablesRoutes
];

// Auth specific routes
//export const page = [authRoutes];

// All routes
const arrayRoutes = [
  dashboardRoutes,
  advancedTablesRoutes
]

export default arrayRoutes;
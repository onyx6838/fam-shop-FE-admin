import async from "../components/Async";

import {
  Sliders as SlidersIcon,
  List as ListIcon,
  CreditCard,
  Users as UsersIcon
} from "react-feather";

import SignIn from '../pages/auth/SignIn'

import withAuth from "../HOC/withAuth";
import withRole from "../HOC/withRole";

// Dashboards
const Default = async(() => import("../pages/dashboards/Default"));
const Report = async(() => import("../pages/dashboards/Report"));

// Product
const Product = async(() => import("../pages/products/Product"));
const Feature = async(() => import("../pages/products/Feature"));
const ProductFeature = async(() => import("../pages/products/ProductFeature"));
const Category = async(() => import("../pages/products/Category"));
const Brand = async(() => import("../pages/products/Brand"));

// Order
const PurchaseOrder = async(() => import('../pages/orders/PurchaseOrder'))
//const Receipt = async(() => import('../pages/orders/Receipt'))
const Account = async(() => import('../pages/accounts/Account'))

// Auth
const dashboardRoutes = {
  path: "/",
  name: "Thống kê",
  header: "Pages",
  icon: SlidersIcon,
  containsHome: true,
  children: [
    {
      path: "/",
      name: "Thống kê",
      component: withAuth(Default)
    },
    {
      path: "/report",
      name: "Báo cáo",
      component: withAuth(Report)
    },
  ]
};

const productRoutes = {
  path: "/",
  name: "Sản Phẩm",
  icon: ListIcon,
  // badgeText: "5",
  // badgeColor: "primary",
  children: [
    {
      path: "/product",
      name: "Sản Phẩm",
      component: withAuth(Product)
    },
    {
      path: "/feature",
      name: "Đặc Trưng",
      component: withAuth(Feature)
    },
    {
      path: "/product-feature",
      name: "Đặc Trưng Sản Phẩm",
      component: withAuth(ProductFeature)
    },
    {
      path: "/category",
      name: "Loại Sản Phẩm",
      component: withAuth(Category)
    },
    {
      path: "/brand",
      name: "Thương Hiệu",
      component: withAuth(Brand)
    }
  ]
};

const orderRoutes = {
  path: "/",  // tạm thời để trống
  name: "Bán Hàng",
  icon: CreditCard,
  // badgeText: "2",
  // badgeColor: "primary",
  children: [
    {
      path: "/purchase-order",  // mở rộng route theo path cha
      name: "Đơn Hàng",
      component: withAuth(PurchaseOrder)
    }
    // ,
    // {
    //   path: "/receipt",  // mở rộng route theo path cha
    //   name: "Nhập Kho",
    //   component: withAuth(Receipt),
    // }
  ]
};

const accountRoutes = {
  path: "/",
  name: "Tài Khoản",
  icon: UsersIcon,
  // badgeText: "1",
  // badgeColor: "primary",
  children: [
    {
      path: "/accounts",
      name: "Tài Khoản",
      component: withRole(withAuth(Account))
    }
  ]
};

const authRoutes = {
  path: "/auth",
  name: "Auth",
  icon: UsersIcon,
  badgeColor: "secondary",
  badgeText: "Special",
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn
    }
  ]
};

// Dashboard specific routes
export const dashboard = [
  dashboardRoutes,
  productRoutes,
  orderRoutes,
  accountRoutes
];

// Auth specific routes
export const page = [authRoutes];

// All routes
const arrayRoutes = [
  dashboardRoutes,
  productRoutes,
  orderRoutes,
  accountRoutes
]

export default arrayRoutes;
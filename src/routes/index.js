import async from "../components/Async";

import {
  Sliders as SlidersIcon,
  List as ListIcon,
  CreditCard
} from "react-feather";

// Dashboards
const Default = async(() => import("../pages/dashboards/Default"));

// Product
const Product = async(() => import("../pages/products/Product"));
const Feature = async(() => import("../pages/products/Feature"));
const ProductFeature = async(() => import("../pages/products/ProductFeature"));
const Category = async(() => import("../pages/products/Category"));
const Brand = async(() => import("../pages/products/Brand"));

// Order
const PurchaseOrder = async(() => import('../pages/orders/PurchaseOrder'))

const dashboardRoutes = {
  path: "/",
  name: "Thống kê",
  header: "Pages",
  badgeColor: "primary",
  badgeText: "2",
  icon: SlidersIcon,
  containsHome: true,
  children: [
    {
      path: "/",
      name: "Thống kê",
      component: Default
    }
  ]
};

const productRoutes = {
  path: "/",
  name: "Sản Phẩm",
  icon: ListIcon,
  badgeText: "5",
  badgeColor: "primary",
  children: [
    {
      path: "/product",
      name: "Sản Phẩm",
      component: Product
    },
    {
      path: "/feature",
      name: "Đặc Trưng",
      component: Feature
    },
    {
      path: "/product-feature",
      name: "Đặc Trưng Sản Phẩm",
      component: ProductFeature
    },
    {
      path: "/category",
      name: "Loại Sản Phẩm",
      component: Category
    },
    {
      path: "/brand",
      name: "Thương Hiệu",
      component: Brand
    }
  ]
};

const orderRoutes = {
  path: "/",  // tạm thời để trống
  name: "Bán Hàng",
  icon: CreditCard,
  badgeText: "4",
  badgeColor: "primary",
  children: [
    {
      path: "/purchase-order",  // mở rộng route theo path cha
      name: "Đơn Hàng",
      component: PurchaseOrder
    }
  ]
};

// Dashboard specific routes
export const dashboard = [
  dashboardRoutes,
  productRoutes,
  orderRoutes
];

// Auth specific routes
//export const page = [authRoutes];

// All routes
const arrayRoutes = [
  dashboardRoutes,
  productRoutes,
  orderRoutes
]

export default arrayRoutes;
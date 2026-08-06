import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import UserLayout from "./Layout/User/UserLayout";
import AdminLayout from "./Layout/Admin/AdminLayout";

import Homepage from "./pages/page/Homepage";
import SingupPage from "./pages/page/SingupPage";
import LoginPage from "./pages/userPages/LoginPage";
import ProductDetail from "./pages/page/ProductDetail/ProductDetail";
import Cart from "./component/cart/Cart";
import Wishpage from "./pages/userPages/Wishpage";
import ShopPage from "./pages/page/shop/ShopPage";
import AboutPage from "./pages/page/About/AboutPage";
import UserDetail from "./component/UserProfile/UserDetail";
import NotFoundPage from "./pages/page/NotFound/NotFoundPage";

import AddProduct from "./pages/adminPages/pages/Addproduct";
import CheckProduct from "./pages/adminPages/pages/CheckProduct";
import CheckUser from "./pages/adminPages/pages/CheckUser";
import Makeadmin from "./pages/adminPages/pages/Makeadmin";
import Removeadmin from "./pages/adminPages/pages/Removeadmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "shop", element: <ShopPage /> },
      { path: "signup", element: <SingupPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "productDetail/:id", element: <ProductDetail /> },
      { path: "about", element: <AboutPage /> },

      /* USER */
      { path: "cart", element: <Cart /> },
      { path: "wishlist", element: <Wishpage /> },
      { path: "profile", element: <UserDetail /> },
      { path: "userdetail", element: <UserDetail /> },
    ],
  },

  /* ADMIN */
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AddProduct /> },
      { path: "add/product", element: <AddProduct /> },
      { path: "admin-product", element: <CheckProduct /> },
      { path: "checkuser", element: <CheckUser /> },
      { path: "makeadmin", element: <Makeadmin /> },
      { path: "removeadmin", element: <Removeadmin /> },
    ],
  },

  /* 404 */
  { path: "*", element: <NotFoundPage /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

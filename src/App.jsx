import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// =========================
// Layouts
// =========================
const UserLayout = lazy(() => import("./Layout/User/UserLayout"));
const AdminLayout = lazy(() => import("./Layout/Admin/AdminLayout"));

// =========================
// User Pages
// =========================
const Homepage = lazy(() => import("./pages/page/Homepage"));
const SingupPage = lazy(() => import("./pages/page/SingupPage"));
const LoginPage = lazy(() => import("./pages/userPages/LoginPage"));
const ProductDetail = lazy(() =>
  import("./pages/page/ProductDetail/ProductDetail")
);
const Cart = lazy(() => import("./component/cart/Cart"));
const Wishpage = lazy(() => import("./pages/userPages/Wishpage"));
const ShopPage = lazy(() => import("./pages/page/shop/ShopPage"));
const AboutPage = lazy(() => import("./pages/page/About/AboutPage"));
const UserDetail = lazy(() => import("./component/UserProfile/UserDetail"));
const NotFoundPage = lazy(() =>
  import("./pages/page/NotFound/NotFoundPage")
);

// =========================
// Admin Pages
// =========================
const AddProduct = lazy(() =>
  import("./pages/adminPages/pages/Addproduct")
);

const CheckProduct = lazy(() =>
  import("./pages/adminPages/pages/CheckProduct")
);

const CheckUser = lazy(() =>
  import("./pages/adminPages/pages/CheckUser")
);

const Makeadmin = lazy(() =>
  import("./pages/adminPages/pages/Makeadmin")
);

const Removeadmin = lazy(() =>
  import("./pages/adminPages/pages/Removeadmin")
);

// =========================
// Loader
// =========================
const PageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>

        <p className="text-sm text-gray-500">
          Loading...
        </p>
      </div>
    </div>
  );
};

// =========================
// Router
// =========================
const router = createBrowserRouter([
  // =========================
  // USER
  // =========================
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },

      {
        path: "shop",
        element: <ShopPage />,
      },

      {
        path: "signup",
        element: <SingupPage />,
      },

      {
        path: "login",
        element: <LoginPage />,
      },

      {
        path: "productDetail/:id",
        element: <ProductDetail />,
      },

      {
        path: "about",
        element: <AboutPage />,
      },

      // USER
      {
        path: "cart",
        element: <Cart />,
      },

      {
        path: "wishlist",
        element: <Wishpage />,
      },

      {
        path: "profile",
        element: <UserDetail />,
      },

      {
        path: "userdetail",
        element: <UserDetail />,
      },
    ],
  },

  // =========================
  // ADMIN
  // =========================
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <CheckProduct />,
      },

      {
        path: "add/product",
        element: <AddProduct />,
      },

      {
        path: "admin-product",
        element: <CheckProduct />,
      },

      {
        path: "checkuser",
        element: <CheckUser />,
      },

      {
        path: "makeadmin",
        element: <Makeadmin />,
      },

      {
        path: "removeadmin",
        element: <Removeadmin />,
      },
    ],
  },

  // =========================
  // 404
  // =========================
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

// =========================
// App
// =========================
const App = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
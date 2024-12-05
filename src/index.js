// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
// import { Provider, useSelector } from "react-redux";
// import store from "./store";
// import { Dashboard, User, Profile, Setting, Report, Pagenotfound, Login } from "./components";
// import PrivateRoute from "./components/PrivateRoute";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Wrapper to prevent access to `/login` when authenticated
// const LoginRedirectWrapper = ({ children }) => {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
// };

// // Custom wrapper to check authentication
// const AuthWrapper = ({ children }) => {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Replace this with your actual Redux state path
//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// };

// // Router configuration
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <AuthWrapper>
//         <PrivateRoute>
//           <App />
//         </PrivateRoute>
//       </AuthWrapper>
//     ),
//     children: [
//       { path: "dashboard", element: <Dashboard /> },
//       { path: "user", element: <User /> },
//       { path: "profile", element: <Profile /> },
//       { path: "setting", element: <Setting /> },
//       { path: "report", element: <Report /> },
//     ],
//   },
//   {
//     path: "/login",
//     element: (
//       <LoginRedirectWrapper>
//         <Login />
//       </LoginRedirectWrapper>
//     ),
//   },
//   { path: "*", element: <Pagenotfound /> }, // Catch-all route
// ]);

// // Render the application
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <ToastContainer />
//       <RouterProvider router={router} />
//     </Provider>
//   </React.StrictMode>
// );

// reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CONSTANT from "./utils/constant";
import {
  Dashboard,
  User,
  Profile,
  Setting,
  Report,
  Pagenotfound,
  Login,
} from "./components";
import { Provider } from "react-redux";
import store from "./store";

// Wrapper to prevent access to `/login` when a token exists in localStorage
const LoginRedirectWrapper = ({ children }) => {
  const token = localStorage.getItem(CONSTANT.TOKEN); // Replace 'token' with your actual token key in localStorage
  return token ? <Navigate to="/dashboard" replace /> : children;
};

// Custom wrapper to check for the token in localStorage for authentication
const AuthWrapper = ({ children }) => {
  const token = localStorage.getItem(CONSTANT.TOKEN); // Check if token exists in localStorage
  return token ? children : <Navigate to="/login" replace />; // Redirect to login if no token
};

// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthWrapper>
        <App />
      </AuthWrapper>
    ),
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "user", element: <User /> },
      { path: "profile", element: <Profile /> },
      { path: "setting", element: <Setting /> },
      { path: "report", element: <Report /> },
    ],
  },
  {
    path: "/login",
    element: (
      <LoginRedirectWrapper>
        <Login />
      </LoginRedirectWrapper>
    ),
  },
  { path: "*", element: <Pagenotfound /> }, // Catch-all route
]);

// Render the application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

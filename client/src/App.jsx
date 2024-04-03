import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ConfirmMail from "./pages/ConfirmMail.jsx";
import VerifymMail from "./pages/VerifyMail.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import VerifyUser from "./components/VerifyUser.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <VerifyUser><Home /></VerifyUser> ,
  },
  {
    path: "/login",
    element: <VerifyUser><Login /></VerifyUser>,
  },
  {
    path: "/register",
    element:<VerifyUser><Register /></VerifyUser> ,
  },
  {
    path: "/confirm",
    element: <VerifyUser><ConfirmMail /></VerifyUser>,
  },
  {
    path: "/verify",
    element: <VerifyUser><VerifymMail /></VerifyUser>,
  },
  {
    path: "/forgotpassword",
    element: <VerifyUser><ForgotPassword /></VerifyUser>,
  },
  {
    path: "/resetpassword",
    element: <VerifyUser><ResetPassword /></VerifyUser>,
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

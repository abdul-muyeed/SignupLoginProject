/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../services/apiSlice";
import Loader from "./Loader";

export default function VerifyUser({ children }) {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetUserQuery();

  if (isLoading) return <Loader />;
  // if (isError) return <h1>Ops somthing went wrong {error.data.message}</h1>;

  const loggedIn = data?.loggedIn || false;

  if (children.type.name === "Login" || children.type.name === "Register") {
    if (data?.verified === false && loggedIn) {
      return navigate("/confirm");
    }
    if (loggedIn) {
      return navigate("/");
    }
  }
  // console.log(children.type.name);
  if (
    children.type.name === "ConfirmMail" ||
    children.type.name === "VerifymMail"
  ) {
    if (!loggedIn) {
      return navigate("/login");
    }
    if (data?.verified) {
      return navigate("/");
    }
  }
  if (
    children.type.name === "ForgotPassword" ||
    children.type.name === "ResetPassword"
  ) {
    if (loggedIn) {
      return navigate("/");
    }
  }
  if (children.type.name === "Home") {
    if (!loggedIn) {
      return navigate("/login");
    }
    if (data?.verified === false) {
      return navigate("/confirm");
    }
  }
  return children;
}

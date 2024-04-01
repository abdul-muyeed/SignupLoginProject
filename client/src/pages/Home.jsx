import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { incriment, decrement } from "../services/authSlice";
// import { Button } from "@mui/material";
import { useGetUserQuery } from "../services/apiSlice";
import BasicModal from "../components/Model";
import Loader from "../components/Loader";

export default function Home() {
  //   const count = useSelector((state) => state.auth.value);
  //   const dispatch = useDispatch();
  const { data, error, isLoading, isError } = useGetUserQuery();

  console.log("data", data, "error", error, "loading", isLoading);
  // const { email, _id } = data;
  // const
  console.log(data, error, isLoading, isError);
  if (isLoading) return <Loader />;
  if (isError) return <h1>Error...{error.status}</h1>;

  const { email, _id } = data;
  return (
    <div>
      <BasicModal title="Hello" body="This is a modal" color="primary" />
      <ul>
        <li>{email}</li>
        <li>{_id}</li>
      </ul>
      <Link to={"/login"}>login </Link>
    </div>
  );
}

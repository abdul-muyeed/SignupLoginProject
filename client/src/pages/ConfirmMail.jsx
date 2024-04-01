import { Avatar, Grid, Paper, Button } from "@mui/material";
import { LockOutlined as LockIcon } from "@mui/icons-material";
import {
  useGetUserQuery,
  useVerifyMailMutation,
} from "../services/apiSlice";
import Loader from "../components/Loader";

export default function ConfirmMail() {
  const { data } = useGetUserQuery();
  const [res, { isLoading, isError, error, isSuccess }] = useVerifyMailMutation();
  console.log(data);
  const handleInput = async () => {
    const body = { id: data._id, email: data.email };
    console.log("body", body);
    const { data: resData, error } = await res(body);
    if (resData) {
      console.log("reset password success", data);
    }
    if (error) {
      console.log("reset password error", error);
    }
  };
  const pageStyle = {
    padding: 20,
    height: "50vh",
    width: 320,
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };
  if (isLoading) return <Loader />;
  if (isError) return <h1>Error...{error}</h1>;
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Paper elevation={12} style={pageStyle}>
          <Grid align={"center"}>
            <Avatar sx={{ bgcolor: "#004dffdb" }}>
              <LockIcon />
            </Avatar>
            <br />
            <h2>Confirm Mail</h2>
          </Grid>
          <br />
          <br />
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              {!isSuccess ? (
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  fullWidth
                  onClick={handleInput}
                >
                  SEND MAIL
                </Button>
              ) : (
                <h3 style={{ textAlign: "center" }}>Mail Sent</h3>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

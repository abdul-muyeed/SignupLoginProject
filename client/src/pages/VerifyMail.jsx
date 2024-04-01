import { Avatar, Grid, Paper } from "@mui/material";
import { Done as Icon } from "@mui/icons-material";
import { useVerifyMutation } from "../services/apiSlice";
import { useEffect } from "react";

export default function VerifymMail() {
  const [verify, { isError, error, isLoading, isSuccess }] =
    useVerifyMutation();
  useEffect(() => {
    verify({ token: document.location.search.substring(5) });
  }, []);
  console.log(isError, error, isLoading, isSuccess);
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
            <Avatar sx={{ bgcolor: "#18de00" }}>
              <Icon fontSize="large" />
            </Avatar>
            <br />
            {isLoading && <h2>Verifying...</h2>}
            {isError && <h2>Error...{error?.status}</h2>}
            {isSuccess && <h2>Verified</h2>}
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

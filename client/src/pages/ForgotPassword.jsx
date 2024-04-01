import { Avatar, Grid, Paper, Button, TextField } from "@mui/material";
import { LockOutlined as LockIcon } from "@mui/icons-material";
import { useForgotPasswordMutation } from "../services/apiSlice";
import { useState } from "react";
import Loader from "../components/Loader";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [func, {data, isError, isLoading, error }] = useForgotPasswordMutation();
  console.log(data);

  const handleInput = () => {
    func({ email })
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
            <h2>Forgot Password</h2>
          </Grid>
          <br />
          <br />
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <TextField
                id="standard-basic"
                label="Email"
                placeholder="s2100000000@ru.ac.bd"
                variant="standard"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                onClick={handleInput}
              >
                ENTER EMAIL
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

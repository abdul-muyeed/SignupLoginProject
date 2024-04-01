import { Avatar, Grid, Paper, Button, TextField, InputAdornment, IconButton } from "@mui/material";
import { LockOutlined as LockIcon, Visibility, VisibilityOff } from "@mui/icons-material";
import { useResetPasswordMutation } from "../services/apiSlice";
import { useState } from "react";
import Loader from "../components/Loader";

export default function ResetPassword() {
  const [user, setUser] = useState({ new_password: "", confirm_password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const [func, {data, isLoading, isError, error}] = useResetPasswordMutation()
  console.log(data);

  const handleInput = (e) => {
    const { id, value } = e.target;
    setUser({ ...user, [id]: value });
  }
  const handleSubmit = () => {
    if (user.new_password !== user.confirm_password) {
      alert("Password does not match");
      return;
    }
    func({ token: document.location.search.substring(5), password: user.new_password });
  }

  console.log(document.location.search.substring(5));
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
  if (isError) return <h1>Error...{error.status}</h1>;
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
            <h2>Reset Password</h2>
          </Grid>
          <br />
          <br />
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <TextField
                id="new_password"
                label="New Password"
                placeholder="New Password"
                variant="standard"
                fullWidth
                required
                  type={showPassword ? "text" : "password"}
                  value={user.new_password}
                onChange={handleInput}
                autoComplete="off"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="confirm_password"
                label="Confirm Password"
                placeholder="Confirm Password"
                variant="standard"
                fullWidth
                required
                  type={showConfirmPassword ? "text" : "password"}
                  value={user.confirm_password}
                onChange={handleInput}
                autoComplete="off"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
              />
            </Grid>
            <br />
            <Grid item xs={12}>
              {/* {!isSuccess ? ( */}
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                onClick={handleSubmit}
              >
                RESET PASSWORD
              </Button>
              {/* ) : (
                <h3 style={{ textAlign: "center" }}>Mail Sent</h3>
              )} */}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

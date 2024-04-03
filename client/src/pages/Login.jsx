import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Grid,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  LockOutlined as LockIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useLoginMutation } from "../services/apiSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setvalue } from "../services/alertSlice";
import Loader from "../components/Loader";
import AlertMessage from "../components/AlertMessage";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [alert, setAlertValue] = useState({ error: "", severity: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading, isError }] = useLoginMutation();
  const dispatch = useDispatch();
  let name, value;
  const handleInput = (e) => {
    name = e.target.id;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await login(user);
    console.log(data);
    console.log(error);
    if (data) {
      dispatch(setvalue(true));

      setAlertValue({ message: "Login Successful", severity: "success" });
      navigate("/");  
    }
    if (error) {
      dispatch(setvalue(true));
      if (error?.status === 406) {
        setAlertValue({ message: error?.data?.message, severity: "info" });
      } else {
        setAlertValue({ message: error?.data?.message, severity: "error" });
      }
    }
  };

  const pageStyle = {
    padding: 20,
    height: "70vh",
    width: 320,
    margin: "50px auto",
  };
  const fromFooter = {
    frontSize: "0.8rem",
  };
  console.log(isError);
  if (isLoading) return <Loader />;

  return (
    <>
      <AlertMessage data={alert} />
      <Grid container justifyContent="center" alignItems="center">
        <Paper elevation={12} style={pageStyle}>
          <Grid align={"center"}>
            <Avatar sx={{ bgcolor: "#004dffdb" }}>
              <LockIcon />
            </Avatar>
            <br />
            <h2>Login</h2>
          </Grid>
          <br />
          <form onSubmit={handleSubmit} autoComplete="off">
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  label="Email"
                  placeholder="s2100000000@ru.ac.bd"
                  variant="standard"
                  type="email"
                  fullWidth
                  required
                  value={user.email}
                  onChange={handleInput}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="password"
                  label="Password"
                  placeholder="Password"
                  variant="standard"
                  fullWidth
                  required
                  type={showPassword ? "text" : "password"}
                  value={user.password}
                  onChange={handleInput}
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
              {/* <Grid item> */}
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember me"
              />
              {/* </Grid> */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  fullWidth
                >
                  LOGIN
                </Button>
              </Grid>
              <Grid item style={fromFooter}>
                <Typography variant="subtitle2">
                  <Link href="#">Forgot Password?</Link>
                  <br />
                  Do you have an account?
                  <Link to="/register"> Sign Up</Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </>
  );
}

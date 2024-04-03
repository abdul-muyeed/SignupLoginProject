import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Grid,
  Paper,
  TextField,
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
import { useState } from "react";
import AlertMessage from "../components/AlertMessage.jsx";
import { useDispatch } from "react-redux";
import { setvalue } from "../services/alertSlice";
import { useSignUpMutation } from "../services/apiSlice";
import Loader from "../components/Loader.jsx";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState({ message: "", severity: "" });
  const [signUp, { data, isLoading, isError, error }] = useSignUpMutation();
  let name, value;
  const handleInput = (e) => {
    name = e.target.id;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    if (user.password !== user.confirm_password) {
      dispatch(setvalue(true));
      console.log("Password does not match");
      setAlert({ message: "Password does not match", severity: "error" });
      return;
    }
    // console.log("sjcb");
    delete user.confirm_password;
    const { data, error } = await signUp(user);
    console.log(data);
    if (error) {
      dispatch(setvalue(true));
      setAlert({ message: error?.data?.message, severity: "error" });
    }
    if (data) {
      dispatch(setvalue(true));
      setAlert({ message: "Registration Successful", severity: "success" });
      navigate("/confirm");
    }

    setUser({ ...user, confirm_password: user.password });
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
  if (isLoading) return <Loader />;

  // console.log(isError, error);
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
            <h2>Register</h2>
          </Grid>
          <br />
          <form onSubmit={handleSubmit}>
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  label="Email"
                  placeholder="s2100000000@ru.ac.bd"
                  variant="standard"
                  fullWidth
                  required
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
              <Grid item xs={12}>
                <TextField
                  id="confirm_password"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  variant="standard"
                  fullWidth
                  required
                  type={showPassword ? "text" : "password"}
                  value={user.confirm_password}
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
              <Grid item xs={12}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  fullWidth
                >
                  REGISTER
                </Button>
              </Grid>
              <Grid item style={fromFooter}>
                <Typography variant="subtitle2">
                  Already have an account?
                  <Link to="/login"> Login</Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </>
  );
}

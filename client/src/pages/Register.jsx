import { Link } from "react-router-dom";
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
import { LockOutlined as LockIcon, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

export default function Register() {
    const [user, setUser] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    let name, value;
    const handleInput = (e) => {
        name = e.target.id;
        value = e.target.value;
        setUser({ ...user, [name]: value });
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
  return (
    <>
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
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <TextField
                id="standard-basic"
                label="Email"
                placeholder="s2100000000@ru.ac.bd"
                variant="standard"
                fullWidth
                required
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
        </Paper>
      </Grid>
    </>
  );
}

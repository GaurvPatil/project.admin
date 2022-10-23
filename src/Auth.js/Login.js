import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import clsx from "clsx";
import { GreenButton, useStyles } from "../CommonCss/commonCss";
import { makeStyles } from "@mui/styles";
import ComponentHeaders from "../CommonComponetns/ComponentHeaders";
import { sweetFailed, sweetSuccess } from "../CommonFunctions/SweetAlert";
import { notifyWarning } from "../CommonFunctions/Toaster";
import axios from "axios";
import { API } from "../API";
import { ToastContainer } from "react-toastify";

const loginStyle = makeStyles((theme) => ({
  Box: {
    marginTop: "5rem",
  },
}));

export default function Login() {
  const classes = useStyles();
  const loginClasses = loginStyle();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const pass = e.target.password.value;
    const email = e.target.email.value;

    console.log(pass, email);

    if (!pass || !email) {
      notifyWarning("All Fields Required !");
    } else {
      axios.post(`${API}/admin-signin`, {
        email: email,
        password: pass,
      });

      await axios
        .post(
          `${API}/admin-signin`,
          {
            email: email,
            password: pass,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((res) => {
          if (res.data.status === "OK") {
            localStorage.setItem(
              "auth",
              JSON.stringify({
                user: res.data.email,
                token: res.data.token,
              })
            );

            const message = res.data.message;
            const title = "Success";

            return sweetSuccess(title, message).then(function () {
              navigate("/dashboard", { replace: true });
            });
          }
          if (res.data.status === "failed") {
            const message = res.data.message;
            const title = "Failed";
            sweetFailed(title, message);
          }
        })
        .catch((err) => {
          const message = err.response.data.message;
          const title = "Server Error";
          sweetFailed(title, message);
        });
    }
  };

  return (
    <Container
      className={clsx(classes.centerItem, classes.flexColumn)}
      maxWidth="sm"
    >
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: "40ch" },
        }}
        component="form"
        noValidate
        autoComplete="on"
        className={clsx(
          classes.boxshadow,
          classes.flexColumn,
          classes.centerItem,
          loginClasses.Box
        )}
        onSubmit={(e) => handleLogin(e)}
      >
        <ComponentHeaders data={"ADMIN LOGIN"} />

        <TextField label="Email" variant="outlined" name="email" />
        <TextField
          label="Password"
          type="password"
          autoComplete="current-password"
          name="password"
        />

        <GreenButton variant="contained" type="submit">
          {" "}
          Login{" "}
        </GreenButton>

        <div className={classes.flexRow}>
          <Typography>
            <Link to="#"> Forgot Password </Link>
          </Typography>
          <Typography>
            <Link to="/register"> Register User </Link>
          </Typography>
        </div>
      </Box>
      <ToastContainer />
    </Container>
  );
}

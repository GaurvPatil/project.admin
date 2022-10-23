import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Container, Typography } from "@mui/material";
import clsx from "clsx";
import { GreenButton, useStyles } from "../CommonCss/commonCss";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { API } from "../API";
import { notifyWarning, notifyError } from "../CommonFunctions/Toaster";
import ComponentHeaders from "../CommonComponetns/ComponentHeaders";
import { sweetFailed, sweetSuccess } from "../CommonFunctions/SweetAlert";

const loginStyle = makeStyles((theme) => ({
  Box: {
    marginTop: "5rem",
  },
}));

export default function Register() {
  const classes = useStyles();
  const loginClasses = loginStyle();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const pass = e.target.password.value;
    const Cpass = e.target.confirmPassword.value;
    const email = e.target.email.value;

    if (!pass || !Cpass || !email) {
      notifyWarning("All Fields Required !");
    } else if (pass !== Cpass) {
      notifyError("Password not match !");
    } else {
      axios
        .post(`${API}/admin-signup`, {
          email: email,
          password: Cpass,
          userType: "admin",
        })
        .then((res) => {
          if (res.data.status === "OK") {
            const message = res.data.message;
            const title = "Success";
            return sweetSuccess(title, message).then(function () {
              navigate("/login", { replace: true });
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
        onSubmit={(e) => handleRegister(e)}
      >
        <ComponentHeaders data={"ADMIN REGISTER"} />

        <TextField label="Email" variant="outlined" name="email" />
        <TextField
          label="Password"
          type="password"
          autoComplete="current-password"
          name="password"
        />
        <TextField
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
          name="confirmPassword"
        />

        <GreenButton variant="contained" type="submit">
          {" "}
          Register{" "}
        </GreenButton>

        <div className={classes.flexRow}>
          <Typography>
            <Link to="/login">Login </Link>
          </Typography>
        </div>
      </Box>
      <ToastContainer />
    </Container>
  );
}

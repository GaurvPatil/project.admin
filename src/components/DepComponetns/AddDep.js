import { Container, TextField } from "@mui/material";
import React, { useState } from "react";
import clsx from "clsx";
import { GreenButton, RedButton, useStyles } from "../../CommonCss/commonCss";
import ComponentHeaders from "../../CommonComponetns/ComponentHeaders";
import { Box } from "@mui/system";
import { notifyWarning } from "../../CommonFunctions/Toaster";
import axios from "axios";
import { API } from "../../API";
import { isAutheticated } from "../../Auth.js/authHelper";
import { ToastContainer } from "react-toastify";
import { sweetFailed, sweetSuccess } from "../../CommonFunctions/SweetAlert";
import { useNavigate } from "react-router-dom";
import { LinearLoading } from "../../CommonComponetns/Ccomponents";

const AddDep = () => {
  const classes = useStyles();
  const { token } = isAutheticated();
  const navigate = useNavigate();
  const [lineLoading, setlineLoading] = useState(false);

  const handleSubmit = async (e) => {
    setlineLoading(true);
    e.preventDefault();
    const departmentName = e.target.departmentName.value;
    const hod = e.target.hod.value.toUpperCase();
    const teachers = e.target.teachers.value;
    const students = e.target.students.value;

    if (!departmentName) {
      notifyWarning("Department Name is Required !");
      setlineLoading(false);
    } else {
      await axios
        .post(
          `${API}/api/department/`,
          {
            departmentName,
            hod,
            teachers,
            students,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.status === "OK") {
            const message = res.data.message;
            const title = "Success";

            return sweetSuccess(title, message).then(function () {
              navigate("/departments", { replace: true });
            });
          }
          if (res.data.status === "failed") {
            const message = res.data.message;
            const title = "Failed";
            sweetFailed(title, message);
          }
          setlineLoading(false);
        })
        .catch((err) => {
          const message = "Error Communicating with server";
          const title = "Server Error";
          sweetFailed(title, message);
          setlineLoading(true);
        });
    }
  };

  return (
    <Container maxWidth="lg">
      {lineLoading && <LinearLoading />}
      <Box
        component="form"
        noValidate
        autoComplete="on"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className={clsx(classes.contetnJustify, classes.gapMT)}>
          <ComponentHeaders data={"Add New Department"} />
          <div>
            <GreenButton variant="contained" type="submit">
              Save
            </GreenButton>
            <RedButton
              variant="contained"
              onClick={() => navigate("/departments", { replace: true })}
            >
              Cancel
            </RedButton>
          </div>
        </div>

        <Box
          sx={{
            display: "flex",
            gap: "1.5rem",
          }}
          className={clsx(classes.fullWidth, classes.gapMT)}
        >
          <section className={clsx(classes.halfWidth, classes.boxshadow)}>
            <div className={clsx(classes.flexInitiate, classes.flexColumn)}>
              <br />
              <label className={classes.boldFonts}>
                Department Name <span> *</span>
              </label>

              <TextField
                label="DepartmentName"
                variant="outlined"
                name="departmentName"
              />
              <br />
              <label className={classes.boldFonts}>
                Hod Name <span> : </span>
              </label>
              <TextField label="Hod" variant="outlined" name="hod" />
              <br />
            </div>
          </section>
          <section className={clsx(classes.halfWidth, classes.boxshadow)}>
            <div className={clsx(classes.flexInitiate, classes.flexColumn)}>
              <br />
              <label className={classes.boldFonts}>
                Total numbers of teachers <span> : </span>
              </label>

              <TextField
                label="Teachers"
                variant="outlined"
                name="teachers"
                type="number"
              />
              <br />
              <label className={classes.boldFonts}>
                Total numbers of student <span> : </span>
              </label>

              <TextField
                label="Students"
                variant="outlined"
                name="students"
                type="number"
              />
              <br />
            </div>
          </section>
        </Box>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default AddDep;

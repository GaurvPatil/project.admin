import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import { useStyles } from "../../CommonCss/commonCss";
import { convertDate } from "../../CommonFunctions/commonjs";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { API } from "../../API";
import { isAutheticated } from "../../Auth.js/authHelper";
import { sweetFailed, sweetSuccess } from "../../CommonFunctions/SweetAlert";
import swal from "sweetalert";
import { LinearLoading } from "../../CommonComponetns/Ccomponents";
import { useNavigate } from "react-router-dom";


export default function DepCards({ department, getDepartments }) {
  const classes = useStyles();
  const { token } = isAutheticated();
  const [lineLoading, setlineLoading] = useState(false);
  const [checked, setChecked] = useState(department.active ? true : false);
  const navigate = useNavigate()

  const changeStatus = async (ID, departmentName) => {
    setlineLoading(true);
    await axios
      .patch(
        `${API}/api/department/${ID}`,
        {
          active: !checked,
          departmentName,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )

      .then(() => {
        getDepartments();
        setlineLoading(false);
      })
      .catch((err) => {
        const message = "Error Communicating with server";
        const title = "Server Error";
        sweetFailed(title, message);
        setlineLoading(true);
      });
  };

  const handleDelete = async (ID) => {
    setlineLoading(true);
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this Department?",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    });

    if (willDelete) {
      await axios
        .delete(
          `${API}/api/department/${ID}`,

          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${token}`,
            },
          }
        )

        .then((res) => {
          getDepartments();
          if (res.data.status === "OK") {
            const message = res.data.message;
            const title = "Succes";
            sweetSuccess(title, message);
          }
          if (res.data.status === "failed") {
            const message = res.data.message;
            const title = "Failed";
            sweetFailed(title, message);
          }
        })
        .catch((err) => {
          const message = "Error Communicating with server";
          const title = "Server Error";
          sweetFailed(title, message);
          setlineLoading(true);
        });
    } else {
      setlineLoading(false);
    }
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      {lineLoading && <LinearLoading />}
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          className={clsx(classes.centerItem)}
          style={{
            background: department.active ? "#389338" : "#f33c3c",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {department.departmentName.toUpperCase()}
        </Typography>
        <br />

        <Typography gutterBottom>
          <span className={classes.boldFonts}>HOD : </span> {department.hod}
        </Typography>

        <Typography gutterBottom>
          <span className={classes.boldFonts}>Teachers : </span>{" "}
          {department.teachers}
        </Typography>

        <Typography gutterBottom>
          <span className={classes.boldFonts}>Students : </span>{" "}
          {department.students}
        </Typography>

        <Typography gutterBottom>
          <span className={classes.boldFonts}>CreatedAt : </span>{" "}
          {convertDate(department.createdAt)}
        </Typography>

        <Typography gutterBottom>
          <span className={classes.boldFonts}>UpdatedAt : </span>{" "}
          {convertDate(department.updatedAt)}
        </Typography>

        <br />
        <hr />
      </CardContent>
      <CardActions>
        <Stack spacing={2} direction="row">
          <Button variant="outlined" size="small"
          
          onClick = {()=>{
            navigate(`/department/edit/${department._id}` , {replace:true})
          }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(department._id)}
          >
            Delete
          </Button>

          <Switch
            checked={checked}
            onChange={() => {
              setChecked(!checked);
              changeStatus(department._id, department.departmentName);
            }}
            inputProps={{ "aria-label": "controlled" }}
            label={department.active ? "Active" : "Suspend"}
          />
        </Stack>
      </CardActions>
      <br />
    </Card>
  );
}

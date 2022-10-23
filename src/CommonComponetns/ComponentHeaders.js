import { Typography } from "@mui/material";
import React from "react";
import { useStyles } from "../CommonCss/commonCss";
import clsx from "clsx";

const ComponentHeaders = ({ data }) => {
  const classes = useStyles();
  return (
    <Typography
      variant="h5"
      className={clsx(classes.centerItem)}
      style = {{fontWeight:"bold"}}
    >
      {" "}
      {data}{" "}
    </Typography>
  );
};

export default ComponentHeaders;

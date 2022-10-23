import { Button, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../API";
import { isAutheticated } from "../Auth.js/authHelper";
import Loader from "../CommonComponetns/Loader";
import DepCards from "../components/DepComponetns/DepCards";
import { useNavigate } from "react-router-dom";
import { useStyles } from "../CommonCss/commonCss";
import clsx from "clsx";
import ComponentHeaders from "../CommonComponetns/ComponentHeaders";

const Departments = () => {
  const { token } = isAutheticated();
  const [dep, setDep] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const classes = useStyles();

  const getDepartments = async () => {
    const departments = await axios.get(`${API}/api/department`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setDep([...departments.data.data]);
    setLoading(false);
  };

  useEffect(() => {
    getDepartments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="lg">
      <ComponentHeaders data={"Departments"} />
      <div className={clsx(classes.centerItem, classes.gapMT)}>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/department/add", { replace: true });
          }}
        >
          Add new department
        </Button>
      </div>
      <div className={clsx(classes.centerItem, classes.gapMT)}>
        {loading ? (
          <Loader />
        ) : (
          dep.map((department, index) => {
            return (
              <DepCards
                key={index}
                department={department}
                getDepartments={getDepartments}
              />
            );
          })
        )}
      </div>
    </Container>
  );
};

export default Departments;

import { Container, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { LinearLoading } from "../../CommonComponetns/Ccomponents";
import Loader from "../../CommonComponetns/Loader";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const EditGuide = () => {
  const classes = useStyles();
  const { token } = isAutheticated();
  const navigate = useNavigate();
  const params = useParams();
  const [lineLoading, setlineLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({});

  const [departments, setDepartments] = useState([]);
  const [dep, setDep] = React.useState("");
  const [depID, setDepID] = useState("");
  const handleChange = (event) => {
    setDep(event.target.value);

    const filterDeps = departments.filter((dep) => {
      return dep.departmentName === event.target.value;
    });

    setDepID(filterDeps[0]._id);
  };

  const getSingleGuide = async () => {
    const guide = await axios.get(`${API}/api/guide/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setState(guide.data.data);
    setDep(guide.data.data.department.departmentName);

    getDepartments();
  };

  const getDepartments = async () => {
    const departments = await axios.get(`${API}/api/department`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setDepartments([...departments.data.data]);
    setLoading(false);
  };

  useEffect(() => {
    getSingleGuide();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    setlineLoading(true);
    e.preventDefault();
    const guideName = e.target.name.value.toUpperCase();
    const email = e.target.email.value;
    const departmentID = depID ? depID : state.department._id;

    if (!guideName || !email || !departmentID) {
      notifyWarning("All fields Required !");
      setlineLoading(false);
    } else {
      await axios
        .patch(
          `${API}/api/guide/${params.id}`,
          {
            name: guideName,
            email,
            department: departmentID,
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
              navigate("/projectguides", { replace: true });
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
      {loading ? (
        <Loader />
      ) : (
        <>
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
                  onClick={() => navigate("/projectguides", { replace: true })}
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
                    Guide Name <span> *</span>
                  </label>

                  <TextField
                    label="Name"
                    variant="outlined"
                    name="name"
                    type="email"
                    defaultValue={state?.name}
                  />
                  <br />
                  <label className={classes.boldFonts}>
                    Guide E-mail <span> * </span>
                  </label>
                  <TextField
                    label="E-mail"
                    variant="outlined"
                    name="email"
                    defaultValue={state?.email}
                  />
                  <br />
                </div>
              </section>

              <section className={clsx(classes.halfWidth, classes.boxshadow)}>
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <div
                      className={clsx(classes.flexInitiate, classes.flexColumn)}
                    >
                      <br />

                      <label className={classes.boldFonts}>
                        Select Department <span> * </span>
                      </label>

                      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small">
                          Department
                        </InputLabel>
                        <Select
                          id="demo-select-small"
                          value={dep}
                          onChange={handleChange}
                        >
                          {departments?.map((dep, index) => {
                            return (
                              <MenuItem value={dep.departmentName} key={index}>
                                {dep.active && dep.departmentName}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>

                      <br />
                    </div>
                  </>
                )}
              </section>
            </Box>
          </Box>
          <ToastContainer />
        </>
      )}
    </Container>
  );
};

export default EditGuide;

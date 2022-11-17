import { Button, Container } from "@mui/material";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ComponentHeaders from "../CommonComponetns/ComponentHeaders";
import { useStyles } from "../CommonCss/commonCss";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import { tableIcons } from "../CommonFunctions/commonjs";
import { API } from "../API";
import axios from "axios";
import { isAutheticated } from "../Auth.js/authHelper";
import Loader from "../CommonComponetns/Loader";
import swal from "sweetalert";
import { sweetFailed, sweetSuccess } from "../CommonFunctions/SweetAlert";
import { LinearLoading } from "../CommonComponetns/Ccomponents";

export default function ProjectGuide() {
  const [loading, setLoading] = useState(true);
  const [guides, setGuides] = useState([]);
  const navigate = useNavigate();
  const classes = useStyles();
  const defaultMaterialTheme = createTheme();
  const { token } = isAutheticated();
  const [lineLoading, setlineLoading] = useState(false);

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
          `${API}/api/guide/${ID}`,

          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${token}`,
            },
          }
        )

        .then((res) => {
          getGuides();
          if (res.data.status === "OK") {
            const message = res.data.message;
            const title = "Succes";
            sweetSuccess(title, message);
            setlineLoading(false);
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

  const getGuides = async () => {
    const guides = await axios.get(`${API}/api/guide`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setGuides([...guides.data.data]);
    setLoading(false);
  };

  useEffect(() => {
    getGuides();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const DEMO_COLS = [
    { field: "name", title: "Name" },
    { field: "email", title: "Email" },
    { field: "department.departmentName", title: "department" },
    { field: "_id", title: "ID" },
  ];

  return (
    <Container maxWidth="lg">
      {lineLoading && <LinearLoading />}
      <ComponentHeaders data={"Project Guides"} />
      <div className={clsx(classes.centerItem, classes.gapMT, classes.gapMB)}>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/projectguide/add", { replace: true });
          }}
        >
          Add Project Guide
        </Button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <ThemeProvider theme={defaultMaterialTheme}>
          <MaterialTable
            icons={tableIcons}
            columns={DEMO_COLS}
            data={guides}
            title="All Guides"
            detailPanel={[
              {
                tooltip: "details",
                render: (rowData) => {
                  return (
                    <div
                      style={{
                        fontSize: "3rem",
                        textAlign: "center",
                        color: "white",
                        backgroundColor: "rgb(0 0 0)",
                      }}
                    >
                      Guide Status
                    </div>
                  );
                },
              },
            ]}
            actions={[
              {
                icon: tableIcons.Edit,
                tooltip: "Edit Guide",
                onClick: (event, rowData) => {
                  navigate(`/projectguide/edit/${rowData._id}`, {
                    replace: true,
                  });
                },
              },
              (rowData) => ({
                icon: tableIcons.Delete,
                tooltip: "Delete Guide",
                onClick: (event, rowData) => {
                  handleDelete(rowData._id);
                },
              }),
            ]}
            options={{
              actionsColumnIndex: -1,
            }}
          />
        </ThemeProvider>
      )}
    </Container>
  );
}

import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import OutlinedCard from "../components/Dashboard/dashCards";


import axios from "axios";
import { API } from "../API";
import { isAutheticated } from "../Auth.js/authHelper";
import Loader from "../CommonComponetns/Loader";
const Dashboard = () => {
 
  const { token } = isAutheticated();
  const [loading, setLoading] = useState(true);
  const [countData, setCount] = useState("");

  const getDashboardCounts = async () => {
    const count = await axios.get(`${API}/api/getdashboardcount`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setCount(count.data.data);
    setLoading(false);
  };
  useEffect(() => {
    getDashboardCounts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <>
          <OutlinedCard count={countData} />
        </>
      )}
    </Container>
  );
};

export default Dashboard;

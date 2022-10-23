import { Button, Container } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAutheticated } from "../Auth.js/authHelper";
const Home = () => {
  const navigate = useNavigate();
  const { token } = isAutheticated();
  useEffect(() => {
    if (token) {
      navigate("/dashboard", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="lg">
      <Button
        onClick={() => {
          navigate("/login", { replace: true });
        }}
      >
        Login
      </Button>
    </Container>
  );
};

export default Home;

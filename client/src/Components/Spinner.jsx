import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      style={{ marginTop: "20%", marginLeft: "50%" }}
      animation="border"
      variant="danger"
    />
  );
};

export default Loader;

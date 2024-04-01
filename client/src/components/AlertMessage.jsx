import { Alert, Box } from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../services/alertSlice.jsx";

export default function AlertMessage({ message, severity }) {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.alert.value);

  
  return (
    <>
      <Box visibility={open ? "visible" : "hidden"}>
        <Alert
          severity={severity}
          onClose={() => {
            dispatch(toggle());
          }}
        >
          {message}
        </Alert>
      </Box>
    </>
  );
}

AlertMessage.defaultProps = {
  message: "This is a message",
  severity: "info",
};

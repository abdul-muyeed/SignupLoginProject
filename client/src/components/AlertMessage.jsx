/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Box } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggle, setvalue } from "../services/alertSlice.jsx";

export default function AlertMessage({ data }) {
  const { message, severity } = data;
  const dispatch = useDispatch();
  const open = useSelector((state) => state.alert.value);
  const sleep = async (ms) => {
    await new Promise((resolve) => setTimeout(resolve, ms));
    dispatch(setvalue(false));
  };

  useEffect(() => {
    if (open) {
      sleep(5000);
    }
  }, [open]);
  return (
    <>
      <Box visibility={open ? "visible" : "hidden"}>
        <Alert
          severity={severity}
          onClose={() => {
            dispatch(setvalue(false));
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

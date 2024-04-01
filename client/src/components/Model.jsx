/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 8,
  boxShadow: 18,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = useState(useSelector((state) => state.modal.value));
  const handleClose = () =>{
    setOpen(false);
    window.location.reload();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid align="center">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {props?.title}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {props?.body}
            </Typography>
            <br />
            <Button
              variant="contained"
              type="submit"
              color={props?.color}
              // fullWidth
              onClick={handleClose}
            >
              Close
            </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

// props calidation
BasicModal.defaultProps = {
  title: "Modal Title",
  body: "Modal Body",
  color: "primary",
};

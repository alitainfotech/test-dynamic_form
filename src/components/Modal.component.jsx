import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import FormComponent from "./Form.component";

const ModalForm = ({ open, handleClose, data, onSubmit }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Form</DialogTitle>
      <DialogContent>
        <br />
        <FormComponent data={data} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default ModalForm;

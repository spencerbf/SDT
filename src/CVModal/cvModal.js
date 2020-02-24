import React, { useState, useEffect } from "react";
import useStyles from "./cvModal.styles";
import Modal from "@material-ui/core/Modal";
import Avatar from "@material-ui/core/Avatar";
import atob from "atob";
import ReactMarkdown from "react-markdown";

export const CVModal = props => {
  const [candidateCV, setCandidateCV] = useState("");
  const { open, handleClose, selectedCandidate } = props;

  useEffect(() => {
    if (open) {
      setCandidateCV(atob(selectedCandidate.resume_base64));
    }
  }, [open, selectedCandidate]);

  const classes = useStyles();

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <div className={classes.paper}>
          <h2 id="simple-modal-title">{`${selectedCandidate.real_name} Resume`}</h2>
          <ReactMarkdown source={candidateCV} />
        </div>
      </Modal>
    </div>
  );
};

export default CVModal;

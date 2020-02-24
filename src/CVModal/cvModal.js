import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import atob from "atob";
import ReactMarkdown from "react-markdown";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    height: "80%",
    width: "80%",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export const CVModal = props => {
  const [candidateCV, setCandidateCV] = useState("");
  const { open, handleClose, selectedCandidate } = props;

  useEffect(() => {
    if (open) {
      setCandidateCV(atob(selectedCandidate.resume_base64));
    }
  }, [open, selectedCandidate]);

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Text in a modal</h2>
          <ReactMarkdown source={candidateCV} />
        </div>
      </Modal>
    </div>
  );
};

export default CVModal;

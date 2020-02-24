import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    height: "80%",
    maxWidth: "80%",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "42%",
    left: "42%",
    transform: `translate(-42%, -42%)`
  }
}));

export default useStyles;

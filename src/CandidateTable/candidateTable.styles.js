import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    color: "pink"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 550
  },
  starButton: {
    color: "red"
  },
  tableHeader: {
    background: "lightBlue"
  },
  button: {
    fontSize: 12,
    border: "solid 1px"
  }
}));

export default useStyles;

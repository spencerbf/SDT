import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import content from "./candidateData.json";
import { Button } from "@material-ui/core";
import CVModal from "../CVModal/cvModal";
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  { id: "starCV", numeric: false, disablePadding: false, label: "Star CV" },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Full Name"
  },
  { id: "exp", numeric: false, disablePadding: false, label: "exp" },
  {
    id: "favLang",
    numeric: false,
    disablePadding: false,
    label: "Fav Language"
  },
  {
    id: "ausCit",
    numeric: false,
    disablePadding: false,
    label: "Australian Citizen"
  },
  { id: "showCv", numeric: false, disablePadding: false, label: "Show CV" }
];

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  }
}));

export const EnhancedTable = () => {
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [candidates, setCandidates] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setCandidates(content);
  }, []);

  const createData = ({
    id,
    real_name,
    years_as_sw_dev,
    favourite_language,
    australian_citizen
  }) => {
    const isAustralianCitizen = australian_citizen ? "YES" : "NO";
    return {
      id,
      real_name,
      years_as_sw_dev,
      favourite_language,
      isAustralianCitizen
    };
  };

  const rows = candidates.map(candidate => {
    console.log(createData(candidate));
    return createData(candidate);
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler = property => event => {
    handleRequestSort(event, property);
  };

  return (
    <div className={classes.root}>
      <Paper>
        <TableContainer>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {headCells.map(headCell => (
                  <TableCell
                    key={headCell.id}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={createSortHandler(headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy)).map(row => {
                return (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    <TableCell>Star</TableCell>
                    <TableCell scope="row" padding="none">
                      {row.real_name}
                    </TableCell>
                    <TableCell>{row.years_as_sw_dev}</TableCell>
                    <TableCell>{row.favourite_language}</TableCell>
                    <TableCell>{row.isAustralianCitizen}</TableCell>
                    <TableCell>
                      <Button onClick={handleOpen}>CV</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <CVModal handleClose={handleClose} open={open} />
    </div>
  );
};

export default EnhancedTable;

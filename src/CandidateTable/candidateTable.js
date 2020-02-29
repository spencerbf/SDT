import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Button } from "@material-ui/core";
import content from "../Data/candidateData.json";
import useStyles from "./candidateTable.styles";
import CVModal from "../CVModal/cvModal";
import CandidateTableHelpers from "./helpers/candidateTableHelpers";

const SHOW_RESUME = "Show Resume";

export const EnhancedTable = () => {
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("real_name");
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState({});
  const [starCandidate, setStarCandidate] = useState([]);
  const [open, setOpen] = useState(false);
  console.log("order", order);

  const handleOpen = row => {
    setSelectedCandidate(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setCandidates(content);
  }, []);

  const starredCandidate = id => {
    if (starCandidate.includes(id)) {
      setStarCandidate(starCandidate.filter(e => e !== id));
    } else {
      setStarCandidate(starCandidate.concat(id));
    }
  };

  const rows = candidates.map(candidate => {
    return CandidateTableHelpers.createData(candidate);
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
            <TableHead className={classes.tableHeader}>
              <TableRow>
                {CandidateTableHelpers.headCells.map(headCell =>
                  headCell.sortable ? (
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
                  ) : (
                    <TableCell key={headCell.id}>{headCell.label}</TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {CandidateTableHelpers.stableSort(
                rows,
                CandidateTableHelpers.getComparator(order, orderBy)
              ).map(row => {
                const {
                  id,
                  years_as_sw_dev,
                  favourite_language,
                  isAustralianCitizen,
                  real_name
                } = row;
                return (
                  <TableRow hover tabIndex={-1} key={id}>
                    <TableCell>
                      <Button
                        className={
                          starCandidate.includes(id) ? classes.starButton : ""
                        }
                        onClick={() => starredCandidate(id)}
                      >
                        <StarBorderIcon />
                      </Button>
                    </TableCell>
                    <TableCell scope="row" padding="none">
                      {real_name}
                    </TableCell>
                    <TableCell>{years_as_sw_dev}</TableCell>
                    <TableCell>{favourite_language}</TableCell>
                    <TableCell>{isAustralianCitizen}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleOpen(row)}
                        className={classes.button}
                      >
                        {SHOW_RESUME}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <CVModal
        handleClose={handleClose}
        open={open}
        selectedCandidate={selectedCandidate}
      />
    </div>
  );
};

export default EnhancedTable;

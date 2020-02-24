import React from "react";
import useStyles from "./App.styles";
import EnhancedTable from "./CandidateTable/candidateTable";

function App() {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <EnhancedTable />
    </div>
  );
}

export default App;

import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import EnhancedTable from "./CandidateTable/candidateTable";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <EnhancedTable />
        </div>
      </header>
    </div>
  );
}

export default App;

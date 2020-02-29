const CandidateTableHelpers = {
  descendingComparator: (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  },

  getComparator: (order, orderBy) => {
    return order === "desc"
      ? (a, b) => CandidateTableHelpers.descendingComparator(a, b, orderBy)
      : (a, b) => -CandidateTableHelpers.descendingComparator(a, b, orderBy);
  },
  stableSort: (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    return stabilizedThis.map(el => el[0]);
  },

  headCells: [
    {
      id: "starCV",
      numeric: false,
      label: "Star CV",
      sortable: false
    },
    {
      id: "real_name",
      numeric: false,
      label: "Full Name",
      sortable: true
    },
    {
      id: "years_as_sw_dev",
      numeric: true,
      label: "Experience",
      sortable: true
    },
    {
      id: "favourite_language",
      numeric: false,
      label: "Fav Language",
      sortable: true
    },
    {
      id: "isAustralianCitizen",
      numeric: false,
      label: "Australian Citizen",
      sortable: true
    },
    {
      id: "showCv",
      numeric: false,
      label: "Show Resume",
      sortable: false
    }
  ],
  createData: ({
    id,
    real_name,
    years_as_sw_dev,
    favourite_language,
    australian_citizen,
    resume_base64
  }) => {
    const isAustralianCitizen = australian_citizen ? "yes" : "no";
    return {
      id,
      real_name,
      years_as_sw_dev,
      favourite_language,
      isAustralianCitizen,
      resume_base64
    };
  }
};

export default CandidateTableHelpers;

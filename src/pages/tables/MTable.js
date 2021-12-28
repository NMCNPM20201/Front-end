import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import axios from 'axios';
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 1000
  }
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const Presentation = ({users}) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);

    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">NameID_Momo</StyledTableCell>
              <StyledTableCell align="left">Money</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => {
                return (
                  <StyledTableRow key={user.id}>

                    <StyledTableCell align="left">{user.nameID_Momo}</StyledTableCell>
                    <StyledTableCell align="left">
                      {user.money}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {user.day}/{user.month}/{user.year}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
function MTable() {
  const reverse = ([head, ...tail]) => 
    tail.length === 0
        ? [head]                       // Base case -- cannot reverse a single element.
        : [...reverse(tail), head] 
  const [USERS, setUSERS] = React.useState([]);
  React.useEffect(() => {
    axios.get('https://web-donate.herokuapp.com/donate/data_all_momo_donate')
      .then(res => {
        setUSERS(reverse(res.data));
      });
  }, []);

    return (
      <div>
        <Presentation users={USERS} />
      </div>
    );
}

export default MTable;

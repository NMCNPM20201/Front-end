import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter
 } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 950
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
  }));
// , STATUSES = ['Active', 'Pending', 'Blocked'];
// for(let i=0;i<20;i++) {
//     USERS[i] = {
//         name: faker.name.findName(),
//         email: faker.internet.email(),
//         phone: faker.phone.phoneNumber(),
//         jobTitle: faker.name.jobTitle(),
//         company: faker.company.companyName(),
//         joinDate: faker.date.past().toLocaleDateString('en-US'),
//         status: STATUSES[Math.floor(Math.random() * STATUSES.length)]
//     }
// }

function MTable() {
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
  const [USERS, setUSERS] = React.useState([]);
  React.useEffect(() => {
    axios.get('https://web-donate.herokuapp.com/donate/data_all_momo_donate')
      .then(res => {
        setUSERS(res.data.map(d=>
          d={
            nameID_Momo:d.nameID_Momo ,
            money : d.money,
            Message_Info:null,
            joinDate:d.day+"/"+d.month+"/"+d.year,
          }));
      });
  }, []);
  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>NameID_Momo"</TableCell>
            <TableCell className={classes.tableHeaderCell}>Money</TableCell>
            <TableCell className={classes.tableHeaderCell}>Message Info</TableCell>
            <TableCell className={classes.tableHeaderCell}>Donate Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {USERS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.nameID_Momo}>
              <TableCell>
                  <Grid container>
                      <Grid item lg={2}>
                          <Avatar alt={row.nameID_Momo} src='.' className={classes.avatar}/>
                      </Grid>
                      <Grid item lg={10}>
                          <Typography className={classes.name}>{row.nameID_Momo}</Typography>
                          {/* <Typography color="textSecondary" variant="body2">{row.email}</Typography>
                          <Typography color="textSecondary" variant="body2">{row.phone}</Typography> */}
                      </Grid>
                  </Grid>
                </TableCell>
              <TableCell>{row.money}</TableCell>
              <TableCell>
                  <Typography color="primary" variant="subtitle2">{row.Message_Info}</Typography>
                  {/* <Typography color="textSecondary" variant="body2">{row.company}</Typography> */}
                </TableCell>
              <TableCell><Typography color="primary" variant="subtitle2">{row.joinDate}</Typography></TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={USERS.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default MTable;
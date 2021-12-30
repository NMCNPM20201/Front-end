import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip
} from "@material-ui/core";
import useStyles from "../../styles";
<<<<<<< HEAD

=======
import './style.css';
>>>>>>> Hiep
const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};

export default function TableComponent({ data }) {
  const classes = useStyles();
  var keys = Object.keys(data[0]).map(i => i.toUpperCase());
  keys.shift(); // delete "id" key

  return (
<<<<<<< HEAD
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {keys.map(key => (
            <TableCell key={key}>{key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ id, name, bankingNum, date, money}) => (
          <TableRow key={id}>
            <TableCell className="pl-3 fw-normal">{name}</TableCell>
            <TableCell>{bankingNum}</TableCell>
            <TableCell>{date}</TableCell>
            <TableCell>{money}</TableCell>
=======
    <Table className="-mb0">
      <TableHead>
        <TableRow>
          
          <TableCell className="colorWord" >NAME ID MOMO</TableCell>
          <TableCell className="colorWord" >SUM MONEY</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ nameID_Momo, sumMoney}) => (
          <TableRow>
            <TableCell className="pl-3 fw-normal colorWord">{nameID_Momo}</TableCell>
            <TableCell className="colorWord">{sumMoney}</TableCell>
>>>>>>> Hiep
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

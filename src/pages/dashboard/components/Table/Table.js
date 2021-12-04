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
import './style.css';
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
    <Table className="-mb0">
      <TableHead>
        <TableRow>
          {keys.map(key => (
            <TableCell className="colorWord" key={key}>{key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ id, name, bankingNum, date, money}) => (
          <TableRow key={id}>
            <TableCell className="pl-3 fw-normal colorWord">{name}</TableCell>
            <TableCell className="colorWord">{bankingNum}</TableCell>
            <TableCell className="colorWord">{date}</TableCell>
            <TableCell className="colorWord">{money}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

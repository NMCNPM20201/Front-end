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
          
          <TableCell className="colorWord" >NAME ID MOMO</TableCell>
          <TableCell className="colorWord" >SUM MONEY</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ nameID_Momo, sumMoney}) => (
          <TableRow>
            <TableCell className="pl-3 fw-normal colorWord">{nameID_Momo}</TableCell>
            <TableCell className="colorWord">{sumMoney}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

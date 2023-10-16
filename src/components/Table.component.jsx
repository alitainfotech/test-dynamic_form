import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  TableHead,
} from "@mui/material";

const TableComponent = ({ tableData }) => {
  return tableData.rows.length === 0 ? (
    <>
      <Typography>No Data Found</Typography>
    </>
  ) : (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {tableData.column.map((item, index) => (
              <TableCell key={item}>{item}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.rows.map((item, index) => (
            <TableRow key={item}>
              {tableData.rows[index].map((cell, index) => (
                <TableCell key={cell + index}>
                  <Typography>{cell}</Typography>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;

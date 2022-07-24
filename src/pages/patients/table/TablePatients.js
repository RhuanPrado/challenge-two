import React from "react";

//import components
import TableHeadPatients from "./TableHeadPatients";
import TableRowsPatients from "./TableRowsPatients";
import { Paper, Table, TableContainer } from "@mui/material";

export default function TablePatients() {
    return (
        <div className="tablesPatients">
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 700 }} >
                    <TableHeadPatients />
                    <TableRowsPatients />
                </Table>
            </TableContainer>
        </div>
    )
}
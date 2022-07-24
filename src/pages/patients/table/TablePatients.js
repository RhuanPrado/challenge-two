import { Paper, Table, TableContainer } from "@mui/material";
import React from "react";
import TableHeadPatients from "./TableHeadPatients";
import TableRowsPatients from "./TableRowsPatients";

export default function TablePatients(){
    return(
        <div className="tablesPatients">
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 700 }} >
                    <TableHeadPatients/>
                    <TableRowsPatients/>
                </Table>
            </TableContainer>
        </div>
    )
}
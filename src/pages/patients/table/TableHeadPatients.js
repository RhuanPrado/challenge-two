import React from "react"
//import components
import { TableCell, TableHead, TableRow } from "@mui/material";

//Head values columns
const variations = [
    "Ações",
    "Nome",
    "Data de Nascimento",
    "Email",
    "Endereço"
]

export default function TableHeadPatients() {
    return (
        <TableHead>
            <TableRow>
                {variations.map((variation, index) => {
                    return (<TableCell key={index}><b>{variation}</b></TableCell>)
                })}
            </TableRow>
        </TableHead>
    );
}
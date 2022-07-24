import React from "react";

//import components
import NavPatients from "./NavPatients";
import TablePatients from "./table/TablePatients";

export default function Patients() {
    return (
        <>
            <NavPatients />
            <TablePatients />
        </>
    )
}
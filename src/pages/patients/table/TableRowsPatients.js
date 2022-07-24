import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

//import components
import { Button, TableBody, TableCell, TableRow } from "@mui/material";


export default function TableRowsPatients() {

    const [patients, setPatients] = useState([]);
    const history = useHistory()

    const getPatients = () => {
        axios({
            method: "GET",
            url: "https://951irjuwo2.execute-api.us-east-1.amazonaws.com/patients",
        }).then((response) => {
            setPatients([...response.data.Items])
        })
    }

    const alterPatients = (id) => {
        history.push(`/alter/${id}`)
    }

    const deletePatients = (patientDelete) => {
        axios({
            method: "DELETE",
            url: `https://951irjuwo2.execute-api.us-east-1.amazonaws.com/patients/${patientDelete.id}`,
        }).then(() => {
            setPatients(patients.filter((patient) => {
                if (patient.id != patientDelete.id)
                    return patient
            }))

        })
    }

    useEffect(() => {
        getPatients();
    }, [])

    return (
        <TableBody>
            {patients.length != 0 ?
                patients.map((patient, index) => {
                    let date = new Date(patient.birth)
                    return (
                        <TableRow key={index}>
                            <TableCell>
                                <Button onClick={(e) => alterPatients(patient.id)}>Alterar</Button>
                                <Button onClick={(e) => deletePatients(patient)}>Excluir</Button>
                            </TableCell>
                            <TableCell>{patient.name}</TableCell>
                            <TableCell>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</TableCell>
                            <TableCell>{patient.email}</TableCell>
                            <TableCell>{`${patient.address.street}-${patient.address.number}-${patient.address.complement}-${patient.address.city}-${patient.address.state}`}</TableCell>
                        </TableRow>
                    )
                })
                :
                <TableRow><TableCell>Não existe pacientes cadastrado</TableCell></TableRow>
            }
        </TableBody>
    )
}
import { Box} from "@mui/material";
import React from "react";

export default function Form(props) {
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            { props.children }
        </Box>
       

    )
}
import { Box, Button } from "@mui/material";
import React, { useState } from "react";


export default function NavButtons() {
	const [anchorElNav, setAnchorElNav] = useState(null);

    const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

    return (

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
            <Button
                key={"Lista de Pacientes"}
                onClick={handleCloseNavMenu}
                href = "/"
                sx={{ my: 2, color: 'white', display: 'block' }}
            >
                {"Lista de Pacientes"}
            </Button>

            <Button
                key={"Cadastrar"}
                onClick={handleCloseNavMenu}
                href = "/insert"
                sx={{ my: 2, color: 'white', display: 'block' }}
            >
                {"Cadastrar"}
            </Button>

        </Box>
    )
}
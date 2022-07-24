import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useHistory } from "react-router-dom";

export default function MenuButtons() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const history = useHistory()
    const handleCloseNavMenu = (alternative) => {
        setAnchorElNav(null);
        if(alternative){
            history.push("/insert")
        }else{
            history.push("/")
        }
    };

    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
            >
            
                <MenuItem key={"Lista de Pacientes"} onClick={(e)=>handleCloseNavMenu(false)}>
                    <Typography textAlign="center">{"Lista de Pacientes"}</Typography>
                </MenuItem>

                <MenuItem key={"Cadastrar"} onClick={(e)=>handleCloseNavMenu(true)} >
                    <Typography textAlign="center">{"Cadastrar"}</Typography>
                </MenuItem>

            </Menu>
        </Box>

    )
}
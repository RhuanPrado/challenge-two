import { Typography } from "@mui/material";
import React from "react";

export default function TypographyLogoXS(props) {
    return (
        <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
            }}
        >
            {props.children}
        </Typography>

    )
}
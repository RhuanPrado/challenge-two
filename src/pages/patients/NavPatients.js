import React from "react";

import { AppBar,Container, Toolbar } from "@mui/material";

import TypographyLogoMD from "../../components/TypografyLogoMD";
import TypographyLogoXS from "../../components/TypografyLogoXS";
import MenuButtons from "../../components/MenuButtons";
import NavButtons from "../../components/NavButtons";



export default function NavPatients() {

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<TypographyLogoMD>
						PATIENTS - CRUD
					</TypographyLogoMD>

					<MenuButtons/>
					
					<TypographyLogoXS>
						PATIENTS - CRUD
					</TypographyLogoXS>

					<NavButtons/>

				</Toolbar>
			</Container>
		</AppBar >
	)
}
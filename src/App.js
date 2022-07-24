import React from "react";
import './App.css';

import {
	BrowserRouter as Router,
	Route,
	Switch,
} from "react-router-dom";

import history from "./components/history";
import Patients from "./pages/patients/Patients";
import InsertPatients from "./pages/patients/editor/InsertPatients";
import AlterPatients from "./pages/patients/editor/alterPatients";

export default function App() {
	return (
		<Router history={history}>
			<Switch>
				<Route exact path="/" component={Patients} />
				<Route exact path="/insert" component={InsertPatients} />
				<Route exact path="/alter/:id" component={AlterPatients} />
			</Switch>
		</Router>
	);
}


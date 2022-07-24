import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

//import components
import { Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CloseIcon from '@mui/icons-material/Close';
import NavPatients from "../NavPatients";
import IconButton from '@mui/material/IconButton';

//auxiliar file
import { brazilianStates } from '../../../utils/generalUtils'
import moment from "moment";

export default function AlterPatients(props) {

	//data struct patient
	const [id, setId] = useState(0);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [birth, setBirth] = useState(moment.now());
	const [street, setStreet] = useState("");
	const [number, setNumber] = useState("");
	const [complement, setComplement] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");

	const [register, setRegister] = useState(false)
	const history = useHistory();

	const handleChange = (newValue) => {

		if (newValue != null && newValue != undefined)
			setBirth(newValue._d.getTime());
	};

	const getId = (id) => {
		axios({
			method: "GET",
			url: `https://951irjuwo2.execute-api.us-east-1.amazonaws.com/patients/${id}`,
		}).then((response) => {
			setId(response.data.Item.id)
			setName(response.data.Item.name)
			setBirth(response.data.Item.birth)
			setEmail(response.data.Item.email)
			setNumber(response.data.Item.address.number.toString())
			setCity(response.data.Item.address.city)
			setComplement(response.data.Item.address.complement)
			setStreet(response.data.Item.address.street)
			setState(response.data.Item.address.state)
		})
	}

	const insertPatient = () => {
		axios({
			method: "POST",
			url: "https://951irjuwo2.execute-api.us-east-1.amazonaws.com/patients",
			data: {
				id,
				name,
				birth,
				email,
				address: {
					street,
					number,
					complement,
					city,
					state
				}
			}
		}).then(() => {
			setRegister(true)

		}).catch((error) => {
			console.error(error)
		})

	}

	useEffect(() => {
		getId(props.match.params.id);
	}, [])

	useEffect(() => {
		if (register) {
			setName("")
			setBirth(moment.now())
			setEmail("")
			setNumber("")
			setCity("")
			setComplement("")
			setStreet("")
			setState("")
			history.push("/")
		}
	}, [register])


	return (
		<>
			<NavPatients />

			<Alert severity="warning"
				action={
					<IconButton
						aria-label="close"
						color="inherit"
						size="small"
						onClick={() => {
							setRegister(false);
						}}
					>
						<CloseIcon fontSize="inherit" />
					</IconButton>
				}

			>Alterando Paciente</Alert>
			<FormControl className="grid center-items">
				<div className="form-div">
					<TextField
						disabled={register}
						style={{ marginBottom: 10, marginLeft: 10, marginRight: 10 }}
						required
						id="outlined-required"
						label="Nome"
						value={name}
						onChange={(e) => setName(e.target.value.toString())}
					/>
					<TextField
						style={{ marginBottom: 10, marginLeft: 10, marginRight: 20 }}
						disabled={register}
						required
						id="outlined-required"
						label="E-Mail"
						value={email}
						onChange={(e) => setEmail(e.target.value.toString())}
					/>

					<LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={moment.locale('pt-br')} >
						<DatePicker
							disabled={register}
							label="Data de Nascimento"
							value={new moment(birth)}
							onChange={handleChange}
							renderInput={(params) => <TextField {...params} />}
						/>
					</LocalizationProvider>



					<TextField
						disabled={register}
						style={{ margin: 10 }}
						required
						id="outlined-required"
						label="Endereço"
						value={street}
						onChange={(e) => setStreet(e.target.value.toString())}
					/>

					<TextField
						disabled={register}
						style={{ margin: 10 }}
						required
						id="outlined-required"
						label="Número"
						value={number}
						onChange={(e) => setNumber(e.target.value.toString())}
					/>


					<TextField
						disabled={register}
						style={{ margin: 10 }}
						required
						id="outlined-required"
						label="Cidade"
						value={city}
						onChange={(e) => setCity(e.target.value.toString())}
					/>
					<FormControl fullWidth style={{ margin: 10 }}>
						<InputLabel id="select-label">Estado</InputLabel>
						<Select
							disabled={register}
							labelId="select-label"
							id="select"
							value={state}
							label="Estado"
							onChange={(e) => setState(e.target.value.toString())}
						>
							{brazilianStates.map((item, index) => {
								return (
									<MenuItem key={index} value={item.value}>{item.label}</MenuItem>
								)
							})}
						</Select>
					</FormControl>


					<TextField
						disabled={register}
						style={{ margin: 10 }}
						required
						fullWidth
						id="outlined-required"
						label="Complemento"
						value={complement}
						onChange={(e) => setComplement(e.target.value.toString())}
					/>


					<Button disabled={register} variant="contained" onClick={(e) => insertPatient()}> Alterar Paciente</Button>
				</div>
			</FormControl>

		</>
	)
}
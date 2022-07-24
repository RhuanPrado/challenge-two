import { Alert, Button, Collapse, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import IconButton from '@mui/material/IconButton';
import axios from "axios";
import moment from "moment-jalaali";
import {brazilianStates} from '../../../utils/generalUtils'
import React, { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import NavPatients from "../NavPatients";


export default function InsertPatients() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [birth, setBirth] = useState(moment.now());
	const [id, setId] = useState(0);
	const [street, setStreet] = useState("");
	const [number, setNumber] = useState("");
	const [complement, setComplement] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [register, setRegister] = useState(false)
	moment.locale('pt-br')

	const handleChange = (newValue) => {
        if(newValue != null && newValue != undefined)
		    setBirth(newValue._d.getTime());
	};

	const getId = () => {
		axios({
			method: "GET",
			url: "https://951irjuwo2.execute-api.us-east-1.amazonaws.com/patients",
		}).then((response) => {
			
			let idMax = 0
			if (response.data.Items.length != 0) {
				response.data.Items.map((item, index) => {
					if (index == 0)
						idMax = item.id


					if (idMax < item.id)
						idMax = item.id
				})
			} else {
				setId(0)
			}
		})
	}

	const insertPatient = (e) => {
		e.preventDefault();
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
		getId();
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
			getId()
		}
	}, [register])


	return (
		<>
			<NavPatients />
			<Collapse in={register}>

				<Alert severity="success"
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

				>Cadastrado com sucesso</Alert>
			</Collapse>
			<form onSubmit={e => insertPatient(e)} className="grid center-items">
				<div className="form-div">
						<TextField
							disabled={register}
							style={{ marginBottom: 10 , marginLeft:10 , marginRight: 10 }}
							required
							id="outlined-required"
							label="Nome"
							value={name}
							onChange={(e) => setName(e.target.value.toString())}
						/>
						<TextField
							style={{ marginBottom: 10 , marginLeft:10 ,marginRight: 20 }}
							disabled={register}
							required
							id="outlined-required"
							label="E-Mail"
							value={email}
							onChange={(e) => setEmail(e.target.value.toString())}
						/>
					
						<LocalizationProvider  dateAdapter={AdapterMoment} adapterLocale={moment.locale('pt-br')} >
							<DatePicker
								openTo="year"
								views={['year', 'month', 'day']}
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
							onChange={(e)=> setState(e.target.value.toString())}
						>
							{brazilianStates.map((item,index)=>{
								return(
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


					<Button disabled={register} variant="contained" type="submit"> Cadastrar </Button>
				</div>	
			</form>

		</>
	)
}
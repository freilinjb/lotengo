import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import useConsorcio from 'app/hooks/useConsorcio';
import useTerminal from 'app/hooks/useTerminal';
import useGeneral from 'app/hooks/useGeneral';
import Swal from 'sweetalert2';

import {
    Button,
    Icon,
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
    TextField,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    Avatar,
} from '@material-ui/core'
import 'date-fns'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        maxWidth: '500px',
    },
}))

export default function TerminalRegistroModal({
    open,
    setOpen,
    terminalActualizar,
}) {
    const { actualizarTerminar, registrarTerminal, getTerminales } = useConsorcio();
    const {  } = useTerminal();
    const { getCiudades, ciudades } = useGeneral()
    const [age, setAge] = React.useState('');
    useEffect(() => {
        getCiudades();
    }, []);

    const [state, setState] = useState({
        idConsorcio: 0,
        nombre: '',
        slogan: '',
        mensajeCreacionJugada: '',
        correo: '',
        telefono: '',
        ciudad: '',
        sector: '',
        direccion: '',
        status: '1',
    });

    useEffect(() => {
        if (Object.keys(terminalActualizar).length !== 0) {
            console.log('actualizando: ', terminalActualizar)
            setState({
                ...state,
                idConsorcio: terminalActualizar.idConsorcio,
                nombre: terminalActualizar.nombre,
                slogan: terminalActualizar.slogan,
                mensajeCreacionJugada: terminalActualizar.mensajeCreacionJugada,
                correo: terminalActualizar.correo,
                telefono: terminalActualizar.telefono,
                sector: terminalActualizar.nombre,
                direccion: terminalActualizar.nombre,
                status: terminalActualizar.estado.toString(),
            });
        } else {
            setState({
                ...state,
                idConsorcio: 0,
                nombre: '',
                slogan: '',
                mensajeCreacionJugada: '',
                correo: '',
                telefono: '',
                ciudad: '',
                sector: '',
                direccion: '',
                status: '1',
            });
            console.log('registrando: ', terminalActualizar);
        }
    }, [terminalActualizar]);

    const handleSubmit = async (event) => {
        // event.preventDefault()
        // console.log('ejecutando metodo submit');
        // return;
        let codigo = 0;
        if(state.idTerminal > 0) {
            codigo = await actualizarTerminar(state);
        } else {
            codigo = await registrarTerminal(state);
        }

        console.log('codigo: ', codigo);
        if (codigo === 200) {
            Swal.fire('Good job!', 'You clicked the button!', 'success').then(
                (result) => {
                    if (result.isConfirmed) {
                        setOpen(false)
                        getTerminales()
                    }
                }
            )
        }
    }

    const handleChange = (event) => {
        // event.persist();
        console.log('nombre: ', event.target.name)
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const handleDateChange = (date) => {
        setState({ ...state, date })
    }

    const classes = useStyles()

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                style={{ zIndex: 100 }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">
                            <Grid container>
                            <Avatar
                                                    style={{
                                                        height: '40px',
                                                        width: '40px',
                                                        marginRight: '10px'
                                                    }}
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs03_SqIWGSw_H6T1YJCvhn1zR3oAsL41JHuE69BCCLsxFKHP1PdpMcqPc9A9kYdWpsFU&usqp=CAU"
                                                />
                                                Registro de Terminal
                            </Grid>
                        
                        </h2>
                        <hr />
                        <div className="p-4 h-full">
                            <ValidatorForm
                                onSubmit={handleSubmit}
                                noValidate
                                autoComplete="off"
                                onError={() => null}
                            >
                                
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        onChange={handleChange}
                                        >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>

                                        <TextValidator
                                            required
                                            className="mb-4 w-full"
                                            label="nombre"
                                            onChange={handleChange}
                                            type="text"
                                            name="nombre"
                                            value={state.nombre || ''}
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                            validators={[
                                                'required',
                                            ]}
                                            errorMessages={['Este campo es obligatorio']}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextValidator
                                            required
                                            className="mb-4 w-full"
                                            label="Slogan"
                                            onChange={handleChange}
                                            type="text"
                                            name="slogan"
                                            value={state.slogan || ''}
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                            validators={[
                                                'required',
                                            ]}
                                            errorMessages={['this field is required']}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>

                                        <TextValidator
                                            required
                                            className="mb-4 w-full"
                                            label="Slogan"
                                            onChange={handleChange}
                                            type="text"
                                            name="mensajeCreacionJugada"
                                            value={state.mensajeCreacionJugada || ''}
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                            validators={[
                                                'required',
                                            ]}
                                            errorMessages={['this field is required']}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextValidator
                                            required
                                            className="mb-4 w-full"
                                            label="correo"
                                            onChange={handleChange}
                                            type="text"
                                            name="correo"
                                            value={state.correo || ''}
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    <TextValidator
                                            required
                                            className="mb-4 w-full"
                                            label="correo"
                                            onChange={handleChange}
                                            type="text"
                                            name="telefono"
                                            value={state.telefono || ''}
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Autocomplete
                                            name="ciudad"
                                            onError="asdfa"

                                            options={ciudades}
                                            onChange={(event, newValue) => {
                                                if (newValue !== null) {
                                                    setState({
                                                        ...state,
                                                        ciudad: newValue.idCiudad,
                                                    })
                                                    console.log(
                                                        'valores: ',
                                                        state
                                                    )
                                                }
                                            }}
                                            getOptionLabel={(option) =>
                                                option.ciudad
                                            }
                                            renderOption={(option) =>
                                                option.ciudad
                                            }
                                            size="small"
                                            renderInput={(params) => (
                                                <TextField
                                                    name="ciudad"
                                                    {...params}
                                                    label="Ciudad"
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Autocomplete
                                            name="sector"
                                            options={ciudades}
                                            onChange={(event, newValue) => {
                                                if (newValue !== null) {
                                                    setState({
                                                        ...state,
                                                        ciudad: newValue.idCiudad,
                                                    })
                                                    console.log(
                                                        'valores: ',
                                                        state
                                                    )
                                                }
                                            }}
                                            getOptionLabel={(option) =>
                                                option.ciudad
                                            }
                                            renderOption={(option) =>
                                                option.ciudad
                                            }
                                            size="small"
                                            renderInput={(params) => (
                                                <TextField
                                                    name="sector"
                                                    size="small"
                                                    {...params}
                                                    label="Sector"
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextValidator
                                            required
                                            className="mb-4 w-full"
                                            label="Dirección"
                                            onChange={handleChange}
                                            type="text"
                                            name="direccion"
                                            value={state.direccion || ''}
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                            validators={[
                                                'required',
                                            ]}
                                            errorMessages={['Este campo es obligatorio']}
                                        />
                                    </Grid>

                                    <Grid container xs={12} justifyContent="space-between">
                                        <RadioGroup
                                            className="mb-4"
                                            value={state.status || ''}
                                            name="status"
                                            onChange={handleChange}
                                            row
                                        >
                                            <FormControlLabel
                                                value="1"
                                                control={
                                                    <Radio color="secondary" />
                                                }
                                                label="Activo"
                                                labelPlacement="end"
                                            />
                                            <FormControlLabel
                                                value="0"
                                                control={
                                                    <Radio color="secondary" />
                                                }
                                                label="Inactivo"
                                                labelPlacement="end"
                                            />
                                        </RadioGroup>

                                        
                                        <Button
                                            component="label"
                                            style={{padding: '5px'}}
                                            >
                                            Subir imagen
                                            <input
                                                type="file"
                                                hidden
                                            />
                                            </Button>
                                    </Grid>

                                    </Grid>
    

                                    <Button
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                    >
                                        <Icon>save</Icon>
                                        <span className="pl-2 capitalize">
                                            Guardar
                                        </span>
                                    </Button>
                            </ValidatorForm>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

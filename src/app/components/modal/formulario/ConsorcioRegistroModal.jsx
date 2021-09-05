import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import useConsorcio from 'app/hooks/useConsorcio'
import useGeneral from 'app/hooks/useGeneral'
import Swal from 'sweetalert2'

import {
    Button,
    Icon,
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
    TextField,
    Card,
    CardContent,
    CardMedia,
    Paper,
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

export default function ConsorcioRegistroModal({
    open,
    setOpen,
    consorcioActualizar,
}) {
    const { saludar, registrarConsorcio, mensajeConsorcio, getConsorcios } =
        useConsorcio()
    const { getCiudades, ciudades } = useGeneral()

    useEffect(() => {
        getCiudades()
    }, [])

    const [state, setState] = useState({
        idConsorcio: 0,
        nombre: '',
        slogan: '',
        mensajeDespedida: '',
        correo: '',
        telefono: '',
        ciudad: '',
        sector: '',
        direccion: '',
        status: '1',
    })
    useEffect(() => {
        if (Object.keys(consorcioActualizar).length !== 0) {
            console.log('actualizando: ', consorcioActualizar)
            setState({
                ...state,
                idConsorcio: consorcioActualizar.idConsorcio,
                nombre: consorcioActualizar.nombre,
                slogan: consorcioActualizar.slogan,
                mensajeDespedida: consorcioActualizar.mensajeTicket,
                correo: consorcioActualizar.correo,
                telefono: consorcioActualizar.telefono,
                sector: consorcioActualizar.nombre,
                direccion: consorcioActualizar.nombre,
                status: consorcioActualizar.estado.toString(),
            })
        } else {
            setState({
                ...state,
                idConsorcio: 0,
                nombre: '',
                slogan: '',
                mensajeDespedida: '',
                correo: '',
                telefono: '',
                ciudad: '',
                sector: '',
                direccion: '',
                status: '1',
            })
            console.log('registrando: ', consorcioActualizar)
        }
    }, [consorcioActualizar])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const codigo = await registrarConsorcio(state)
        console.log('codigo: ', codigo)
        if (codigo === 200) {
            Swal.fire('Good job!', 'You clicked the button!', 'success').then(
                (result) => {
                    if (result.isConfirmed) {
                        setOpen(false)
                        getConsorcios()
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
                            Registro de Consorcio
                        </h2>
                        <hr />
                        <Card
                            border="light"
                            className="bg-white shadow-sm mb-4"
                        >
                            <div className="d-xl-flex align-items-center">
                                <div className="user-avatar xl-avatar">
                                    <CardMedia>
                                        <Avatar
                                            style={{
                                                height: '90px',
                                                width: '90px',
                                            }}
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs03_SqIWGSw_H6T1YJCvhn1zR3oAsL41JHuE69BCCLsxFKHP1PdpMcqPc9A9kYdWpsFU&usqp=CAU"
                                        />
                                    </CardMedia>
                                </div>
                                <CardContent>
                                    <div className="file-field">
                                        <div className="d-flex justify-content-xl-center ms-xl-3">
                                            <div className="d-flex">
                                                <Button
                                                    variant="contained"
                                                    component="label"
                                                >
                                                    <Icon>upload</Icon>
                                                    Subir Logo
                                                    <input type="file" hidden />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </div>
                        </Card>

                        <div className="p-4 h-full">
                            <form
                                onSubmit={handleSubmit}
                                noValidate
                                autoComplete="off"
                            >
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            variant="outlined"
                                            size="small"
                                            id="nombre"
                                            name="nombre"
                                            label="Nombre"
                                            value={state.nombre}
                                            fullWidth
                                            autoComplete="given-name"
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="slogan"
                                            variant="outlined"
                                            size="small"
                                            value={state.slogan}
                                            name="slogan"
                                            label="Slogan"
                                            fullWidth
                                            autoComplete="family-name"
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            variant="outlined"
                                            size="small"
                                            value={state.mensajeDespedida}
                                            id="mensajeDespedida"
                                            name="mensajeDespedida"
                                            label="Mensaje de Despedida"
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            variant="outlined"
                                            size="small"
                                            id="correo"
                                            name="correo"
                                            label="Correo electronico"
                                            value={state.correo}
                                            fullWidth
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            id="telefono"
                                            name="telefono"
                                            label="Numero telefonico"
                                            value={state.telefono}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Autocomplete
                                            name="ciudad"
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
                                                    {...params}
                                                    label="Sector"
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            // helperText="Incorrect entry."
                                            variant="outlined"
                                            size="small"
                                            value={state.direccion}
                                            id="direccion"
                                            name="direccion"
                                            value={state.direccion}
                                            onChange={handleChange}
                                            label="Direccion"
                                            fullWidth
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
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
                                </Grid>
                            </form>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

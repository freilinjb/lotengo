import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import {
    ValidatorForm,
    TextValidator,
} from 'react-material-ui-form-validator'
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
    const { actualizarConsorcio, registrarConsorcio, getConsorcios } =
        useConsorcio()
    const { getCiudades, ciudades } = useGeneral()

    useEffect(() => {
        getCiudades()
    }, [])

    const [state, setState] = useState({
        idConsorcio: 0,
        nombre: '',
        slogan: '',
        mensajeCreacionJugada: '',
        mensajeCancelacionJugada: '',
        mensajeJugadaPremiada: '',
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
                mensajeCreacionJugada:
                    consorcioActualizar.mensajeCreacionJugada,
                mensajeCancelacionJugada:
                    consorcioActualizar.mensajeCancelacionJugada,
                mensajeJugadaPremiada:
                    consorcioActualizar.mensajeJugadaPremiada,
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
                mensajeCreacionJugada: '',
                mensajeCancelacionJugada: '',
                mensajeJugadaPremiada: '',
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
        // event.preventDefault()
        // console.log('ejecutando metodo submit');
        // return;
        let codigo = 0
        if (state.idConsorcio > 0) {
            // alert('Actualizando');
            // return;
            codigo = await actualizarConsorcio(state)
        } else {
            // alert('Registrando');
            // return;
            codigo = await registrarConsorcio(state)
        }

        console.log('codigo: ', codigo)
        if (codigo === 200) {
            Swal.fire('Confirmación!', 'Se ha actualizado de forma correcta!', 'success').then(
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

    const classes = useStyles()

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
                                        marginRight: '10px',
                                    }}
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs03_SqIWGSw_H6T1YJCvhn1zR3oAsL41JHuE69BCCLsxFKHP1PdpMcqPc9A9kYdWpsFU&usqp=CAU"
                                />
                                Registro de Consorcio
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
                                    <Grid item xs={6}>
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
                                            validators={['required']}
                                            errorMessages={[
                                                'Este campo es obligatorio',
                                            ]}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
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
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <TextValidator
                                            required
                                            className="mb-4 w-full"
                                            label="Mensaje de Creacion de la Jugada"
                                            onChange={handleChange}
                                            type="text"
                                            name="mensajeCreacionJugada"
                                            value={
                                                state.mensajeCreacionJugada ||
                                                ''
                                            }
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                        />

                                        <TextValidator
                                            required
                                            className="mb-4 w-full"
                                            label="Mensaje de anulacion de la jugada"
                                            onChange={handleChange}
                                            type="text"
                                            name="mensajeCancelacionJugada"
                                            value={
                                                state.mensajeCancelacionJugada ||
                                                ''
                                            }
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                        />

                                        <TextValidator
                                            required
                                            className="mb-4 w-full"
                                            label="Mensaje de jugada premiada"
                                            onChange={handleChange}
                                            type="text"
                                            name="mensajeJugadaPremiada"
                                            value={
                                                state.mensajeJugadaPremiada ||
                                                ''
                                            }
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                        />
                                    </Grid>

                                    <Grid container spacing={2}>
                                    <Grid item xs={6}>
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
                                            validators={['required']}
                                            errorMessages={[
                                                'Este campo es obligatorio',
                                            ]}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextValidator
                                            required
                                            className="mb-4 w-full"
                                            label="telefono"
                                            onChange={handleChange}
                                            type="text"
                                            name="telefono"
                                            value={state.telefono || ''}
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                            validators={['required']}
                                            errorMessages={[
                                                'Este campo es obligatorio',
                                            ]}
                                        />
                                    </Grid>
                                </Grid>
                                    {/* <Grid container spacing={2}>
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
                                    </Grid> */}

                                    <Grid container spacing={2}>
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
                                            validators={['required']}
                                            errorMessages={[
                                                'Este campo es obligatorio',
                                            ]}
                                        />
                                    </Grid>
                                    </Grid>
                                    

                                    <Grid
                                        container
                                        xs={12}
                                        justifyContent="space-between"
                                    >
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
                                            style={{ padding: '5px' }}
                                        >
                                            Subir imagen
                                            <input type="file" hidden />
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

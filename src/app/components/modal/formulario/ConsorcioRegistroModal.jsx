import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import useConsorcio from 'app/hooks/useConsorcio'
import Swal from 'sweetalert2';

import {
    Button,
    Icon,
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
    Checkbox,
    TextField,
    File
} from '@material-ui/core'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'

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

export default function ConsorcioRegistroModal({ open, setOpen }) {
    const { saludar, registrarConsorcio, mensajeConsorcio, getConsorcios } = useConsorcio()


    const [state, setState] = useState({
        nombre: "",
        slogan: "",
        mensajeDespedida: "",
        correo: "",
        telefono: "",
        ciudad: "",
        sector: "",
        direccion: "",
        status: "1",
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        const codigo = await registrarConsorcio(state);
        console.log('codigo: ', codigo);
        if(codigo === 200) {
            Swal.fire(
                'Good job!',
                'You clicked the button!',
                'success'
              ).then((result) => {
                  if(result.isConfirmed) {
                    setOpen(false);
                  }
              })
        }
    }

    const handleChange = (event) => {
        // event.persist();
        console.log('evento: ', event.target.value);
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const handleDateChange = (date) => {
        setState({ ...state, date });
    }

    const classes = useStyles()

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
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
                style={{zIndex: 100}}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">
                            Registro de Consorcio
                        </h2>
                        <hr/>
                        <div className="p-4 h-full">
                            <form onSubmit={handleSubmit} noValidate autoComplete="off">
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
                                        <TextField
                                            required
                                            variant="outlined"
                                            size="small"
                                            id="ciudad"
                                            name="ciudad"
                                            label="Ciudad"
                                            value={state.ciudad}
                                            onChange={handleChange}
                                            fullWidth
                                            autoComplete=""
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            variant="outlined"
                                            size="small"
                                            id="sector"
                                            name="sector"
                                            label="sector"
                                            value={state.sector}
                                            onChange={handleChange}
                                            fullWidth
                                            autoComplete="shipping country"
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
                                    <input
                                        accept="image/*"
                                        className={classes.input}
                                        style={{ display: 'none' }}
                                        onChange={handleChange}
                                        id="raised-button-file"
                                        type="file"
                                        />
                                        <label htmlFor="raised-button-file">
                                        <Button  color="primary" component="span" className={classes.button}
                                            variant="contained"
                                            onChange={handleChange}
                                        >
                                            Subig Logo
                                        </Button>
                                        </label> 

                                        <p>{state.foto}</p>
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
                                            control={<Radio color="secondary" />}
                                            label="Activo"
                                            labelPlacement="end"
                                        />
                                        <FormControlLabel
                                            value="0"
                                            control={<Radio color="secondary" />}
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

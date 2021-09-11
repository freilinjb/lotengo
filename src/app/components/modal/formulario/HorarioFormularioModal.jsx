import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Autocomplete } from '@material-ui/lab';
import useHorario from 'app/hooks/useHorario';
import Swal from 'sweetalert2';

import {
    Button,
    Icon,
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
    TextField,
    Avatar,
} from '@material-ui/core'
import 'date-fns';

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

export default function HorarioFormularioModal({
    open,
    setOpen,
    horarioActualizar,
}) {
    const { actualizarHorario, registrarHorario, getHorarios } = useHorario()


    const [state, setState] = useState({
        idHorario: 0,
        diaDesde: '2',
        diaHasta: 3,
        horaInicio: '07:00',
        horaFinal: '12:00',
        status: '1',
    })

    const diasSemana = [
        {
            id: 1,
            label: 'Lunes',
        },
        {
            id: 2,
            label: 'Martes',
        },
        {
            id: 3,
            label: 'Miercoles',
        },
        {
            id: 4,
            label: 'Jueves',
        },
        {
            id: 5,
            label: 'Viernes',
        },
        {
            id: 6,
            label: 'Sabado',
        },
        {
            id: 7,
            label: 'Domingo',
        },
    ]
    useEffect(() => {
        if (Object.keys(horarioActualizar).length !== 0) {
            console.log('actualizando: ', horarioActualizar)
            setState({
                ...state,
                idHorario: horarioActualizar.idHorario,
                diaDesde: horarioActualizar.diaDesde,
                diaHasta: horarioActualizar.diaHasta.toString(),
                horaInicio: horarioActualizar.horaDesde.substr(0,6).trim(),
                horaFinal: horarioActualizar.horaHasta.substr(0,6).trim(),
                status: (horarioActualizar.estado === 'Activo') ? '1' : '0',
            });
        } else {
            setState({
                ...state,
                idHorario: 0,
                diaDesde: '',
                diaHasta: '',
                horaInicio: '07:00',
                horaFinal: '12:00',
                status: '1',
            })
            console.log('registrando: ', horarioActualizar)
        }
    }, [horarioActualizar])

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log('ejecutando metodo submit: ', state);
        // return;

        let codigo = 0
        // if (state.idHorario > 0) {
        //     // alert('Actualizando');
        //     // return;
        //     codigo = await actualizarHorario(state)
        // } else {
        //     // alert('Registrando');
        //     // return;
        //     codigo = await registrarHorario(state)
        // }

        let data = (state.idHorario > 0) ? await actualizarHorario(state) : await registrarHorario(state);
        console.log('DataSADFASDF: ', data);
        
        Swal.fire('Good job!', `${data.msg}!`, `${data.success ? "success" : "error"}`).then(
            (result) => {
                if (result.isConfirmed) {
                    setOpen(!data.success)
                    getHorarios()
                }
            }
        )
       
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
                                        marginRight: '10px',
                                    }}
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs03_SqIWGSw_H6T1YJCvhn1zR3oAsL41JHuE69BCCLsxFKHP1PdpMcqPc9A9kYdWpsFU&usqp=CAU"
                                />
                                {state.idHorario > 0
                                    ? 'Actualizacion de Horario'
                                    : 'Registro de Horario'}
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
                                        <TextValidator
                                            required
                                            className="mb-4 w-full"
                                            label="Hora de Inicio"
                                            onChange={handleChange}
                                            type="time"
                                            name="horaInicio"
                                            value={state.horaInicio || ''}
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextValidator
                                            required
                                            className="mb-4 w-full"
                                            label="Hora de Cierre"
                                            onChange={handleChange}
                                            type="time"
                                            name="horaFinal"
                                            value={state.horaFinal || ''}
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Autocomplete
                                            name="diaDesde"
                                            options={diasSemana}
                                            defaultValue={diasSemana.find(v => v.id == state.diaDesde)}
                                            onChange={(event, newValue) => {
                                                if (newValue !== null) {
                                                    setState({
                                                        ...state,
                                                        diaDesde: newValue.id,
                                                    })
                                                    console.log(
                                                        'valores: ',
                                                        state
                                                    )
                                                }
                                            }}
                                            getOptionLabel={(option) =>
                                                option.label
                                            }
                                            renderOption={(option) =>
                                                option.label
                                            }
                                            size="small"
                                            renderInput={(params) => (
                                                <TextField
                                                    name="diaDesde"
                                                    {...params}
                                                    label="Desde"
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Autocomplete
                                            name="diaHasta"
                                            options={diasSemana}
                                            defaultValue={diasSemana.find(v => v.id == state.diaHasta)}
                                            onChange={(event, newValue) => {
                                                if (newValue !== null) {
                                                    setState({
                                                        ...state,
                                                        diaHasta: newValue.id,
                                                    })
                                                    console.log(
                                                        'valores: ',
                                                        state
                                                    )
                                                }
                                            }}
                                            getOptionLabel={(option) =>
                                                option.label
                                            }
                                            renderOption={(option) =>
                                                option.label
                                            }
                                            size="small"
                                            renderInput={(params) => (
                                                <TextField
                                                    name="diaHasta"
                                                    size="small"
                                                    {...params}
                                                    label="Hasta"
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
                                            validators={['required']}
                                            errorMessages={[
                                                'Este campo es obligatorio',
                                            ]}
                                        />
                                    </Grid>

                                    <Grid
                                        container
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

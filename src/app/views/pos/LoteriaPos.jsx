import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import {
    Button,
    Icon,
    Grid,
    Card,
    CardActions,
    Typography,
    Box,
    CardContent,
    FormControlLabel,
    Checkbox,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import SimpleCheckbox from 'app/views/material-kit/checkbox/SimpleCheckbox'
import LabelledCheckbox from 'app/views/material-kit/checkbox/LabelledCheckbox'
import LoteriaCheckBox from 'app/components/formulario/LoteriaCheckBox'
import PlacingCheckboxLabel from 'app/views/material-kit/checkbox/PlacingCheckboxLabel'
import FormGroupCheckbox from 'app/views/material-kit/checkbox/FormGroupCheckbox'
import { Breadcrumb, SimpleCard } from 'app/components'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(2),
    },
}))

const LoteriaPos = () => {
    const [state, setState] = useState({
        numeros: '',
        montoApostar: 0,
        tipoJugada: ''
    });

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    )

    return (
        <div className="m-sm-30">
            <Grid container justifyContent="around">
                <Grid item lg={6}>
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Loteria - admin', path: '/loteria/admin' },
                            { name: 'Loteria POS' },
                        ]}
                    />
                </div>
                </Grid>
                <Grid item lg={6}>
                    <div className="">Banca: <span style={{ border: '1px solid gray', padding: '5px'}}> BANCA PRUEBA</span> </div>
                </Grid>
            </Grid>
            

            <div className="" />
            <SimpleCard title="Checkbox with Label">
                <ValidatorForm>
                    <Grid container>
                        <Grid item lg={12} sm={12} xs={12} className="pb-5">
                            <LoteriaCheckBox />
                        </Grid>
                        <Grid item lg={8} sm={12} xs={12}>
                            <Grid container spacing={6}>
                                <Grid item lg={5} sm={5} xs={5}>
                                    <TextValidator
                                        className="mb-4 w-full"
                                        label="Numeros"
                                        onChange={handleChange}
                                        type="text"
                                        name="numeros"
                                        value={state.numeros || ''}
                                        placeholder="Ingrese la jugada que va a realizar"
                                        variant="outlined"
                                        fullWidth
                                        // size="small"
                                    />
                                    <label>Prueba de mensaje</label>
                                </Grid>
                                <Grid item lg={5} sm={5} xs={5}>
                                    <TextValidator
                                        className="mb-4 w-full"
                                        label="Monto de apuesta"
                                        onChange={handleChange}
                                        type="text"
                                        name="nombre"
                                        placeholder="Ingrese el monto de la apuesta"
                                        value={state.montoApostar || ''}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item lg={2} sm={2} xs={2}>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                        className="mt-3"
                                    >
                                        <Icon>send</Icon>
                                        <span className="pl-2 capitalize">
                                            Registrar
                                        </span>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            lg={3}
                            sm={6}
                            xs={12}
                            style={{ marginLeft: '40px' }}
                        >
                            <Card
                                sx={{ minWidth: 275 }}
                                className="elevation-z14"
                            >
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Precio Por Jugadas
                                    </Typography>
                                    <hr />
                                    <Typography
                                        variant="text-14"
                                        component="div"
                                    >
                                        Precio Quiniela 
                                        <span>$54654.00</span>
                                    </Typography>
                                    <Typography
                                        variant="text-14"
                                        component="div"
                                    >
                                        Precio Pale <span>$54654.00</span>
                                    </Typography>
                                    <Typography
                                        variant="text-14"
                                        component="div"
                                    >
                                        Precio Tripleta <span>$54654.00</span>
                                    </Typography>
                                </CardContent>
                            </Card>

                            <Card
                                sx={{ minWidth: 275 }}
                                className="elevation-z14 mt-3"
                            >
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Totales
                                    </Typography>
                                    <hr />
                                    <Typography
                                        sx={{ mb: 1.5 }}
                                        color="text.secondary"
                                    >
                                        Total Quiniela
                                    </Typography>
                                    <Typography
                                        sx={{ mb: 1.5 }}
                                        color="text.secondary"
                                    >
                                        Total Pane
                                    </Typography>
                                    <Typography
                                        sx={{ mb: 1.5 }}
                                        color="text.secondary"
                                    >
                                        Total Tripleta
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </ValidatorForm>
            </SimpleCard>
            <div className="py-3" />
        </div>
    )
}

export default LoteriaPos

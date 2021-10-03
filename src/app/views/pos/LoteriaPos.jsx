import React, { useState, useEffect } from 'react'

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
import JugadasTabla from 'app/components/tablas/JugadasTabla'
import { Breadcrumb, SimpleCard } from 'app/components'
import usePOS from 'app/hooks/usePOS'

const LoteriaPos = () => {
    const { getJuegosLoteria, juegosLoterias } = usePOS()

    const [stateJuegos, setStateJuegos] = useState({})
    const [state, setState] = useState({
        numeros: '',
        montoApostar: 0,
        tipoJugada: '',
    })
    const [jugadas, setJugadas] = useState([])

    useEffect(() => {
        getJuegosLoteria()
    }, [])

    useEffect(() => {
        const data = {}

        if (juegosLoterias !== undefined && juegosLoterias.length > 0) {
            juegosLoterias.forEach((key, index) => {
                key.juegos.forEach((key2, index2) => {
                    data[`juego_${key2.idJuego}`] = false
                })
            })

            setStateJuegos(data)
        }
    }, [juegosLoterias])

    const handleChange = (event) => {
        const valor = String(event.target.value).replaceAll('-', '').trim()

        let tipo = null
        let numeros = null
        const longitud = valor.length

        if (event.target.name === 'numeros') {
            if (longitud > 0 && longitud <= 2) {
                tipo = 'QUINIELA'
                numeros = String(valor).substring(0, longitud)
            } else if (longitud > 2 && longitud <= 4) {
                tipo = 'PALE'
                numeros =
                    String(valor).substring(0, 2) +
                    '-' +
                    String(valor).substring(2, longitud)
            } else if (longitud > 4 && longitud <= 6) {
                tipo = 'TRIPLETA'
                numeros =
                    String(valor).substring(0, 2) +
                    '-' +
                    String(valor).substring(2, 4) +
                    '-' +
                    String(valor).substring(4, 6)
            }

            event.persist()
            setState({
                ...state,
                [event.target.name]: numeros,
                tipoJugada: tipo,
            })

        } else {
            numeros = valor
            event.persist()
            setState({
                ...state,
                [event.target.name]: Number(numeros),
            })
        }
    }

    const confirmarJugadas = () => {

        const verificacion = document.querySelectorAll('.loteria');
        const loteriaTemp = [];
        const juegoTemp = [];
        verificacion.forEach((key, index) => {
            if(document.getElementById(key.getAttribute('data-nombre')).checked) {
                if(!loteriaTemp.includes(Number(key.getAttribute('data-idLoteria')))) {
                    loteriaTemp.push(Number(key.getAttribute('data-idLoteria')));
                } 
                const idJuego = Number(String(key.getAttribute('data-idJuego').substring(6, key.getAttribute('data-idJuego').length)));

                if(!juegoTemp.includes(idJuego)) {
                    juegoTemp.push(idJuego);
                }

                // document.getElementById(key.getAttribute('data-nombre')).click();
            }
        });
        setJugadas([...jugadas, {
            numeros: state.numeros,
            montoApostar: state.montoApostar,
            tipoJugada: state.tipoJugada,
            loterias: loteriaTemp,
            juegos: juegoTemp
        }]);

        console.log('prueba');
        setState({
            numeros: '10-56-55',
            montoApostar: 100,
            tipoJugada: 'TRIPLETA',
            loterias: loteriaTemp,
            juegos: juegoTemp
        });

        // console.log(Object.keys(stateJuegos).map((key) => [(key), stateJuegos[key] === true]));

        // document.getElementById('juego_13').parentNode.parentNode.getAttribute('data-idloteria')
        console.log('prueba: ', jugadas);
    }

    return (
        <div className="m-sm-30">
            <Grid container justifyContent="around">
                <Grid item lg={6}>
                    <div className="mb-sm-30">
                        <Breadcrumb
                            routeSegments={[
                                {
                                    name: 'Loteria - admin',
                                    path: '/loteria/admin',
                                },
                                { name: 'Loteria POS' },
                            ]}
                        />
                    </div>
                </Grid>
                <Grid item lg={6}>
                    <div className="">
                        Banca:{' '}
                        <span
                            style={{ border: '1px solid gray', padding: '5px' }}
                        >
                            {' '}
                            BANCA PRUEBA
                        </span>{' '}
                    </div>
                </Grid>
            </Grid>

            <div className="" />
            <SimpleCard title="Checkbox with Label">
                <ValidatorForm>
                    <Grid container>
                        <Grid item lg={12} sm={12} xs={12} className="pb-5">
                            {Object.keys(stateJuegos).length > 0 && (
                                <LoteriaCheckBox
                                    setStateJuegos={setStateJuegos}
                                    stateJuegos={stateJuegos}
                                    juegosLoterias={juegosLoterias}
                                />
                            )}
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
                                        validators={'required'}
                                        errorMessages={'Este campo es obligatorio'}
                                        // size="small"
                                    />
                                    <label>
                                        <strong>Tipo de Jugada:</strong>{' '}
                                        {state.tipoJugada}
                                    </label>
                                </Grid>
                                <Grid item lg={5} sm={5} xs={5}>
                                    <TextValidator
                                        className="mb-4 w-full"
                                        label="Monto de apuesta"
                                        onChange={handleChange}
                                        type="number"
                                        min="1"
                                        name="montoApostar"
                                        placeholder="Ingrese el monto de la apuesta"
                                        value={state.montoApostar || ''}
                                        variant="outlined"
                                        fullWidth
                                        validators={'required'}
                                        errorMessages={'Este campo es obligatorio'}
                                    />
                                </Grid>
                                <Grid item lg={2} sm={2} xs={2}>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                        className="mt-3"
                                        onClick={() => confirmarJugadas()}
                                    >
                                        <Icon>send</Icon>
                                        <span className="pl-2 capitalize">
                                            Registrar
                                        </span>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* GENERAR LAS TABLAS */}
                    <JugadasTabla />
                </ValidatorForm>
            </SimpleCard>
            <div className="py-3" />
        </div>
    )
}

export default LoteriaPos

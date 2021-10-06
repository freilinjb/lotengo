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
    const [loterias, setLoterias] = useState([])
    const [state, setState] = useState({
        numeros: '',
        montoApostar: 0,
        tipoJugada: '',
    })
    const [jugadas, setJugadas] = useState([]);
    const [juegos, setJuegos] = useState([]);

    useEffect(() => {
        getJuegosLoteria()
    }, [])

    useEffect(() => {
        console.log('cambio la loteria: ', loterias);
    },[loterias]);

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
        const estado = [];
        verificacion.forEach((key, index) => {
            const verificacion = document.getElementById(key.getAttribute('data-nombre')).checked;
            if(verificacion) {
                const idLoteria = Number(key.getAttribute('data-idLoteria'));
                // console.log('verificacion: ', (loteriaTemp.filter((f => f.idLoteria === idLoteria)).length === 0));
                const lt = juegosLoterias.filter((f => f.idLoteria === idLoteria));
                console.log('prueba de eso: ', lt);

                if(estado.filter((f => f.idLoteria === idLoteria)).length === 0) {
                    // setLoterias([...loterias, {
                    //     idLoteria: idLoteria,
                    //     nombre: lt[0].nombre,
                    //     urlLogo: lt[0].urlLogo,
                    // }]);
                    estado.push({
                        idLoteria: idLoteria,
                        nombre: lt[0].nombre,
                        urlLogo: lt[0].urlLogo,
                    });
                }

                // console.log('estado: ', estado);


                // console.log('asdf asdf: ', loterias);

                if(loteriaTemp.filter((f => f.idLoteria === idLoteria)).length === 0) {
                    const lt = juegosLoterias.filter((f => f.idLoteria === idLoteria));
                    // console.log('filtrado: ', lt);

                    // return;
                    loteriaTemp.push({
                        idLoteria: idLoteria,
                        nombre: lt[0].nombre,
                        urlLogo: lt[0].urlLogo,
                    });
                } 
                const idJuego = Number(key.getAttribute('data-idJuego'));

                if(!juegoTemp.includes(idJuego)) {
                    juegoTemp.push(idJuego);
                }

                // document.getElementById(key.getAttribute('data-nombre')).click();
            }
        });

        

        const temp = loterias;

        console.log('antes: ', temp);
        estado.forEach((key, index) => {
            if(temp.filter((f => f.idLoteria === key.idLoteria)).length === 0) {
                temp.push({
                    idLoteria: key.idLoteria,
                    nombre: key.nombre,
                    urlLogo: key.urlLogo
                });
            }
        });

        console.log('despues: ', temp);


        setLoterias(temp);
        console.log('asdfasdf: ', estado);
        setJugadas([...jugadas, {
            numeros: state.numeros,
            montoApostar: state.montoApostar,
            tipoJugada: state.tipoJugada,
            loterias: loteriaTemp,
            juegos: juegoTemp
        }]);

        console.log('jugadas: ', loterias);
        setState({
            numeros: '10-56-55',
            montoApostar: 100,
            tipoJugada: 'TRIPLETA',
        });

        // console.log(Object.keys(stateJuegos).map((key) => [(key), stateJuegos[key] === true]));

        // document.getElementById('juego_13').parentNode.parentNode.getAttribute('data-idloteria')
        // console.log('prueba: ', jugadas);
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
                <ValidatorForm
                    id="formularioJugada"
                    onSubmit={(e) => {
                        e.preventDefault();

                        console.log('submit');
                    }}
                >
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
                                        style={{fontSize: '30px'}}
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
                    <JugadasTabla juegosLoterias={juegosLoterias} jugadas={jugadas} loterias={loterias}/>
                </ValidatorForm>
            </SimpleCard>
            <div className="py-3" />
        </div>
    )
}

export default LoteriaPos

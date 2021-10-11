import React, { useState, useEffect } from 'react'

import { Button, Icon, Grid, ButtonGroup } from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import LoteriaCheckBox from 'app/components/formulario/LoteriaCheckBox'
import JugadasTabla from 'app/components/tablas/JugadasTabla'
import { Breadcrumb, SimpleCard } from 'app/components'
import usePOS from 'app/hooks/usePOS'

const LoteriaPos = () => {
    const { getJuegosLoteria, juegosLoterias } = usePOS()

    const [stateJuegos, setStateJuegos] = useState({})
    const [loterias, setLoterias] = useState([])
    const [numeros, setNumeros] = useState('')
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

    const verificarTipoJugada = (valor) => {
        valor = String(valor).replaceAll('-', '').trim()
        const longitud = valor.length
        // let tipo = null
        // let numeros = null
        const datos = { tipo: null, numeros: null }
        if (longitud > 0 && longitud <= 2) {
            datos.tipo = 'QUINIELA'
            datos.numeros = String(valor).substring(0, longitud)
        } else if (longitud > 2 && longitud <= 4) {
            datos.tipo = 'PALE'
            datos.numeros =
                String(valor).substring(0, 2) +
                '-' +
                String(valor).substring(2, longitud)
        } else if (longitud > 4 && longitud <= 6) {
            datos.tipo = 'TRIPLETA'
            datos.numeros =
                String(valor).substring(0, 2) +
                '-' +
                String(valor).substring(2, 4) +
                '-' +
                String(valor).substring(4, 6)
        }

        return datos
    }
    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const confirmarJugadas = (e) => {
        e.preventDefault()

        const verificacion = document.querySelectorAll('.loteria')
        const juegoTemp = []
        const estado = []
        verificacion.forEach((key, index) => {
            const verificacion = document.getElementById(
                key.getAttribute('data-nombre')
            ).checked
            if (verificacion) {
                const idLoteria = Number(key.getAttribute('data-idjuego'))
                const urlLogo = key.getAttribute('data-urllogo')
                const juego = key.getAttribute('data-juego')

                if (
                    estado.filter((f) => f.idLoteria === idLoteria).length === 0
                ) {
                    estado.push({
                        idLoteria: idLoteria,
                        nombre: juego,
                        urlLogo: urlLogo,
                    })
                }
                const idJuego = Number(key.getAttribute('data-idjuego'))

                if (!juegoTemp.includes(idJuego)) {
                    juegoTemp.push(idJuego)
                }
            }
        })

        const temp = loterias

        estado.forEach((key, index) => {
            if (
                temp.filter((f) => f.idLoteria === key.idLoteria).length === 0
            ) {
                temp.push({
                    idLoteria: key.idLoteria,
                    nombre: key.nombre,
                    urlLogo: key.urlLogo,
                })
            }
        })

        setLoterias(temp)
        console.log('asdfasdf: ', estado)
        setJugadas([
            ...jugadas,
            {
                numeros: state.numeros,
                montoApostar: state.montoApostar,
                tipoJugada: state.tipoJugada,
                juegos: juegoTemp,
            },
        ])

        setState({
            numeros: '10-56-55',
            montoApostar: 100,
            tipoJugada: 'TRIPLETA',
        })
    }

    return (
        <div className="m-sm-30">
            <Grid container>
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
                </Grid>
                <ValidatorForm
                    id="formularioJugada"
                    onSubmit={confirmarJugadas}
                >
                    <Grid container>
                        <Grid item lg={8} sm={12} xs={12}>
                            <Grid container spacing={6}>
                                <Grid item lg={5} sm={5} xs={5}>
                                    <TextValidator
                                        // style={{fontSize: '30px'}}
                                        id="numerosLoterias"
                                        className="mb-4 w-full"
                                        label="Numeros"
                                        onChange={handleChange}
                                        type="text"
                                        name="numeros"
                                        value={
                                            verificarTipoJugada(state.numeros)
                                                .numeros
                                        }
                                        placeholder="Ingrese la jugada que va a realizar"
                                        variant="outlined"
                                        fullWidth
                                        autoFocus={true}
                                        validators={[
                                            'required',
                                            'maxStringLength: 9',
                                        ]}
                                        errorMessages={[
                                            'Este campo es obligatorio',
                                            'La cantidad maxima de caracteres!!',
                                        ]} // size="small"
                                    />
                                    <label>
                                        <strong>Tipo de Jugada:</strong>{' '}
                                        {
                                            verificarTipoJugada(state.numeros)
                                                .tipo
                                        }
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
                                        validators={['required']}
                                        errorMessages={[
                                            'Este campo es obligatorio',
                                        ]}
                                    />
                                </Grid>
                                <Grid item lg={2} sm={2} xs={2}>
                                    <ButtonGroup
                                        disableElevation
                                        variant="contained"
                                    >
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            type="submit"
                                            className="mt-3"
                                        >
                                            {' '}
                                            <Icon>add</Icon>
                                            Agregar
                                        </Button>
                                        <Button
                                            color="secondary"
                                            variant="contained"
                                            type="button"
                                            className="mt-3"
                                        >
                                            <Icon>print</Icon>
                                        </Button>
                                    </ButtonGroup>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* GENERAR LAS TABLAS */}
                    <JugadasTabla
                        jugadas={jugadas}
                        loterias={loterias}
                        key={'tablas_generadas'}
                    />
                </ValidatorForm>
            </SimpleCard>
            <div className="py-3" />
        </div>
    )
}

export default LoteriaPos

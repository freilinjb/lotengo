import React, { createContext, useReducer } from 'react';
import clienteAxios from '../config/axios';

const reducer = (state, action) => {
    switch (action.type) {
        case 'OBTENER_JUEGOS_LOTERIAS': {
            return {
                ...state,
                juegosLoterias: action.payload,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const TerminalContext = createContext({
    juegosLoteria: [],
    cargandoTerminal: [],
    mensajeTerminal: '',
})

export const POSProvider = ({ settings, children }) => {
    const [state, dispatch] = useReducer(reducer, [])

    const registrarLoteria = async (terminal) => {
        console.log('terminal: ', terminal)
        // return;
        return await clienteAxios
            .post('api/terminal', {
                idConsorcio: Number(terminal.consorcio),
                nombre: terminal.nombre,
                correo: terminal.correo,
                telefono: terminal.telefono,
                idCiudad: Number(terminal.ciudad),
                idSector: Number(terminal.sector),
                calle: terminal.telefono,
                casa: terminal.telefono,
                direccion: terminal.direccion,
                estado: Number(terminal.estado),
            })
            .then(async (response) => {
                const data = { success: null, msg: null }
                data.msg = response.data.msg
                data.success = response.data.success
                // console.log('registrarTerminal: ', response.data.success);
                // return;
                if (response.status) {
                    dispatch({
                        type: 'MENSAJE',
                        payload: 'Se ha registrado de forma correcta!!',
                    })
                }
                console.log('pruebaEnvio de datosL: ', data)
                return data;
            })
            .catch((error) => {
                console.log('Error: ', error)
                return 500
            })
    }

    const actualizarTerminar = async (terminal) => {
        console.log('Terminal: ', terminal)
        // return;
        return await clienteAxios
            .patch(`api/terminal/${terminal.idTerminal}`, {
                idConsorcio: Number(terminal.consorcio),
                nombre: terminal.nombre,
                correo: terminal.correo,
                telefono: terminal.telefono,
                idCiudad: Number(terminal.ciudad),
                idSector: Number(terminal.sector),
                calle: terminal.telefono,
                casa: terminal.telefono,
                direccion: terminal.direccion,
                estado: Number(terminal.estado),
            })
            .then(async (response) => {
                const data = { success: null, msg: null }
                data.msg = response.data.msg
                data.success = response.data.success
                // console.log('registrarTermianlRespuesta: ', response.data.success);
                // return;
                if (response.status) {
                    dispatch({
                        type: 'MENSAJE',
                        payload: 'Se ha actualizado de forma correcta!!',
                    })
                }
                console.log('pruebaEnvio de datosL: ', data)
                return data
            })
            .catch((error) => {
                console.log('Error: ', error)
                return 500
            })
    }

    const eliminarTerminalByID = async (idTerminal) => {
        console.log('terminal: ', idTerminal)
        return await clienteAxios
            .delete(`api/terminal/${idTerminal}`)
            .then(async (response) => {
                const data = { success: null, msg: null }
                data.msg = response.data.msg
                data.success = response.data.success
                if (response.status) {
                    dispatch({
                        type: 'MENSAJE',
                        payload: 'Se ha actualizado de forma correcta!!',
                    });
                }
                console.log('pruebaEnvio de datosL: ', data);
                return data;
            })
            .catch((error) => {
                console.log('Error: ', error)
                return 500
            })
    }

    const getTerminalByID = async (idTerminal) => {
        console.log('eliminarIdC: ', idTerminal)
        return await clienteAxios
            .get(`api/terminal/${idTerminal}`, {})
            .then(async (results) => {
                console.log('Eliminar: ', results.data)
                const datos = {
                    data: results.data.data,
                    success: results.data.success,
                }
                console.log('data despues: ', datos)
                return datos
            }).catch((error) => {
                console.log('Error: ', error);
            });
    }

    const getJuegosLoteria = async () => {
        await clienteAxios.get('api/loteria/juego',{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
        }).then((response) => {
            // console.log('getJuegosLoteria: ', response.data.data)
            const juegos = response.data.data
            dispatch({
                type: 'OBTENER_JUEGOS_LOTERIAS',
                payload: juegos,
            })
        })
    }

    const saludar = (nombre) => {
        console.log('Hola como estas Terminal' + nombre)
    }

    return (
        <TerminalContext.Provider
            value={{
                juegosLoterias: state.juegosLoterias,
                mensajeTerminal: state.mensajeTerminal,
                saludar,
                getJuegosLoteria,
                getTerminalByID,
                registrarLoteria,
                actualizarTerminar,
                eliminarTerminalByID,
            }}
        >
            {children}
        </TerminalContext.Provider>
    )
}

export default TerminalContext

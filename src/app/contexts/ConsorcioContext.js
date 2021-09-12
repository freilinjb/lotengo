import React, { createContext, useReducer } from 'react'
import clienteAxios from '../config/axios';

const reducer = (state, action) => {
    switch (action.type) {
        case 'OBTENER_CONSORCIOS': {
            return {
                ...state,
                consorcios: action.payload,
            }
        }
        case 'MENSAJE': {
            return {
                ...state,
                mensajeConsorcio: action.payload,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const ConsorcioContext = createContext({
    notifications: [],
    consorcios: [],
    cargandoConsorcios: [],
    mensajeConsorcio: '',
    // deleteNotification: () => {},
    // clearNotifications: () => {},
    // getNotifications: () => {},
    // createNotification: () => {},
})

export const ConsorcioProvider = ({ settings, children }) => {
    const [state, dispatch] = useReducer(reducer, [])

    const registrarConsorcio = async (consorcio) => {
        console.log('consorcio: ', consorcio);
        // return;
       return await clienteAxios.post('api/consorcio', {
            nombre: consorcio.nombre,
            slogan: consorcio.slogan,
            mensajeCreacionJugada: consorcio.mensajeCreacionJugada,
            mensajeCancelacionJugada: consorcio.mensajeCancelacionJugada,
            mensajeJugadaPremiada: consorcio.mensajeJugadaPremiada,
            telefono: consorcio.telefono,
            correo: consorcio.correo,
            direccion: consorcio.direccion,
            status: Number(consorcio.status),
        }).then(async (response) => {
            if(response.status) {
                dispatch({
                    type: 'MENSAJE',
                    payload: 'Se ha registrado de forma correcta!!',
                });

            }
            return response.status;
            
        }).catch((error) => {
            console.log('Error: ', error);
            return 500;
        });
    }

    const actualizarConsorcio = async (consorcio) => {
        console.log('consorcio: ', consorcio);
        // return;
       return await clienteAxios.put('api/consorcio', {
            idConsorcio: consorcio.idConsorcio,
            nombre: consorcio.nombre,
            slogan: consorcio.slogan,
            mensajeCreacionJugada: consorcio.mensajeCreacionJugada,
            mensajeCancelacionJugada: consorcio.mensajeCancelacionJugada,
            mensajeJugadaPremiada: consorcio.mensajeJugadaPremiada,
            telefono: consorcio.telefono,
            correo: consorcio.correo,
            direccion: consorcio.direccion,
            status: Number(consorcio.status),
        }).then(async (response) => {
            if(response.status) {
                dispatch({
                    type: 'MENSAJE',
                    payload: 'Se ha actualizado de forma correcta!!',
                });
            }
            return response.status;
            
        }).catch((error) => {
            console.log('Error: ', error);
            return 500;
        });
    }

    const eliminarConsorcioByID = async (idConsorcio) => {
        console.log('eliminarIdC: ', idConsorcio);
        return await clienteAxios.delete(`api/consorcio/${idConsorcio}`, {}).then( async (results) => {
            console.log('Eliminar: ', results.data);
            const datos = {msg: results.data.msg, success: results.data.success};
            console.log('data despues: ', datos);
            return datos;
        });
    }

    const getConsorcioByID = async (idConsorcio) => {
        console.log('idConsorcio: ', idConsorcio);
    }

    const getConsorcios = async (consorcio) => {
        await clienteAxios.get('api/consorcio').then((response) => {
            console.log('Respuesta: ', response.data.data);
            const consorcios = response.data.data;
            dispatch({
                type: 'OBTENER_CONSORCIOS',
                payload: consorcios,
            });

        }).finally(() => {

        });
        console.log('Desde consorcio: ', consorcio);

        
    }
    const saludar = (nombre) => {
        console.log('Hola como estas ' + nombre);
    }

    return (
        <ConsorcioContext.Provider
            value={{
                notifications: state.notifications,
                consorcios: state.consorcios,
                mensajeConsorcio: state.mensajeConsorcio,
                saludar,
                getConsorcios,
                getConsorcioByID,
                registrarConsorcio,
                actualizarConsorcio,
                eliminarConsorcioByID
            }}
        >
            {children}
        </ConsorcioContext.Provider>
    )
}

export default ConsorcioContext

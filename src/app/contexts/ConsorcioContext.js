import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios';
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
            mensajeTicket: consorcio.mensajeDespedida,
            telefono: consorcio.telefono,
            correo: consorcio.correo,
            direccion: consorcio.direccion,
            status: consorcio.status,
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
                registrarConsorcio
            }}
        >
            {children}
        </ConsorcioContext.Provider>
    )
}

export default ConsorcioContext

import React, { createContext, useReducer } from 'react'
import clienteAxios from '../config/axios';

const reducer = (state, action) => {
    switch (action.type) {
        case 'OBTENER_CIUDADES': {
            return {
                ...state,
                ciudades: action.payload,
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

const GeneralContext = createContext({
    ciudades: [],
    sectores: [],
    paises: [],
    cargandoGeneral: [],
    mensajeGeneral: '',
})

export const GeneralProvider = ({ settings, children }) => {
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

    const getCiudades = async () => {
       return await clienteAxios.get('api/general/ciudad').then((response) => {
            console.log('getCiudades: ', response.data.data);
            const ciudad = response.data.data;
            dispatch({
                type: 'OBTENER_CIUDADES',
                payload: ciudad,
            });

        }).finally(() => {

        });
    }
    const saludar = (nombre) => {
        console.log('Hola desde los generales ' + nombre);
    }

    return (
        <GeneralContext.Provider
            value={{
                ciudades: state.ciudades,
                sectores: state.sectores,
                paises: state.paises,
                mensajeConsorcio: state.mensajeConsorcio,
                saludar,
                getCiudades,
                getConsorcioByID,
                registrarConsorcio
            }}
        >
            {children}
        </GeneralContext.Provider>
    )
}

export default GeneralContext

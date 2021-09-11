import React, { createContext, useReducer } from 'react'
import clienteAxios from '../config/axios';

const reducer = (state, action) => {
    switch (action.type) {
        case 'OBTENER_HORARIOS': {
            return {
                ...state,
                horarios: action.payload,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const HorarioContext = createContext({
    horarios: [],
    cargandoHorarios: [],
    mensajeHorario: '',
})

export const HorarioProvider = ({ settings, children }) => {
    const [state, dispatch] = useReducer(reducer, [])

    const registrarHorario = async (horario) => {
        console.log('horario: ', horario);
        // return;
       return await clienteAxios.post('api/horario', {
            nombre: horario.nombre,
            mensajeTicket: horario.mensajeDespedida,
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

    const actualizarHorario = async (horario) => {
        console.log('horario: ', horario);
        // return;
       return await clienteAxios.put(`api/horario/${horario.idHorario}`, {
            nombre: horario.nombre,
            direccion: horario.direccion,
            status: horario.status,
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

    const eliminarHorarioByID = async (idHorario) => {
        console.log('eliminarIdC: ', idHorario);
        return await clienteAxios.delete(`api/horario/${idHorario}`, {}).then( async (results) => {
            console.log('Eliminar: ', results.data);
            const datos = {msg: results.data.msg, success: results.data.success};
            console.log('data despues: ', datos);
            return datos;
        });
    }

    const getHorarioByID = async (idHorario) => {
        console.log('idHorario: ', idHorario);
    }

    const getHorarios = async () => {
        await clienteAxios.get('api/horario').then((response) => {
            console.log('horario: ', response.data.data);
            const horario = response.data.data;
            dispatch({
                type: 'OBTENER_HORARIOS',
                payload: horario,
            });
        })
    }
    const saludar = (nombre) => {
        console.log('Hola como estas Horario' + nombre);
    }

    return (
        <HorarioContext.Provider
            value={{
                horarios: state.horarios,
                mensajeHorario: state.mensajeHorario,
                saludar,
                getHorarios,
                getHorarioByID,
                registrarHorario,
                actualizarHorario,
                eliminarHorarioByID
            }}
        >
            {children}
        </HorarioContext.Provider>
    )
}

export default HorarioContext

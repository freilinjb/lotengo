import React, { createContext, useReducer } from 'react';
import clienteAxios from '../config/axios';

const reducer = (state, action) => {
    switch (action.type) {
        case 'OBTENER_USUARIOS': {
            return {
                ...state,
                usuarios: action.payload,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const UsuarioContext = createContext({
    usuarios: [],
    cargandoUsuario: [],
    mensajeUsuario: '',
})

export const UsuarioProvider = ({ settings, children }) => {
    const [state, dispatch] = useReducer(reducer, [])

    const registrarUsuario = async (usuario) => {
        console.log('usuario: ', usuario)
        // return;
        return await clienteAxios
            .post('api/usuario/empleado', {
                diaDesde: usuario.diaDesde,
                diaHasta: usuario.diaHasta,
                horaDesde: usuario.horaInicio,
                horaHasta: usuario.horaFinal,
                estado: Number(usuario.status),
            })
            .then(async (response) => {
                const data = { success: null, msg: null }
                data.msg = response.data.msg
                data.success = response.data.success
                // console.log('usuario: ', response.data.success);
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

    const actualizarTerminar = async (usuario) => {
        console.log('usuario: ', usuario)
        // return;
        return await clienteAxios
            .put(`api/usuario/${usuario.idUsuario}`, {
                diaDesde: usuario.diaDesde,
                diaHasta: usuario.diaHasta,
                horaDesde: usuario.horaInicio,
                horaHasta: usuario.horaFinal,
                estado: Number(usuario.status),
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

    const eliminarUsuarioByID = async (idTerminal) => {
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

    const getUsuarioByID = async (idUsuario) => {
        console.log('eliminarIdC: ', idUsuario)
        return await clienteAxios
            .get(`api/usuario/${idUsuario}`, {})
            .then(async (results) => {
                console.log('Eliminar: ', results.data)
                const datos = {
                    msg: results.data.msg,
                    success: results.data.success,
                }
                console.log('data despues: ', datos)
                return datos
            })
    }

    const getUsuarios = async () => {
        await clienteAxios.get('api/usuario/empleado').then((response) => {
            console.log('terminal: ', response.data.data)
            const usuarios = response.data.data
            dispatch({
                type: 'OBTENER_USUARIOS',
                payload: usuarios,
            })
        })
    }
    const saludar = (nombre) => {
        console.log('Hola como estas Terminal' + nombre)
    }

    return (
        <UsuarioContext.Provider
            value={{
                usuarios: state.usuarios,
                mensajeUsuario: state.mensajeUsuario,
                saludar,
                getUsuarios,
                getUsuarioByID,
                registrarUsuario,
                actualizarTerminar,
                eliminarUsuarioByID,
            }}
        >
            {children}
        </UsuarioContext.Provider>
    )
}

export default UsuarioContext

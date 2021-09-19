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
        case 'OBTENER_ROLES': {
            return {
                ...state,
                roles: action.payload,
            }
        }
        
        default: {
            return { ...state }
        }
    }
}

const UsuarioContext = createContext({
    usuarios: [],
    cargandoUsuario: false,
    mensajeUsuario: '',
})

export const UsuarioProvider = ({ settings, children }) => {
    const [state, dispatch] = useReducer(reducer, [])

    const registrarUsuario = async (usuario) => {
        console.log('usuario: ', usuario)
        // return;
        return await clienteAxios
            .post('api/usuario/empleado', {
                usuario: usuario.usuario,
                idRol: Number(usuario.rol),
                clave: usuario.clave,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                apodo: usuario.apodo,
                correo: usuario.correo,
                telefono: usuario.telefono,
                idCiudad: Number(usuario.ciudad),
                idSector: Number(usuario.sector),
                calle: usuario.calle,
                direccion: usuario.direccion,
                observacion: usuario.observacion,
                estado: Number(usuario.estado),
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
                usuario: usuario.usuario,
                idRol: Number(usuario.rol),
                clave: usuario.clave,
                correo: usuario.correo,
                telefono: usuario.telefono,
                idCiudad: Number(usuario.ciudad),
                idSector: Number(usuario.sector),
                calle: usuario.calle,
                direccion: usuario.direccion,
                observacion: usuario.observacion,
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

    const eliminarUsuarioByID = async (idUsuario) => {
        console.log('idUsuario: ', idUsuario)
        return await clienteAxios
            .delete(`api/usuario/empleado/${idUsuario}`)
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

    const getRolesDeUsuarios = async () => {
       return await clienteAxios.get('api/usuario/rol').then((response) => {
            const roles = response.data.data
            dispatch({
                type: 'OBTENER_ROLES',
                payload: roles,
            })
            return roles;
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
                roles: state.roles,
                saludar,
                getUsuarios,
                getUsuarioByID,
                registrarUsuario,
                actualizarTerminar,
                eliminarUsuarioByID,
                getRolesDeUsuarios
            }}
        >
            {children}
        </UsuarioContext.Provider>
    )
}

export default UsuarioContext

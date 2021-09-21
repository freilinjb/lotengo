import React, { createContext, useEffect, useReducer } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios.js';
import { MatxLoading } from 'app/components';
// import { useHistory } from 'react-router';

import clienteAxios from '../config/axios';
import tokenAuth from '../config/token';


const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
    usuario: null,
    token: localStorage.getItem('token'),
    autenticado: null,
    nombre: null,
    master: null,
    mensajeUsuario: null,
}

const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false
    }

    const decodedToken = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000
    console.log(decodedToken)
    return decodedToken.exp > currentTime
}

const setSession = (accessToken) => {
    if (accessToken) {

        localStorage.setItem('token', accessToken)
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
        clienteAxios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`;
        
    } else {
        localStorage.removeItem('token')
        localStorage.removeItem('accessToken')
        delete axios.defaults.headers.common.Authorization
        delete clienteAxios.defaults.headers.common['authorization'];
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user, usuario } = action.payload
            console.log('payload: ', action.payload);
            console.log('isAuthenticated: ', isAuthenticated);

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
                usuario,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }

        case 'INICIAR_SESION': {
            const { usuario, user } = action.payload
            console.log('usuario: ', usuario);
            console.log('user: ', user);
            // return;

            return {
                ...state,
                isAuthenticated: true,
                user,
                usuario,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }

        case 'MENSAJE': {
            const { mensajeUsuario } = action.payload;

            return {
                ...state,
                mensajeUsuario
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => {},
    cerrarSesion: () => Promise.resolve(),
    iniciarSesion: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const iniciarSesion = async (usuario) => {
        console.log('Iniciando Sesion');
        await clienteAxios.post('/api/auth', { 
            usuario: usuario.usuario, 
            clave: usuario.clave
        }).then( async (response) => {
           console.log('respuesta: ', response.data);
           if(response.data.success === true) {
                const token = response.data.token;
                setSession(token);
                tokenAuth(`Bearer ${token}`);

                const usuario = {
                    master: response.data.data.master === 1 ? true : false,
                    usuario: response.data.data.usuario,
                    rol: response.data.data.rol,
                    nombre: response.data.data.nombre,
                    idUsuario: response.data.data.usuarioAutenticado,
                    avatar: '/assets/images/face-6.jpg',
                }

                dispatch({
                    type: 'INICIAR_SESION',
                    payload: {
                        usuario,
                    },
                })
           } else {
            dispatch({
                type: 'MENSAJE',
                payload: {
                    mensajeUsuario : response.data.msg,
                },
            })
           }

        }).catch((error) => {
            console.log('Error2222: ', error);
        })
    }

    const login = async (email, password) => {
        const response = await axios.post('/api/auth/login', {
            email,
            password,
        })
        const { accessToken, user } = response.data
        console.log('Resputasta2: ', response);
        setSession(accessToken)
        dispatch({
            type: 'LOGIN',
            payload: {
                user,
            },
        })
    }

    
    const cerrarSesion = () => {
        localStorage.removeItem('token');
        localStorage.setItem('logout', Date.now());
    }

    const saludar = nombre => console.log('Hola como estas Sr.', nombre);


    const register = async (email, username, password) => {
        const response = await axios.post('/api/auth/register', {
            email,
            username,
            password,
        })

        const { accessToken, user } = response.data

        setSession(accessToken)

        dispatch({
            type: 'REGISTER',
            payload: {
                user,
            },
        })
    }

    const logout = () => {
        setSession(null)
        dispatch({ type: 'LOGOUT' })
    }

    useEffect(() => {
        (async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken')
                console.log('accessToken: ', accessToken);
                // return;
                if (accessToken && isValidToken(accessToken)) {
                    setSession(accessToken)
                    // console.log('prueba1', accessToken);
                    let usuario = {};
                    // clienteAxios.defaults.headers.common['authorization'] = `Bearer ${token}`;
                    await clienteAxios.get('/api/auth').then((results) => {
                        console.log('resultados: ', results.data.data);
                        usuario = {
                            master: results.data.data.master === 1 ? true : false,
                            usuario: results.data.data.usuario,
                            rol: results.data.data.rol,
                            nombre: results.data.data.nombre,
                            idUsuario: results.data.data.usuarioAutenticado,
                            avatar: '/assets/images/face-6.jpg',
                        }
                    });
                    console.log('Usuario: ', usuario);

                    // const { user } = response.data
                    const user = {
                        avatar: '/assets/images/face-6.jpg',
                        email: 'freilinjb@gmail.com',
                        id: 1,
                        name: 'Freilin Jose Jerez',
                        role: 'GUEST',
                    }

                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            usuario,
                            // user,
                        },
                    })
                } else {
                    console.log('prueba2');

                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <MatxLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                register,
                cerrarSesion,
                iniciarSesion,
                saludar
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext

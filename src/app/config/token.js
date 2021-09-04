import clienteAxios from './axios';

const tokenAuth = token => {
    if(token) {
        clienteAxios.defaults.headers.common['authorization'] = token ? token : `Bearer ${localStorage.getItem('token')}`;
    } else {
        delete clienteAxios.defaults.headers.common['authorization'];
    }
}

export default tokenAuth;
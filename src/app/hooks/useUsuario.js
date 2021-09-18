import { useContext } from 'react';
import UsuarioContext from 'app/contexts/UsuarioContext';

const useUsuario = () => useContext(UsuarioContext);

export default useUsuario;

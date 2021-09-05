import { useContext } from 'react';
import GeneralContext from 'app/contexts/GeneralContext';

const useGeneral = () => useContext(GeneralContext);

export default useGeneral;

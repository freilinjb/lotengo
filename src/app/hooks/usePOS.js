import { useContext } from 'react'
import POSContext from 'app/contexts/POSContext'

const usePOS = () => useContext(POSContext);

export default usePOS

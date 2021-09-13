import { useContext } from 'react'
import TerminalContext from 'app/contexts/TerminalContext'

const useTerminal = () => useContext(TerminalContext);

export default useTerminal

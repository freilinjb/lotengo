import { useContext } from 'react'
import HorarioContext from 'app/contexts/HorarioContext'

const useHorario = () => useContext(HorarioContext)

export default useHorario

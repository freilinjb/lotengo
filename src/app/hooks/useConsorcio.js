import { useContext } from 'react'
import ConsorcioContext from 'app/contexts/ConsorcioContext'

const useConsorcio = () => useContext(ConsorcioContext)

export default useConsorcio

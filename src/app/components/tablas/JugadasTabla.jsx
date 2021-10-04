import React, {useEffect} from 'react'
import {
    Table,
    TableHead,
    TableCell,
    TableBody,
    IconButton,
    Icon,
    TableRow,
} from '@material-ui/core'

const subscribarList = [
    {
        name: 'john doe',
        date: '18 january, 2019',
        amount: 1000,
        status: 'close',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'kessy bryan',
        date: '10 january, 2019',
        amount: 9000,
        status: 'open',
        company: 'My Fintech LTD.',
    },
    {
        name: 'james cassegne',
        date: '8 january, 2019',
        amount: 5000,
        status: 'close',
        company: 'Collboy Tech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
]

const JugadasTable = ({juegosLoterias, jugadas}) => {
    const [datos, setDatos] = useState([])
    useEffect(() => {

        console.log('naruto1: ', jugadas);
        console.log('naruto2: ', juegosLoterias);

    },[juegosLoterias, jugadas]);

    const generarArreglo = () => {
        // if(juegosLoterias.length > 0) {
        //     juegosLoterias.forEach((key, index) => {
        //         jugadas.forEach((key2, index2) => {
        //             if(key.idLoteria === key.loterias) {
                        
        //             }
        //         });
        //     });
            
            
        // }

    }

    return (
        <div className="w-full overflow-auto">
            <Table className="whitespace-pre">
                <TableHead>
                    <TableRow>
                        <TableCell className="px-0">#</TableCell>
                        <TableCell className="px-0">Tipo de Jugada</TableCell>
                        <TableCell className="px-0">Numeros</TableCell>
                        <TableCell className="px-0">Monto</TableCell>
                        <TableCell className="px-0">Acción</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {subscribarList.map((subscriber, index) => (
                        <>
                        {index === 1  && (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    Hola Mundo
                                </TableCell>
                            </TableRow>
                        )}

                        <TableRow key={index}>
                            <TableCell className="px-0 capitalize" align="left">
                                {subscriber.name}
                            </TableCell>
                            <TableCell className="px-0 capitalize" align="left">
                                {subscriber.company}
                            </TableCell>
                            <TableCell className="px-0 capitalize" align="left">
                                {subscriber.date}
                            </TableCell>
                            <TableCell className="px-0 capitalize">
                                {subscriber.status}
                            </TableCell>
                            <TableCell className="px-0 capitalize">
                                ${subscriber.amount}
                            </TableCell>
                            <TableCell className="px-0">
                                <IconButton>
                                    <Icon color="error">close</Icon>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        </>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default JugadasTable

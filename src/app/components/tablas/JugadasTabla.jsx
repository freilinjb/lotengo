import React, {useEffect, useState} from 'react'
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

const JugadasTable = ({juegosLoterias, jugadas, loterias}) => {
    const [datos, setDatos] = useState([])
    useEffect(() => {

        // console.log('naruto1: ', jugadas);
        // console.log('naruto2: ', juegosLoterias);
        console.log('naruto: ', jugadas);

    },[jugadas]);

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
                    <TableRow style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                    }}>
                        <TableCell className="px-0">#</TableCell>
                        <TableCell className="px-0">Tipo de Jugada</TableCell>
                        <TableCell className="px-0">Numeros</TableCell>
                        <TableCell className="px-0">Monto</TableCell>
                        <TableCell className="px-0">Acción</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loterias.map((key, index) => (
                        <>
                         <TableRow key={index}>
                                <TableCell colSpan={5}>
                                    <img src={key.urlLogo} alt="Logo de la Loteria" 
                                        style={{width: 65, heigth: 65}}
                                    />
                                    {key.nombre}
                                </TableCell>
                            </TableRow>

                            {jugadas.map((key2, index2) => (
                                <TableRow>
                                    <TableCell><p>{index+1}</p></TableCell>
                                    <TableCell>{key.tipoJugada}</TableCell>
                                    <TableCell>{key2.numeros}</TableCell>
                                    <TableCell> $RD {key2.montoApostar}</TableCell>
                                </TableRow>
                            ))}
{/* 
                        <TableRow key={index}>
                            <TableCell className="px-0 capitalize" align="left">
                                {key.name}
                            </TableCell>
                            <TableCell className="px-0 capitalize" align="left">
                                {key.company}
                            </TableCell>
                            <TableCell className="px-0 capitalize" align="left">
                                {key.date}
                            </TableCell>
                            <TableCell className="px-0 capitalize">
                                {key.status}
                            </TableCell>
                            <TableCell className="px-0 capitalize">
                                ${key.amount}
                            </TableCell>
                            <TableCell className="px-0">
                                <IconButton>
                                    <Icon color="error">close</Icon>
                                </IconButton>
                            </TableCell>
                        </TableRow> */}
                        </>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default JugadasTable

import React from 'react'
import {
    Table,
    TableHead,
    TableCell,
    TableBody,
    IconButton,
    Icon,
    TableRow,
    TableContainer,
    Paper,
    TextField
} from '@material-ui/core'

const JugadasTable = ({ jugadas, loterias }) => {

    return (
        <div className="w-full overflow-auto">
            <TableContainer component={Paper}>
                <Table
                    className="whitespace-pre"
                    sx={{ minWidth: 650 }}
                    size="small"
                    aria-label="Jugadas"
                >
                    <TableHead>
                        <TableRow
                            style={{
                                fontSize: 24,
                                fontWeight: 'bold',
                            }}
                            key={'h2s'}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell className="px-0">#</TableCell>
                            <TableCell className="px-0">
                                Tipo de Jugada
                            </TableCell>
                            <TableCell className="px-0">Numeros</TableCell>
                            <TableCell className="px-0">Monto</TableCell>
                            <TableCell className="px-0">Acción</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loterias.map((key, index) => (
                            <>
                                <TableRow
                                    key={index}
                                    key={'h2s'}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell
                                        colSpan={5}
                                        style={{ verticalAlign: 'center' }}
                                        // align="center"
                                    >
                                        <div
                                            style={{
                                                width: '30%',
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <img
                                                src={key.urlLogo}
                                                alt="Logo de la Loteria"
                                                style={{
                                                    width: 65,
                                                    heigth: 65,
                                                }}
                                            />
                                            <span>
                                                <strong>
                                                    {' '}
                                                    - ({key.nombre})
                                                </strong>
                                            </span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                                {jugadas.map((key2, index2) => {
                                    // console.log('veficicacion: ', key2.juegos);
                                    const verificar = key2.juegos.includes(
                                        key.idLoteria
                                    )
                                    return (
                                        verificar && (
                                            <TableRow
                                                key={index2 + '-' + index}
                                                sx={{
                                                    '&:last-child td, &:last-child th':
                                                        { border: 0 },
                                                }}
                                            >
                                                <TableCell>
                                                    <p>{index + 1}</p>
                                                </TableCell>
                                                <TableCell>
                                                    {key2.tipoJugada}
                                                </TableCell>
                                                <TableCell>
                                                    {key2.numeros}
                                                </TableCell>
                                                <TableCell>
                                                    {' '}
                                                    {/* $RD {key2.montoApostar} */}
                                                    <TextField label="Monto" variant="outlined" value={key2.montoApostar} size="small"/>
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        color="primary"
                                                        aria-label="delete"
                                                    >
                                                        <Icon>delete</Icon>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )
                                })}
                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default JugadasTable

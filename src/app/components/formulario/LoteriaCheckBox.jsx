import React, { useEffect, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import { ScrollingCarousel, Carousel } from '@trendyol-js/react-carousel'
import {
    Button,
    Icon,
    Grid,
    FormGroup,
    Card,
    CardActions,
    Typography,
    Box,
    CardHeader,
    Avatar,
    CardContent,
    FormControlLabel,
    Checkbox,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from '@material-ui/core'
import usePOS from 'app/hooks/usePOS'

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />)

export default function LoteriaCheckBox({stateJuegos, juegosLoterias}) {
    // const { getJuegosLoteria, juegosLoterias } = usePOS()

    const [state, setState] = React.useState(stateJuegos)
    const [cargado, setCargado] = React.useState(false)


    useEffect(() => {
        // getJuegosLoteria()
        // console.log('prueba, ');
    }, [])

    // useEffect(() => {
    //     // console.log('se modifico: ', juegosLoterias)
    //     const data = {};
        
    //     if(juegosLoterias !== undefined && juegosLoterias.length > 0) {
    //         juegosLoterias.forEach((key, index) => {
    //             key.juegos.forEach((key2, index2) => {
    //                 // console.log('prueba...', key2);
    //                 // data.push({
    //                 //     [`juego_${key2.idJuego}`]: true
    //                 // });
    //                 data[`juego_${key2.idJuego}`] = false;
    //                 // setState({
    //                 //     ...state,
    //                 //     [`juego_${key2.idJuego}`]: true,
    //                 // })
    //             });
    //         });

    //         // console.log('prueba: ', data);
    //         setState(data);
    //         setCargado(true);
    //     }
        

    // }, [juegosLoterias])

    const handleChange = (name) => (event) => {
        console.log('name: ', name);
        setState({ ...state, [name]: event.target.checked })
    }

    const handleChange2 = (event) => {
        setCargado(false);

        // console.log('nombre: ', String(event.target.name).substring(6,event.target.name.length));
        // console.log('valor: ', event.target.checked);
        setState({
          ...state,
          [event.target.name]: event.target.checked,
        });
      };

      useEffect(() => {
        // setCargado(false);

        // console.log('actualizo');
        setCargado(true);

      }, [state])

      const FormCheck = ({j, index}) => {
        //   console.log('prueba: ', j);
        //   console.log('prueba: ', index);
          return (
            <FormControlLabel
                key={j.idJuego+'-'+index+'-'}
                data-idLoteria={j.idLoteria} 
                control={<Checkbox 
                        checked={state[`juego_${j.idJuego}`]} 
                        name={`juego_${j.idJuego}`} 
                        id={`juego_${j.idJuego}`} 
                        data-idJuego={`juego_${j.idJuego}`} 
                        data-nombre={`juego_${j.idJuego}`} 
                        data-idLoteria={j.idLoteria} 
                        className="loteria" 
                        onChange={handleChange2}/>}
                label={j.nombre}
            />
          )
      }

    return (
        <>
            {(juegosLoterias !== undefined && (cargado)) && (
                <>

                <Carousel show={4} slide={4} swiping={true}>
                    {juegosLoterias.map((p, index) => (
                        <Card sx={{ maxWidth: 345 }} key={p.idLoteria+'-'+index}>
                            <CardHeader
                                avatar={
                                    <img
                                        // sx={{ width: 56, heigth: 56 }}
                                        style={{ width: 56, heigth: 56 }}
                                        aria-label="recipe"
                                        alt={p.nombre}
                                        src={p.urlLogo}
                                    />
                                }
                                title={p.nombre}
                            ></CardHeader>
                            <CardContent>
                                {p.juegos.length > 0 && (
                                    <FormGroup key={p.idLoteria + '_'+index}>
                                        {p.juegos.map((j, index2) => {
                                            return (    
                                                <FormCheck j={j} index={index} key={j.idLoteria+'_'+index2}/>
                                        )})}
                                    </FormGroup>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </Carousel>
                </>
            )}

            {/* <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar
                                sx={{ width: 56, heigth: 56 }}
                                aria-label="recipe"
                                alt="Logo loteria"
                                src="https://s3.amazonaws.com/cdn.conectate-new.com/wp-content/uploads/2019/07/16144531/Loteria-Nacional-Dominicana.jpg"
                            />
                        }
                        title="Loteka"
                    ></CardHeader>
                    <CardContent>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Juega + Pega +"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Gana Más"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Lotería Nacional"
                            />
                        </FormGroup>
                    </CardContent>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar
                                sx={{ width: 56, heigth: 56 }}
                                aria-label="recipe"
                                alt="Logo loteria"
                                src="https://s3.amazonaws.com/cdn.conectate-new.com/wp-content/uploads/2019/07/16144531/Loteria-Nacional-Dominicana.jpg"
                            />
                        }
                        title="Loteka"
                    ></CardHeader>
                    <CardContent>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Juega + Pega +"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Gana Más"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Lotería Nacional"
                            />
                        </FormGroup>
                    </CardContent>
                </Card> */}
        </>
    )
}

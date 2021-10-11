import React, { useEffect, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import {
    FormGroup,
    Card,
    CardHeader,
    CardContent,
    FormControlLabel,
    Checkbox,
} from '@material-ui/core'
// import usePOS from 'app/hooks/usePOS';

export default function LoteriaCheckBox({ stateJuegos, juegosLoterias }) {
    // const { getJuegosLoteria, juegosLoterias } = usePOS()

    const [state, setState] = React.useState(stateJuegos)
    const [juegos, setJuegos] = React.useState([])
    const [cargado, setCargado] = React.useState(false)

    const handleChange = (name) => (event) => {
        console.log('name: ', name)
        setState({ ...state, [name]: event.target.checked })
    }

    const handleChange2 = (event) => {
        // setCargado(false)

        // console.log('nombre: ', String(event.target.name).substring(6,event.target.name.length));
        // console.log('valor: ', event.target.checked);
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        })
    }

    useEffect(() => {
        // setCargado(false);

        // console.log('actualizo');
        if(!cargado) {
            // console.log('prueba');=
            setCargado(true)
        }
    }, [state]);

    const FormCheck = ({ j, index }) => {
        //   console.log('prueba: ', j);
        //   console.log('prueba: ', index);
        return (
            <FormControlLabel
                key={j.idJuego + '-' + index + '-'}
                // data-idLoteria={j.idLoteria}
                control={
                    <Checkbox
                        checked={state[`juego_${j.idJuego}`]}
                        name={`juego_${j.idJuego}`}
                        id={`juego_${j.idJuego}`}
                        data-idjuego={`${j.idJuego}`}
                        data-urllogo={`${j.urlLogo}`}
                        data-nombre={`juego_${j.idJuego}`}
                        data-idloteria={j.idLoteria}
                        data-juego={j.nombre}
                        className="loteria"
                        onChange={handleChange2}
                    />
                }
                label={j.nombre}
            />
        )
    }

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3, // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    }

    return (
        <>
            {cargado && (
                <>
                <Card
                    sx={{ maxWidth: 345 }}
                    style={{ maxHeight: 500 }}
                >
                    <Carousel
                            additionalTransfrom={0}
                            arrows
                            // autoPlaySpeed={3000}
                            centerMode={false}
                            className=""
                            containerClass="container-with-dots"
                            dotListClass=""
                            draggable
                            focusOnSelect={false}
                            infinite
                            itemClass=""
                            keyBoardControl
                            // minimumTouchDrag={80}
                            renderButtonGroupOutside={false}
                            renderDotsOutside={false}
                            responsive={{
                              desktop: {
                                breakpoint: {
                                  max: 3000,
                                  min: 1024
                                },
                                items: 3,
                                partialVisibilityGutter: 40
                              },
                              mobile: {
                                breakpoint: {
                                  max: 464,
                                  min: 0
                                },
                                items: 1,
                                partialVisibilityGutter: 30
                              },
                              tablet: {
                                breakpoint: {
                                  max: 1024,
                                  min: 464
                                },
                                items: 2,
                                partialVisibilityGutter: 30
                              }
                            }}
                            showDots={false}
                            sliderClass=""
                            slidesToSlide={1}
                            swipeable
                    >
                        {/* <Carousel show={4} slide={3} swiping={true}> */}
                        {juegosLoterias.map((p) => (
                            <Card key={p.nombre}>
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
                                        <FormGroup
                                            key={p.idLoteria}
                                        >
                                            {p.juegos.map((j, index2) => {
                                                return (
                                                    <FormCheck
                                                        j={j}
                                                        key={
                                                            j.idLoteria +
                                                            '_' +
                                                            index2
                                                        }
                                                    />
                                                )
                                            })}
                                        </FormGroup>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                        {/* </Carousel> */}
                     </Carousel> 
                    </Card>
                </>
            )}
        </>
    )
}

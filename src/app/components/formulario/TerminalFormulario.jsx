import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
    Button,
    Icon,
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
    Checkbox,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@material-ui/core';
import Swal from 'sweetalert2';

import 'date-fns';
import useTerminal from 'app/hooks/useTerminal'; 
import useConsorcio from 'app/hooks/useConsorcio'; 
import useGeneral from 'app/hooks/useGeneral'; 

const TerminalFormulario = () => {
    const { getTerminales, getTerminalByID, registrarTerminal, actualizarTerminar } = useTerminal();
    const { getConsorcios, consorcios  } = useConsorcio();
    const { getSectores, sectores, getCiudades, ciudades, getPais, paises } = useGeneral
    ();
    const { id } = useParams();
    const [state, setState] = useState({
        idTerminal: Number(id),
        nombre:'Banca #',
        consorcio:'55',
        telefono:'829-565-1255',
        correo:'freilinjb@gmail.com',
        pais:'1',
        ciudad:'1',
        sector:'1',
        direccion:'Villa Progreso, La Herradura, Edif13 Apt6A',
        observacion:'Prueba',
        estado: '1',
    });

    useEffect(() => {
        getPais();
        getSectores();
        getCiudades();
        getConsorcios();
        console.log('Actualizando la terminal: ', consorcios);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const consultarTerminal = async(idTerminal) => {

        const respuesta = await getTerminalByID(idTerminal);
        console.log('consultarTerminal: ', respuesta);

        if(Object.keys(respuesta).length !== 0) {
            console.log('prueba')
            setState({
                ...state,
                nombre: respuesta.data.nombre,  
                consorcio: respuesta.data.idConsorcio,  
                telefono: respuesta.data.telefono,  
                correo: respuesta.data.correo,  
                ciudad: String(respuesta.data.idCiudad),  
                sector: String(respuesta.data.idSector), 
                direccion: respuesta.data.direccion,  
                observacion: respuesta.data.observacion,  
                estado: String(respuesta.data.estado),  

            });
        }
    }
    useEffect(() => {
        if(id > 0) {
            consultarTerminal(id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id]);
    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            console.log(value)

            if (value !== state.password) {
                return false
            }
            return true
        })
        return () => ValidatorForm.removeValidationRule('isPasswordMatch')
    }, [state.password])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const respuesta = (id === undefined) ? await registrarTerminal(state) : await actualizarTerminar(state);

        console.log('handleSubmit: ', respuesta);

        Swal.fire('Good job!', `${respuesta.msg}!`, `${respuesta.success ? "success" : "error"}`).then(
            (result) => {
                if (result.isConfirmed) {
                    console.log('confirmado');
                    getTerminales();
                }
            }
        )
        
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    return (
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextValidator
                            className="mb-4 w-full"
                            label="Nombre"
                            onChange={handleChange}
                            type="text"
                            name="nombre"
                            value={state.nombre || ''}
                            variant="outlined"
                            fullWidth
                            size="small"
                            validators={[
                                'required',
                                'minStringLength: 4',
                                'maxStringLength: 20',
                            ]}
                            errorMessages={['Este campo es obligatorio','El minimo es 4 caracteres','El maximo es de 20 caracteres']}
                        />
                        <FormControl variant="outlined"
                                fullWidth
                                size="small"
                                style={{marginBottom: '15px'}}
                                required
                            >
                            <InputLabel id="consorcioLabel">Consorcio</InputLabel>
                            <Select
                            required
                            labelId="consorcioLabel"
                            id="consorcio"
                            value={state.consorcio}
                            name="consorcio"
                            onChange={handleChange}
                            label="Consorcio"
                            >
                                {consorcios !== undefined && (
                                    consorcios.filter(c => c.estado === 1).map((c => (
                                        // console.log('ConsolaConsorcio: ', c);
                                        <MenuItem value={c.idConsorcio}>{c.nombre}</MenuItem>
                                    ))))
                                }
                            </Select>
                        </FormControl>

                        <TextValidator
                            className="mb-4 w-full"
                            label="Telefono"
                            onChange={handleChange}
                            type="text"
                            name="telefono"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={state.telefono || ''}
                            // validators={['required']}
                            // errorMessages={['this field is required']}
                        />
                        <TextValidator
                            className="mb-4 w-full"
                            label="Correo"
                            onChange={handleChange}
                            type="correo"
                            name="correo"
                            value={state.correo || ''}
                            variant="outlined"
                            fullWidth
                            size="small"
                            validators={['isEmail']}
                            errorMessages={[
                                'email is not valid',
                            ]}
                        />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <FormControl variant="outlined"
                                fullWidth
                                size="small"
                                style={{marginBottom: '15px'}}
                            >
                            <InputLabel id="paisLabel">Pais</InputLabel>
                            <Select
                            labelId="paisLabel"
                            id="pais"
                            value={state.pais}
                            name="pais"
                            onChange={handleChange}
                            label="Pais"
                            >
                                {paises !== undefined && (
                                    paises.map((p => (
                                        // console.log('ConsolaConsorcio: ', c);
                                        <MenuItem value={p.idPais}>{p.pais}</MenuItem>
                                    ))))
                                }
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined"
                                fullWidth
                                size="small"
                                style={{marginBottom: '15px'}}
                            >
                            <InputLabel id="ciudadLabel">Ciudad</InputLabel>
                            <Select
                            labelId="ciudadLabel"
                            id="ciudad"
                            value={state.ciudad}
                            name="ciudad"
                            onChange={handleChange}
                            label="Ciudad"
                            >

                                {ciudades !== undefined && (
                                    ciudades.map((c => (
                                        // console.log('ConsolaConsorcio: ', c);
                                        <MenuItem value={c.idCiudad}>{c.ciudad}</MenuItem>
                                    ))))
                                }
                           
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined"
                                fullWidth
                                size="small"
                                style={{marginBottom: '15px'}}
                            >
                            <InputLabel id="sectorLabel">Sector</InputLabel>
                            <Select
                            labelId="sectorLabel"
                            id="sector"
                            value={state.sector}
                            name="sector"
                            onChange={handleChange}
                            label="sector"
                            >
                                {sectores !== undefined && (
                                    sectores.map((s => (
                                        // console.log('ConsolaConsorcio: ', c);
                                        <MenuItem value={s.idSector}>{s.sector}</MenuItem>
                                    ))))
                                }
                            {/* <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem> */}
                            </Select>
                        </FormControl>
                        <TextValidator
                            className="mb-4 w-full"
                            label="Dirección"
                            onChange={handleChange}
                            type="text"
                            name="direccion"
                            value={state.direccion || ''}
                            variant="outlined"
                            fullWidth
                            size="small"
                            validators={[
                                'required',
                                'minStringLength: 4',
                            ]}
                            errorMessages={['Este campo es obligatorio','El minimo es 4 caracteres']}
                        />
                    </Grid>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TextValidator
                            className="mb-4 w-full"
                            label="Observación"
                            onChange={handleChange}
                            type="text"
                            name="observacion"
                            value={state.observacion || ''}
                            variant="outlined"
                            fullWidth
                            size="small"
                        />

                        <FormControlLabel
                            control={<Checkbox />}
                            label="Utilizar un presupuesto separado del consorcio."
                        />
                        <RadioGroup
                            className="mb-4"
                            value={state.estado || ''}
                            name="estado"
                            onChange={handleChange}
                            row
                        >
                            <FormControlLabel
                                value="1"
                                control={<Radio color="secondary" />}
                                label="Activo"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="0"
                                control={<Radio color="secondary" />}
                                label="Inactivo"
                                labelPlacement="end"
                            />

                        </RadioGroup>
                    </Grid>
                <Button color="primary" variant="contained" type="submit">
                    <Icon>send</Icon>
                    <span className="pl-2 capitalize">Submit</span>
                </Button>
            </ValidatorForm>
    )
}

export default TerminalFormulario

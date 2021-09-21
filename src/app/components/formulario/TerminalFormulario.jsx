import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
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
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import { SettingsEthernet } from '@material-ui/icons';

const TerminalFormulario = () => {
    const { id } = useParams();
    const [state, setState] = useState({
        nombre:'',
        consorcio:'',
        telefono:'',
        correo:'',
        pais:'',
        ciudad:'',
        sector:'',
        direccion:'',
        observacion:'',
        estado: '1',
        date: new Date(),
    });

    useEffect(() => {
        console.log('Actualizando la terminal: ', id);
    },[]);

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

    const handleSubmit = (event) => {
        event.preventDefault();
        const resultado = (id > 0) ? console.log('registrando...') : console.log('actualizando...');
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const {
        username,
        firstName,
        gender,
        email,
        consorcio
    } = state;

    const useStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(1),
          minWidth: 120,
        },
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
      }));

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
                            >
                            <InputLabel id="consorcioLabel">Consorcio</InputLabel>
                            <Select
                            labelId="consorcioLabel"
                            id="consorcio"
                            value={state.consorcio}
                            name="consorcio"
                            onChange={handleChange}
                            label="Consorcio"
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
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
                            validators={['required']}
                            errorMessages={['this field is required']}
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
                            validators={['required', 'isEmail']}
                            errorMessages={[
                                'this field is required',
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
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
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
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
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
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
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

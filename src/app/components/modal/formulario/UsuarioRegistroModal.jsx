import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import {
    ValidatorForm,
    TextValidator,
} from 'react-material-ui-form-validator';
import { Autocomplete } from '@material-ui/lab';
import useUsuario from 'app/hooks/useUsuario';
import useGeneral from 'app/hooks/useGeneral';
import Swal from 'sweetalert2';

import {
    Button,
    Icon,
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
    Avatar,
    TextField,
    Checkbox
} from '@material-ui/core'
import 'date-fns'
import { string } from 'yup'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        maxWidth: '500px',
    },
}))

export default function UsuarioRegistroModal({
    open,
    setOpen,
    usuarioActualizar,
}) {
    const { actualizarUsuario, registrarUsuario, getUsuarios, getRolesDeUsuarios } = useUsuario()
    const { getCiudades, ciudades } = useGeneral()
    const [datos, setDatos ] = useState({
        ciudades: [],
        sectores: [],
        roles: [],
    });

    const [roles, setRoles] = useState([]);

    // useEffect(() => {
    //     console.log('effectRoles: ', roles);
    // },[roles]);

    const consultarFetch = async() => {
       try {
        const consultandoRoles = await getRolesDeUsuarios();
        console.log('roles: ', consultandoRoles);
       if(consultandoRoles.length > 0) {
            setRoles(consultandoRoles);
        } 
        console.log('rolesOriginal: ', roles);
        
         await getCiudades();
       } catch (error) {
           console.log('Error:' , error);
       }
    }

    useEffect(() => {
        try {
            if(ciudades.length > 0) {
                setDatos({
                    ...state,
                    ciudades: ciudades
                });
            }
        } catch (error) {
            console.log('error: ', error)
        }
    },[ciudades, roles]);

    useEffect(() => {
        consultarFetch();
    }, [])

    const [state, setState] = useState({
        idUsuario: 0,
        rol: '',
        nombre: '',
        apellido: '',
        apodo: '',
        usuario: '',
        clave: '',
        repetirClave: '',
        correo: '',
        telefono: '',
        ciudad: '',
        sector: '',
        direccion: '',
        observacion: '',
        estado: '1',
    })
    useEffect(() => {
        if (Object.keys(usuarioActualizar).length !== 0) {
            setState({
                ...state,
                idUsuario: usuarioActualizar.idUsuario,
                rol: String(usuarioActualizar.idRol),
                nombre: usuarioActualizar.nombre,
                apellido: usuarioActualizar.apellido,
                apodo: usuarioActualizar.apodo,
                usuario: usuarioActualizar.usuario,
                clave: usuarioActualizar.clave,
                correo: usuarioActualizar.correo,
                telefono: usuarioActualizar.telefono,
                ciudad: String(usuarioActualizar.idCiudad),
                sector: String(usuarioActualizar.idSector),
                direccion: usuarioActualizar.direccion,
                observacion: usuarioActualizar.observacion,
                estado: usuarioActualizar.estado === 'Activo' ? "1" : "0",
            })

            console.log('actualizando: ', state);

        } else {
            setState({
                idUsuario: 0,
                rol: '',
                nombre: '',
                apellido: '',
                apodo: '',
                usuario: '',
                clave: '',
                repetirClave: '',
                correo: '',
                telefono: '',
                ciudad: '',
                sector: '',
                direccion: '',
                observacion: '',
                estado: '1',
            })
            console.log('registrando: ', usuarioActualizar)
        }
    }, [usuarioActualizar])

    const handleSubmit = async (event) => {
        // event.preventDefault()
        // return;
        let codigo = 0
        if (state.idUsuario > 0) {
            // return;
            codigo = await actualizarUsuario(state)
        } else {
            // alert('Registrando');
            // return;
            codigo = await registrarUsuario(state)
        }

        console.log('codigo: ', codigo)
        if (codigo.success) {
            Swal.fire(
                'Confirmación!',
                `${codigo.msg}`,
                'success'
            ).then((result) => {
                if (result.isConfirmed) {
                    setOpen(false)
                    getUsuarios()
                }
            })
        } else if(codigo.success === false) {
            Swal.fire(
                'Advertencia!',
                `${codigo.msg}!`,
                'warning'
            ).then((result) => {
                // if (result.isConfirmed) {
                //     setOpen(false)
                //     getUsuarios()
                // }
            })
        }
    }

    const handleChange = (event) => {
        // event.persist();
        console.log('nombre: ', event.target.name)
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const classes = useStyles()

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                style={{ zIndex: 100 }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">
                            <Grid container>
                                <Avatar
                                    style={{
                                        height: '40px',
                                        width: '40px',
                                        marginRight: '10px',
                                    }}
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs03_SqIWGSw_H6T1YJCvhn1zR3oAsL41JHuE69BCCLsxFKHP1PdpMcqPc9A9kYdWpsFU&usqp=CAU"
                                />
                                {usuarioActualizar.idUsuario > 0 ? "Actulizando Usuario" : "Registrando nuevo Usuario"}
                            </Grid>
                        </h2>
                        <hr />
                        <div className="p-4 h-full">
                            <ValidatorForm
                                onSubmit={handleSubmit}
                                noValidate
                                autoComplete="off"
                                onError={() => null}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextValidator
                                            required
                                            className="mb-4 w-full"
                                            label="nombre"
                                            onChange={handleChange}
                                            type="text"
                                            name="nombre"
                                            value={state.nombre || ''}
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                            validators={['required']}
                                            errorMessages={[
                                                'Este campo es obligatorio',
                                            ]}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextValidator
                                            required
                                            className="mb-4 w-full"
                                            label="Apellido"
                                            onChange={handleChange}
                                            type="text"
                                            name="apellido"
                                            value={state.apellido || ''}
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required',
                                            ]}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextValidator
                                            required
                                            className="mb-4 w-full"
                                            label="Nombre de usuario"
                                            onChange={handleChange}
                                            type="text"
                                            name="usuario"
                                            value={state.usuario || ''}
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                            validators={['required']}
                                            errorMessages={[
                                                'Este campo es obligatorio',
                                            ]}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                            <Autocomplete
                                                autoComplete
                                                name="rol"
                                                options={roles}
                                                defaultValue={roles.find(v => v.idRol == state.rol)}
                                                onChange={(event, newValue) => {
                                                    if (newValue !== null) {
                                                        setState({
                                                            ...state,
                                                            rol: newValue.idRol,
                                                        })
                                                    }
                                                }}
                                                getOptionLabel={(option) =>
                                                    option.rol
                                                }
                                                renderOption={(option) =>
                                                    option.rol
                                                }
                                                size="small"
                                                renderInput={(params) => (
                                                    <TextField
                                                        name="rol"
                                                        // helperText="Mensaje de error prueba"
                                                        // error={true}
                                                        {...params}
                                                        label="Rol de usuario"
                                                        variant="outlined"
                                                        fullWidth
                                                    />
                                                )}
                                            />
                                    </Grid>
                                </Grid>
                                
                                    <Grid container spacing={2} justifyContent="center">
                                        {state.idUsuario > 0 ? (
                                            <Grid item xs={12}>
                                                <FormControlLabel
                                                    control={<Checkbox />}
                                                    label="Solicitar cambiar contraseña."
                                                />
                                            </Grid>
                                        ) : (
                                            <>
                                            <Grid item xs={6}>
                                                <TextValidator
                                                    required
                                                    className="mb-4 w-full"
                                                    label="Contraseña"
                                                    onChange={handleChange}
                                                    type="text"
                                                    name="clave"
                                                    value={state.clave || ''}
                                                    variant="outlined"
                                                    fullWidth
                                                    size="small"
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'Este campo es obligatorio',
                                                    ]}
                                                />
                                            </Grid>

                                            <Grid item xs={6}>
                                                <TextValidator
                                                    required
                                                    className="mb-4 w-full"
                                                    label="Repetir Contraseña"
                                                    onChange={handleChange}
                                                    type="text"
                                                    name="repetirClave"
                                                    value={state.repetirClave || ''}
                                                    variant="outlined"
                                                    fullWidth
                                                    size="small"
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'Este campo es obligatorio',
                                                    ]}
                                                />
                                            </Grid>
                                        </>
                                        ) }
                                    </Grid>

                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextValidator
                                                required
                                                className="mb-4 w-full"
                                                label="correo"
                                                onChange={handleChange}
                                                type="text"
                                                name="correo"
                                                value={state.correo || ''}
                                                variant="outlined"
                                                fullWidth
                                                size="small"
                                                validators={['required']}
                                                errorMessages={[
                                                    'Este campo es obligatorio',
                                                ]}
                                            />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <TextValidator
                                                required
                                                className="mb-4 w-full"
                                                label="telefono"
                                                onChange={handleChange}
                                                type="text"
                                                name="telefono"
                                                value={state.telefono || ''}
                                                variant="outlined"
                                                fullWidth
                                                size="small"
                                                validators={['required']}
                                                errorMessages={[
                                                    'Este campo es obligatorio',
                                                ]}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <Autocomplete
                                                name="ciudad"
                                                options={ciudades}
                                                defaultValue={datos.ciudades.find(v => v.idCiudad == state.ciudad)}
                                                onChange={(event, newValue) => {
                                                    if (newValue !== null) {
                                                        setState({
                                                            ...state,
                                                            ciudad: newValue.idCiudad,
                                                        })
                                                        console.log(
                                                            'valores: ',
                                                            state
                                                        )
                                                    }
                                                }}
                                                getOptionLabel={(option) =>
                                                    option.ciudad
                                                }
                                                renderOption={(option) =>
                                                    option.ciudad
                                                }
                                                size="small"
                                                renderInput={(params) => (
                                                    <TextField
                                                        name="ciudad"
                                                        {...params}
                                                        label="Ciudad"
                                                        variant="outlined"
                                                        fullWidth
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Autocomplete
                                                name="sector"
                                                options={datos.ciudades}
                                                 defaultValue={datos.ciudades.find(v => v.idCiudad == state.ciudad)}
                                                onChange={(event, newValue) => {
                                                    if (newValue !== null) {
                                                        setState({
                                                            ...state,
                                                            sector: newValue.idCiudad,
                                                        })
                                                        console.log(
                                                            'valores: ',
                                                            state
                                                        )
                                                    }
                                                }}
                                                getOptionLabel={(option) =>
                                                    option.ciudad
                                                }
                                                renderOption={(option) =>
                                                    option.ciudad
                                                }
                                                size="small"
                                                renderInput={(params) => (
                                                    <TextField
                                                        name="sector"
                                                        size="small"
                                                        {...params}
                                                        label="Sector"
                                                        variant="outlined"
                                                        fullWidth
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextValidator
                                                required
                                                className="mb-4 w-full"
                                                label="Dirección"
                                                onChange={handleChange}
                                                type="text"
                                                name="direccion"
                                                value={state.direccion || ''}
                                                variant="outlined"
                                                fullWidth
                                                size="small"
                                                validators={['required']}
                                                errorMessages={[
                                                    'Este campo es obligatorio',
                                                ]}
                                            />
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
                                        </Grid>
                                    </Grid>

                                    <Grid container justifyContent="space-between">
                                        <RadioGroup
                                            className="mb-4"
                                            value={state.estado || ''}
                                            name="estado"
                                            onChange={handleChange}
                                            row
                                        >
                                            <FormControlLabel value="1" control={ <Radio color="secondary" /> }
                                                label="Activo"
                                                labelPlacement="end"
                                            />
                                            <FormControlLabel
                                                value="0"
                                                control={
                                                    <Radio color="secondary" />
                                                }
                                                label="Inactivo"
                                                labelPlacement="end"
                                            />
                                        </RadioGroup>

                                        <Button component="label" style={{ padding: '5px' }}>
                                            Subir imagen
                                            <input type="file" hidden />
                                        </Button>
                                    </Grid>

                                <Button color="primary" variant="contained" type="submit">
                                    <Icon>save</Icon>
                                    <span className="pl-2 capitalize">
                                        Guardar
                                    </span>
                                </Button>
                            </ValidatorForm>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

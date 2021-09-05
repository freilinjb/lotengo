import React, { useEffect, useState } from 'react'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Grid, IconButton, Icon, Button } from '@material-ui/core'
import MUIDataTable from 'mui-datatables'
import { makeStyles } from '@material-ui/core/styles'

import useConsorcio from 'app/hooks/useConsorcio';
import useGeneral from 'app/hooks/useGeneral';
import AddIcon from '@material-ui/icons/Add'
import Tooltip from "@material-ui/core/Tooltip";
import Swal from 'sweetalert2';

import ConsorcioRegistroModal from 'app/components/modal/formulario/ConsorcioRegistroModal'
const Consorcio = () => {
  const [open, setOpen] = useState(false);
  const [consorcioActualizar, setConsorcioActualizar] = useState({});

    const { getConsorcios, consorcios, mensajeConsorcio, getConsorcioByID } = useConsorcio()
    const { saludar } = useGeneral();

    const consultarFetch = async () => {
        await getConsorcios();
    }
    useEffect(() => {
        saludar('Freilin Jose')
        consultarFetch();
    }, []);

    const openModalActualizar = (consorcio) => {
        setConsorcioActualizar(consorcio);

        setOpen(true);
    }

    const openModalRegistrar = () => {
        setConsorcioActualizar(false);
        setOpen(true);
    }


    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
    }))

    const classes = useStyles()

    useEffect(() => {
        console.log('Consorcios: ', consorcios)
    }, [consorcios]);

    const eliminarConsorcio = async (data) => {
        Swal.fire({
            title: 'Confirmación',
            text: "Estas seguro de querer borrar este consorcio!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrarlo!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Borrado!',
                'El consorcio ha sido borrado de forma correcta.',
                'success'
              )
            }
          })
    }
    const columns = [
        'nombre',
        {
            name: 'creado_por',
            headerName: 'Creadpo asdf',
        },
        'slogan',
        'telefono',
        'correo',
        {
            name: 'estado',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    if(value == 1) {
                        return (<p>Activo</p>)
                    } else {
                        return (<p>Inactivo</p>)

                    }
                }
            }
        },
        {
            name: 'Acción',
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            <IconButton
                                color="secondary"
                                className={classes.button}
                                aria-label="delete"
                                onClick={() => eliminarConsorcio(consorcios[value])}
                            >
                                <Icon>delete</Icon>
                            </IconButton>

                            <IconButton
                                color="primary"
                                className={classes.button}
                                aria-label="edit"
                                onClick={() => openModalActualizar(consorcios[value])}
                            >
                                <Icon>edit</Icon>
                            </IconButton>
                        </>
                    )
                },
            },
        },
    ]

    const handleClick = (e) => {
        console.log('Hola', e)
    }

    const CustomToolbar = () => (
      <Tooltip title={"Agregar nuevo consorcio"}>
          <IconButton className={classes.iconButton} onClick={()  =>  openModalRegistrar()/*handleClick('freilin')*/}>
            <AddIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
    );

    const options = {
        filter: true,
        // filterType: "dropdown",
        selectableRowsHideCheckboxes: false,
        download: false,
        viewColumns: false,
        responsive: 'vertical',
        selectableRows: false,
        // print: false,
        tableBodyHeight: '400px',
        customToolbar: () => {
          return (
            <CustomToolbar />
          );
        }
        // tableBodyMaxHeight
    }
    return (
        <>
            <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'consorcio', path: '/consorcio' },
                            { name: 'Administración' },
                        ]}
                    />
                </div>
                <SimpleCard title="Administracion de Consorcio">
                
                    <Grid container spacing={3} className="py-5">
                        <Grid item style={{ height: 'auto', width: '100%' }}>
                            {/* <DataGrid rows={rows} columns={columns} /> */}
                            <MUIDataTable
                                title={'Consorcios'}
                                data={consorcios}
                                columns={columns}
                                options={options}
                            />
                        </Grid>
                    </Grid>
                </SimpleCard>
                <ConsorcioRegistroModal open={open} setOpen={setOpen} consorcioActualizar={consorcioActualizar}/>

                <Button
                    onClick={() => Swal.fire('Notificacion','Se ha guardado de forma correcta', 'success')}
                >Hola</Button>
            </div>
        </>
    )
}

export default Consorcio

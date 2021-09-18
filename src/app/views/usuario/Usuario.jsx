import React, { useEffect, useState } from 'react'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Grid, IconButton, Icon } from '@material-ui/core'
import MUIDataTable from 'mui-datatables'

import useUsuario from 'app/hooks/useUsuario';
import AddIcon from '@material-ui/icons/Add'
import Tooltip from "@material-ui/core/Tooltip";
import Swal from 'sweetalert2';

import UsuarioRegistroModal from 'app/components/modal/formulario/UsuarioRegistroModal'
const Usuario = () => {
  const [open, setOpen] = useState(false);
  const [usuarioActualizar, setUsuarioActualizar] = useState({});

    const { saludar, getUsuarios, usuarios, eliminarUsuarioByID } = useUsuario();

    const consultarFetch = async () => {
        await getUsuarios();
    }
    useEffect(() => {
        saludar('Freilin Jose')
        consultarFetch();
    }, []);

    const openModalActualizar = (usuarios) => {
        setUsuarioActualizar(usuarios);

        setOpen(true);
    }

    const openModalRegistrar = () => {
        setUsuarioActualizar(false);
        setOpen(true);
    }

    const eliminarUsuario = async (data) => {
        Swal.fire({
            title: 'Confirmación',
            text: `Estas seguro de querer borrar el usuario ${data.nombre}!`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrarlo!'
          }).then( async(result) => {
            if (result.isConfirmed) {
               const resultados = await eliminarUsuarioByID(data.idUsuario);
                console.log('ResulSwal: ', resultados);

                if(resultados.success === true) {
                    Swal.fire(
                        'Borrado!',
                        `${resultados.msg}!!`,
                        'success'
                      )
                      consultarFetch();
                } else {
                    Swal.fire(
                        'Borrado!',
                        `${resultados.msg}!!`,
                        'warning'
                      )
                }
            }
          })
    }
    const columns = [
        {
            name: '',
            label: '#',
            options: {
                filter: false,
                customBodyRender: (value, tableMeta, update) => {
                    let rowIndex = Number(tableMeta.rowIndex)+1;
                    return (<span>{rowIndex}</span>)
                }
            }
        },
        {
            name: 'nombre',
            label: 'Nombre',
        },
        {
            name: 'creado_por',
            label: 'Creado Por',
        },
        {
            name: 'rol',
            label: 'Rol',
        },
        'telefono',
        'correo',
        {
            name: 'estado',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    if(value === 'Activo') {
                        return (<small className="border-radius-4 bg-primary text-white px-2 py-2px">Activo </small>)
                    } else {
                        return (<small className="border-radius-4 bg-error text-white px-2 py-2px">Inactivo </small>)
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
                                aria-label="delete"
                                onClick={() => eliminarUsuario(usuarios[value])}
                            >
                                <Icon>delete</Icon>
                            </IconButton>

                            <IconButton
                                color="primary"
                                aria-label="edit"
                                onClick={() => openModalActualizar(usuarios[value])}
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
      <Tooltip title={"Agregar nuevo usuario"}>
          <IconButton  onClick={()  =>  openModalRegistrar()/*handleClick('freilin')*/}>
            <AddIcon/>
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
                            { name: 'usuario', path: '/usuario/admin' },
                            { name: 'Administración' },
                        ]}
                    />
                </div>
                <SimpleCard title="Administracion de Usuarios">
                
                    <Grid container spacing={3} className="py-5">
                        <Grid item style={{ height: 'auto', width: '100%' }}>
                            {/* <DataGrid rows={rows} columns={columns} /> */}
                                <MUIDataTable
                                    title={'Usuarios'}
                                    data={usuarios}
                                    columns={columns}
                                    options={options}
                                />
                        </Grid>
                    </Grid>
                </SimpleCard>
                <UsuarioRegistroModal open={open} setOpen={setOpen} usuarioActualizar={usuarioActualizar}/>
            </div>
        </>
    )
}

export default Usuario;

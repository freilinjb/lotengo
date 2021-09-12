import React, { useEffect, useState } from 'react'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Grid, IconButton, Icon, Avatar } from '@material-ui/core'
import MUIDataTable from 'mui-datatables'

import useTerminal from 'app/hooks/useTerminal';
import useGeneral from 'app/hooks/useGeneral';
import AddIcon from '@material-ui/icons/Add'
import Tooltip from "@material-ui/core/Tooltip";
import Swal from 'sweetalert2';

import ConsorcioRegistroModal from 'app/components/modal/formulario/ConsorcioRegistroModal';
const Terminal = () => {
  const [open, setOpen] = useState(false);
  const [consorcioActualizar, setConsorcioActualizar] = useState({});

    const { getTerminales, terminales, eliminarTerminalByID } = useTerminal()
    const { saludar } = useGeneral();

    const consultarFetch = async () => {
        await getTerminales();
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

    useEffect(() => {
        console.log('Consorcios: ', terminales)
    }, [terminales]);

    const eliminarConsorcio = async (data) => {
        Swal.fire({
            title: 'Confirmación',
            text: `Estas seguro de querer borrar este consorcio ${data.nombre}!`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrarlo!'
          }).then( async(result) => {
            if (result.isConfirmed) {
               const resultados = await eliminarTerminalByID(data.idConsorcio);
                console.log('ResulSwal: ', resultados);

                if(resultados.success === true) {
                    Swal.fire(
                        'Borrado!',
                        `${resultados.msg}!!`,
                        'success'
                      )
                      consultarFetch();
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
            label: 'Terminal',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                   console.log('TABLEMETA: ', terminales[tableMeta.rowIndex]);

                   const urlLogo = terminales[tableMeta.rowIndex].urlLogo === '' ? '/assets/images/products/headphone-2.jpg' : terminales[tableMeta.rowIndex].urlLogo;
                   
                   return (
                    <div className="flex items-center">
                        <Avatar src={urlLogo} />
                            <p className="m-0 ml-8">
                                {value}
                            </p>
                    </div>
                   )
                }
            }
        },
        {
            name: 'consorcio',
            label: 'Consorcio',
        },
        {
            name: 'sector',
            label: 'Sector',
        },
        'telefono',
        'correo',
        {
            name: 'estado',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    if(value == 'Activo') {
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
                        <Tooltip title="Verificar detalle" placement="top">
                            <IconButton>
                                <Icon>view_headline</Icon>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Actualizar" placement="top">
                            <IconButton>
                                <Icon>arrow_right_alt</Icon>
                            </IconButton>
                        </Tooltip>
                        </>
                    )
                },
            },
        },
    ]
    
    const CustomToolbar = () => (
      <Tooltip title={"Agregar nuevo consorcio"}>
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
                                    data={terminales}
                                    columns={columns}
                                    options={options}
                                />
                        </Grid>
                    </Grid>
                </SimpleCard>
                <ConsorcioRegistroModal open={open} setOpen={setOpen} consorcioActualizar={consorcioActualizar}/>
            </div>
        </>
    )
}

export default Terminal

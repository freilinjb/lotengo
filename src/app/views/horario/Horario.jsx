import React, { useEffect, useState } from 'react';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Grid, IconButton, Icon } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';

import useConsorcio from 'app/hooks/useConsorcio';
import useHorario from 'app/hooks/useHorario';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from "@material-ui/core/Tooltip";
import Swal from 'sweetalert2';

import HorarioFormularioModal from 'app/components/modal/formulario/HorarioFormularioModal';

const Consorcio = () => {
  const [open, setOpen] = useState(false);
  const [horarioActualizar, setHorarioActualizar] = useState({});

    const { eliminarConsorcioByID } = useConsorcio();
    const { saludar, getHorarios, horarios, eliminarHorarioByID } = useHorario();

    const consultarFetch = async () => {
        await getHorarios();
    }
    useEffect( () => {
        saludar('Freilin Jose')
        // await getHorarios();
        consultarFetch();
    }, []);

    const openModalActualizar = (horario) => {
        setHorarioActualizar(horario);
        setOpen(true);
    }

    const openModalRegistrar = () => {
        setHorarioActualizar(false);
        setOpen(true);
    }

    useEffect(() => {
        console.log('horarios: ', horarios)
    }, [horarios]);

    const eliminarHorario = async (data) => {
        console.log('dataEliminar:', data);
        const idHorario = data.idHorario;
        // return;
        Swal.fire({
            title: 'Confirmación',
            text: `Estas seguro de querer borrar este horario ${data.horario}!`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrarlo!'
          }).then( async(result) => {
            if (result.isConfirmed) {
                console.log('Data confirmacion: ', idHorario);
            //    const resultados = await eliminarHorarioByID(data.idConsorcio);
            //     console.log('ResulSwal: ', resultados);

            //     if(resultados.success === true) {
            //         Swal.fire(
            //             'Borrado!',
            //             `${resultados.msg}!!`,
            //             'success'
            //           )
            //           consultarFetch();
            //     }

                let data = await eliminarHorarioByID(idHorario)
                console.log('DataSADFASDF: ', data);
                
                Swal.fire('Good job!', `${data.msg}!`, `${data.success ? "success" : "error"}`).then(
                    (result) => {
                        if (result.isConfirmed) {
                            consultarFetch();
                        }
                    }
                )
            }
          })
    }
    const columns = [
        {
            name: '',
            label: '#',
            options:{ 
                filter: false,
                customBodyRender: (value, tableMeta, update) => {
                    let rowIndex = Number(tableMeta.rowIndex)+1;
                    return (<span>{rowIndex}</span>)
                }
            }

        },
        {
            name: 'horario',
            label: 'Horario',
        },
        {
            name: 'horaDesde',
            label: 'Desde',
        },
        {
            name: 'horaHasta',
            label: 'Hasta',
        },
        {
            name: 'hora',
            label: 'Horas totales',
        },
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
                                onClick={() => eliminarHorario(horarios[value])}
                            >
                                <Icon>delete</Icon>
                            </IconButton>

                            <IconButton
                                color="primary"
                                aria-label="edit"
                                onClick={() => openModalActualizar(horarios[value])}
                            >
                                <Icon>edit</Icon>
                            </IconButton>
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
                            { name: 'horario', path: '/horario' },
                            { name: 'Administración' },
                        ]}
                    />
                </div>
                <SimpleCard title="Administracion de Horarios">
                    <Grid container spacing={3} className="py-5">
                        <Grid item style={{ height: 'auto', width: '100%' }}>
                            {/* <DataGrid rows={rows} columns={columns} /> */}
                                <MUIDataTable
                                    title={'Horarios'}
                                    data={horarios}
                                    columns={columns}
                                    options={options}
                                />
                        </Grid>
                    </Grid>
                </SimpleCard>
                <HorarioFormularioModal open={open} setOpen={setOpen} horarioActualizar={horarioActualizar}/>
            </div>
        </>
    )
}

export default Consorcio

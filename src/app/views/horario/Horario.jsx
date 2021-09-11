import React, { useEffect, useState } from 'react';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Grid, IconButton, Icon } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';

import useConsorcio from 'app/hooks/useConsorcio';
import useHorario from 'app/hooks/useHorario';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from "@material-ui/core/Tooltip";
import Swal from 'sweetalert2';

import ConsorcioRegistroModal from 'app/components/modal/formulario/ConsorcioRegistroModal';

const Consorcio = () => {
  const [open, setOpen] = useState(false);
  const [consorcioActualizar, setConsorcioActualizar] = useState({});

    const { getConsorcios, consorcios, eliminarConsorcioByID } = useConsorcio();
    const { saludar, getHorarios, horarios } = useHorario();

    const consultarFetch = async () => {
        await getConsorcios();
    }
    useEffect(() => {
        saludar('Freilin Jose')
        getHorarios();
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
        console.log('horarios: ', horarios)
    }, [horarios]);

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
               const resultados = await eliminarConsorcioByID(data.idConsorcio);
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
                                onClick={() => eliminarConsorcio(consorcios[value])}
                            >
                                <Icon>delete</Icon>
                            </IconButton>

                            <IconButton
                                color="primary"
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
                <ConsorcioRegistroModal open={open} setOpen={setOpen} consorcioActualizar={consorcioActualizar}/>
            </div>
        </>
    )
}

export default Consorcio

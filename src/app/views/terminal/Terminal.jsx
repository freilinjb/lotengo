import React, { useEffect, useState } from 'react';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Grid, IconButton, Icon, Avatar } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';

import useTerminal from 'app/hooks/useTerminal';
import useGeneral from 'app/hooks/useGeneral';
import AddIcon from '@material-ui/icons/Add'
import Tooltip from "@material-ui/core/Tooltip";

import TerminalRegistroModal from 'app/components/modal/formulario/TerminalRegistroModal';

import { useHistory } from 'react-router-dom';
// import getMac, {isMac} from 'getmac';
const Terminal = () => {
    let history = useHistory();

  const [open, setOpen] = useState(false);
  const [terminalActualizar, setTerminalActualizar] = useState({});

    const { getTerminales, terminales, eliminarTerminalByID } = useTerminal()
    const { saludar } = useGeneral();

    const consultarFetch = async () => {
        await getTerminales();
    }
    useEffect(() => {
        saludar('Freilin Jose')
        consultarFetch();
    }, []);

    useEffect(() => {
        console.log('Terminal: ', terminales)
    }, [terminales]);
    
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
                //    console.log('TABLEMETA: ', terminales[tableMeta.rowIndex]);

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
        {
            name: 'telefono',
            label: 'Telefono',
        },
        {
            name: 'correo',
            label: 'Correo',
        },
        {
            name: 'estado',
            label: 'Estado',
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
            name: 'idTerminal',
            label: 'Acción',
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                        <Tooltip title="Verificar detalle" placement="top">
                                <IconButton
                                    onClick={() => history.push('add')}
                                >
                                    <Icon>view_headline</Icon>
                                </IconButton>
                        </Tooltip>

                        <Tooltip title="Actualizar" placement="top">
                            
                            <IconButton
                                onClick={() => /*console.log('terminal: ', value)*/ history.push(`edit/${value}`)}
                            >
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
      <Tooltip title={"Agregar nuevo Consorcio"}>
            <IconButton 
                onClick={() => history.push('add')}
            >
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
        selectableRows: "none",
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
                            { name: 'Administración' },
                        ]}
                    />
                </div>
                <SimpleCard title="Administracion de Terminal">
                
                    <Grid container spacing={3} className="py-5">
                        <Grid item style={{ height: 'auto', width: '100%' }}>
                            {/* <DataGrid rows={rows} columns={columns} /> */}
                                <MUIDataTable
                                    title={'Terminales / Bancas'}
                                    data={terminales}
                                    columns={columns}
                                    options={options}
                                />
                        </Grid>
                    </Grid>
                </SimpleCard>
                <TerminalRegistroModal open={open} setOpen={setOpen} terminalActualizar={terminalActualizar}/>
            </div>
        </>
    )
}

export default Terminal

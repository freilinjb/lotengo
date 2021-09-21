import React, {useState} from 'react'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Grid, Button } from '@material-ui/core'
// import { DataGrid } from '@material-ui/data-grid';

import MUIDataTable from 'mui-datatables';

const ConsorcioPrueba = () => {

    // const columns = [
    //     { field: 'id', headerName: 'ID', width: 90 },
    //     {
    //       field: 'firstName',
    //       headerName: 'First name',
    //       width: 150,
    //       editable: true,
    //     },
    //     {
    //       field: 'lastName',
    //       headerName: 'Last name',
    //       width: 150,
    //       editable: true,
    //     },
    //     {
    //       field: 'age',
    //       headerName: 'Age',
    //       type: 'number',
    //       width: 110,
    //       editable: true,
    //     },
    //     {
    //       field: 'fullName',
    //       headerName: 'Full name',
    //       description: 'This column has a value getter and is not sortable.',
    //       sortable: false,
    //       width: 160,
    //       valueGetter: (params) =>
    //         `${params.getValue(params.id, 'firstName') || ''} ${
    //           params.getValue(params.id, 'lastName') || ''
    //         }`,
    //     },
    //     { renderCell: (cellValues) => {
    //         return (
    //           <Button
    //             variant="contained"
    //             color="primary"
    //             onClick={(event) => {
    //               handleClick(event, cellValues);
    //             }}
    //           >
    //             Print
    //           </Button>
    //         );
    //       },
    //     }
    //   ];

    const columns = [ "Hola2", "ASDFA",
        {
            name: "Delete",
            options: {
              filter: false,
              sort: false,
              empty: true,
              customBodyRenderLite: (dataIndex) => {
                return (
                  <Button 
                    variant="contained"
                    color="primary"
                      size="small"
                  onClick={() => {
                      
                    const { data } = this.state;

                    data.shift();
                    this.setState({ data });
                  }}>
                    Hola
                  </Button>
                );
              }
            }
          },
          "hola"
      ];

      const [responsive, setResponsive] = useState("vertical");
      const [tableBodyHeight, setTableBodyHeight] = useState("400px");
      const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
    
    //   const columns = ["Name", "Title2", "Location2",
    //   {
    //           field: 'date',
    //           headerName: 'Year',
    //           width: 150,
    //           renderCell: (params) => (
    //             <strong>
    //               {params.value.getFullYear()}
    //               <Button
    //                 variant="contained"
    //                 color="primary"
    //                 size="small"
    //                 style={{ marginLeft: 16 }}
    //                 onClick={() => console.log('params: ', params)}
    //               >
    //                 Open
    //               </Button>
    //             </strong>
    //           ),
    //     },
    // ];
    
      const options = {
        filter: true,
        // filterType: "dropdown",
        selectableRowsHideCheckboxes: false,
        download: false,
        viewColumns: false,
        responsive,
        selectableRows: "none",
        // print: false,
        tableBodyHeight,
        tableBodyMaxHeight
      };
      const data = [
        ["Gabby George", "Business Analyst", "Minneapolis"],
        [
          "Aiden Lloyd",
          "Business Consultant for an International Company and CEO of Tony's Burger Palace",
          "Dallas"
        ],
        ["Jaden Collins", "Attorney", "Santa Ana"],
        ["Franky Rees", "Business Analyst", "St. Petersburg"],
        ["Aaren Rose", null, "Toledo"],
        ["Johnny Jones", "Business Analyst", "St. Petersburg"],
        ["Jimmy Johns", "Business Analyst", "Baltimore"],
        ["Jack Jackson", "Business Analyst", "El Paso"],
        ["Joe Jones", "Computer Programmer", "El Paso"],
        ["Jacky Jackson", "Business Consultant", "Baltimore"],
        ["Jo Jo", "Software Developer", "Washington DC"],
        ["Donna Marie", "Business Manager", "Annapolis"]
      ];

    return (
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
                    <Grid item style={{ height:'auto', width: '100%' }}>
                    {/* <DataGrid rows={rows} columns={columns} /> */}
                    <MUIDataTable
                        title={"Consorcios"}
                        data={data}
                        columns={columns}
                        options={options}
                    />
                    </Grid>
                </Grid>
            </SimpleCard>           
        </div>
    )
}

export default ConsorcioPrueba

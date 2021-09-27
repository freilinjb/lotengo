import React from 'react';
import TerminalFormulario from 'app/components/formulario/TerminalFormulario';
import ModulosTabla from 'app/components/tablas/ModulosTabla';
import { Breadcrumb, SimpleCard } from 'app/components';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Tab, Tabs, Typography, AppBar, } from '@material-ui/core';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));

const AppForm = () => {
    const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Terminal', path: '/terminal/admin' },
                        { name: 'Registro' },
                    ]}
                />
            </div>
            <SimpleCard title="Registro de Terminal">
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs value={value} onChange={handleChange} aria-label="registro tabs">
                    <Tab label="Datos" {...a11yProps(0)} />
                    <Tab label="Presupuesto" {...a11yProps(1)} />
                    <Tab label="Modulos" {...a11yProps(2)} />
                    <Tab label="Empleados" {...a11yProps(3)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <TerminalFormulario/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <ModulosTabla/>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    ModulosTabla
                </TabPanel>
                </div>
            </SimpleCard>
        </div>
    )
}

export default AppForm

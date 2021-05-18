import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SearchDoctors from './SearchDoctors';
//Hacer tabs, una de favoritos y otra de busqueda
//Tab de busqueda ---> profesionales
//                ---> Provincia: meter tabla de provincias en un estado, mapearlo y meterlo en un select
//                ---> Localidad (opcional): meter tabla de localidades en un estado,  mapearlo y meterlo en un select
//                ---> Especialidad: meter tabla de especialidades en un estado, mapearlo y meterlo en un select
//                ---> Nombre: meter la tabla de medicos en un estado, mapearlo y hacer una live bar
//                ---> Paginado:
// filtro desde el back o el front? Una vez que tengo provincicas filtar localidades desde el back
//una vez que este seleccionaa la provincia, setea el estado con un use effect y hacer llamado al back de las localidades ya filtradas
//segun el ID

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
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

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
}));

export default function MedicalDirectory() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div className={classes.root}>
            <AppBar position='static' color='default'>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor='primary'
                    textColor='primary'
                    variant='fullWidth'
                    aria-label='full width tabs example'
                >
                    <Tab label='Buscar médicos' {...a11yProps(0)} />
                    <Tab disabled label='Favoritos' {...a11yProps(1)} />
                    <Tab
                        disabled
                        label='Buscar instituciones'
                        {...a11yProps(2)}
                    />
                </Tabs>
            </AppBar>
            {/* <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
          <SearchDoctors/>
                    </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
          Buscar medicos          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
          Buscar instituciones
                    </TabPanel>
        </SwipeableViews> */}
            <SearchDoctors />
        </div>
    );
}

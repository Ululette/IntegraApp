import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SearchDoctors from './SearchDoctors';
import Favs from './Favs';
//----FALTA CORREGIR
/*
1-ubicar tabla paralela linea tab izquierda
2-cambiar de lugar boton agregar medico
3-quitarle el fondo a las tab y resaltar las seleccionadas

*/
function TabPanel(props) {
    const { children, value, index } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
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
        id: `wrapped-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(() => ({
    root: {
        margin:'0px',
        padding:'0px',
        alignItems: 'left',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        
    },
    tab: {
        width:'100%',
        margin:'-10px',
        padding:'-10px',
        color:'#212121',
        position: 'relative',
        alignItems: 'left',
        backgroundColor: '#fafafa',
        display: 'flex',
        justifyContent: 'center',
        overflow:'auto'
    },
    prueba:{
        backgroundColor: '#bdbdbd',
        margin:'0px',
        padding:'0px',
    }
}));

export default function AdminMedicTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar bgcolor='background.paper' className={classes.tab}>
                <Tabs 
                    value={value}
                    onChange={handleChange}
                    aria-label='simple tabs example'
                >
                    <Tab label='Medicos' {...a11yProps(0) } />
                    <Tab label='Favoritos' {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <SearchDoctors />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Favs />
            </TabPanel>
        </div>
    );
}

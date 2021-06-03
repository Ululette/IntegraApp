import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import GuestsAplications from './GuestsAplications';
import PartnersAplications from './PartnersAplications';
import PartnersAffiliationRequests from './PartnersAffiliationRequests';
import './solicitudes.css'

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
        width: '100%',
        margin: '0px',
        padding: '0px 0px 0px 0px',
        marginTop: '10px',
        alignItems: 'left',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#ffffff',
    },
    tab: {
        width: '100%',
        margin: '0px',
        padding: '0px 0px 0px 0px',
        color: '#212121',
        position: 'relative',
        alignItems: 'left',
        backgroundColor: '#fafafa',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'auto',
    },
    prueba: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        margin: '0px',
        padding: '0px',
        boxShadow: 'none',
    },
    prueba2: {
        backgroundColor: 'rgb(112, 193, 189)',
        fontWeight: 'bold',
    },
}));

export default function AplicationsTabs({firebase}) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar bgcolor='background.paper' className={classes.tab}>
                <Tabs
                    className={classes.prueba}
                    value={value}
                    onChange={handleChange}
                    aria-label='simple tabs example'
                >
                    <Tab className={classes.prueba2} label='Solicitudes de Afiliación' {...a11yProps(0)} />
                    <Tab className={classes.prueba2} label='Solicitudes Baja' {...a11yProps(1)} />
                    <Tab className={classes.prueba2} label='Afiliaciones' {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <GuestsAplications />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <PartnersAplications />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <PartnersAffiliationRequests firebase={firebase} />
            </TabPanel>
        </div>
    );
}

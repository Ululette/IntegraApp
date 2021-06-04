import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import PaymentsTable from './PaymentsTable.jsx';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
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

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

// root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
// },

const useStyles = makeStyles((theme) => ({
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

export default function PlanPayments() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position='static'>
                <Tabs
                    className={classes.tab}
                    value={value}
                    onChange={handleChange}
                    aria-label='simple tabs example'
                >
                    <Tab 
                        className={classes.prueba2}
                        label='Pagos pendientes' {...a11yProps(0)} />
                    <Tab 
                        className={classes.prueba2}
                        label='Historial de pagos' {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <PaymentsTable paymentStatus={'false'} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <PaymentsTable paymentStatus={'true'} />
            </TabPanel>
        </div>
    );
}

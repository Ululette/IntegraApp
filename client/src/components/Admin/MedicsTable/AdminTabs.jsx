import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MedicsTable from './MedicsTable';
import FormSpecialities from '../Speciality/FormSpecialities';

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
        marginTop: '0%',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-around',
        width: '100%',
        zIndex: '-1',
    },
    tab: {
        position: 'relative',
        alignItems: 'center',
        backgroundColor: '#4ca1a3',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        flexWrap: 'wrap',
        zIndex: '-1',
    },
}));

export default function AdminMedicTabs(props) {
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
                    <Tab label='Medicos' {...a11yProps(0)} />
                    <Tab label='Especialidades' {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <MedicsTable />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <FormSpecialities />
            </TabPanel>
        </div>
    );
}

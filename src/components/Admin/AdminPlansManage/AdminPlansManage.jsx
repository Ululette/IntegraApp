import React from 'react';
import PropTypes from 'prop-types';
import './AdminPlansManage.css'
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box
} from '@material-ui/core';
import AdminPlans from './AdminPlans/AdminPlans.jsx';
import NewPlan from './NewPlan/NewPlan.jsx';
import NewBenef from './NewBenef/NewBenef.jsx';

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
      padding: '0px',
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

export default function AdminPlansManage() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}  >
      <AppBar position='static' className={classes.tab} /* display="flex" alignItems="center" justifyContent="center" */>
        <Tabs
          className={classes.prueba}
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'
        >
          <Tab label='Planes' {...a11yProps(0)} className={classes.prueba2}/>
          <Tab label='Nuevo plan' {...a11yProps(1)} className={classes.prueba2}/>
          <Tab label='Nuevo beneficio' {...a11yProps(2)} className={classes.prueba2}/>
        </Tabs>
      </AppBar>
      <TabPanel  value={value} index={0}>
        <AdminPlans />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <NewPlan />
      </TabPanel>
      <TabPanel value={value} index={2} >
        <NewBenef />
      </TabPanel>
    </div>
  )
}

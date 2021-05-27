import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box
}from '@material-ui/core';
import AdminPlans from './AdminPlans/AdminPlans.jsx';
import NewPlanP from './NewPlanP/NewPlanP.jsx';
import NewBenefP from './NewPlanP/NewPlanP.jsx';

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function AdminPlansManage() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'
        >
          <Tab label='Planes' {...a11yProps(0)} />
          <Tab label='Agregar nuevo plan' {...a11yProps(1)} />
          <Tab label='Nuevo beneficio' {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <AdminPlans />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <NewPlanP />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <NewBenefP />
      </TabPanel>
    </div>
  )
}

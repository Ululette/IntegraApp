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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#fafafa',
    padding: 0,
  },
  tabshead: {
    width: '600px',
    display: 'flex',
    flexdirection: 'row',
    alignItems: 'center',/* -- */
    justifyContent: 'center', /* | */
  },
  tabs: {
    margin: 0,
    padding: 0,
    width: '100%',
    backgroundColor: '#27978b',
    display: 'flex',
    flexdirection: 'column',
    alignItems: 'center',/* | */
    justifyContent: 'center', /* -- */
  },
  overflow: {
    flexdirection: 'column',
    alignItems: 'center',/* | */
    justifyContent: 'center', /* -- */
  }
}));

export default function AdminPlansManage() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}  >
      <AppBar position='static' className={classes.tabshead} display="flex" alignItems="center" justifyContent="center">
        <Tabs
          className={classes.tabs}
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'
        >
          <Tab label='Planes' {...a11yProps(0)} />
          <Tab label='Nuevo plan' {...a11yProps(1)} />
          <Tab label='Nuevo beneficio' {...a11yProps(2)} />
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

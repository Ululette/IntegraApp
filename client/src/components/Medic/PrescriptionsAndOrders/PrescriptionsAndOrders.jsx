import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'absolute',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  formControl: {
    margin: theme.spacing(5),
    marginLeft: theme.spacing(5),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

//50607080 12131415

export default function PrescriptionsAndOrders() {
  const classes = useStyles();
  const [selection, setSelection] = useState('')

  const handleChange = (event) => {
    setSelection(event.target.value);
  };

  return (
      <>
    <FormControl className={classes.formControl}>
    <InputLabel id="demo-simple-select-label">Ver</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={selection}
      onChange={handleChange}
    >
      <MenuItem value={10}>Ordenes</MenuItem>
      <MenuItem value={20}>Recetas</MenuItem>
    </Select>
  </FormControl>
    <List className={classes.root} subheader={<li />}>
      {[0, 1].map((sectionId) => (
        <li key={`section-${sectionId}`} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
            {[0, 1, 2].map((item) => (
              <ListItem key={`item-${sectionId}-${item}`}>
                <ListItemText primary={`Item ${item}`} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
    </>
  );
}
import React, { useEffect, useState } from 'react';
import supabase from '../../../supabase.config'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import styles from './PrescriptionsAndOrder.module.css'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop:10,
    position: 'absolute',
    display: 'flex',
    left: '400px',
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    maxHeight: 300,
  },
  listSection: {
    position: 'absolute',
    display: 'flex',
    // left: '400px',
    backgroundColor: 'inherit',
  },
  ul: {
    position:'relative',
    backgroundColor: 'inherit',
    padding: 0,
  },
  formControl: {
    position: 'absolute',
    display: 'flex',
    left: '400px',
    margin: theme.spacing(5),
    marginLeft: theme.spacing(5),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

async function getData(query) {
  let {selection, param} = query
  let column = selection === 'orders' ? 'study_name' : 'drug_name'
  try {
    console.log('queryParams', selection, param)
    const { data: data, error: dataError } = await supabase
      .from(selection)
      .select("*")
      .ilike(`${column}`, `%${param}%`)
    data && console.log(data)
    dataError && console.log(dataError)
    return data ? data : dataError
  }
  catch (err) { console.error(err) }
}




export default function PrescriptionsAndOrders() {
  const classes = useStyles();
  const [data, setData] = useState([])
  const [query, setQuery] = useState({param:'', selection:''})

  const handleChange = (event) => {
    setQuery({...query, [event.target.name]:event.target.value})
  };

  useEffect(() => {
    if (query.param && query.selection) getData(query).then(r => setData(r), err => console.log(err))
  }, [query]);

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Ver</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={query.selection}
          onChange={handleChange}
          name='selection'
        >
          <MenuItem value='selecionar' aria-label="None" />
          <MenuItem value='orders'>Ordenes</MenuItem>
          <MenuItem value='prescriptions'>Recetas</MenuItem>
        </Select>
        <TextField onChange={handleChange} name='param' id="outlined-basic" label="Nombre" variant="outlined" className={classes.root} />
      </FormControl>
      {data.length && <List className={classes.root} subheader={<li />}>
        {data.map((order) => (
          <li key={`section-${order.date}`} className={classes.listSection}>
            Fecha: {Date(order.date)}
            <ul className={classes.ul}>
              <ListSubheader>{query.selection === 'orders'? `Estudio : ${order.study_name}` : `Medicamento : ${order.drug_name}` }</ListSubheader>
                <ListItem key={`item-${order.medical_consultation_id}-${order.medical_consultation_id}`}>
                  <ListItemText primary={`Nº de Consulta : ${order.medical_consultation_id}`} />
                </ListItem>
                <ListItem key={`item-${order.id}-${order.id}`}>
                  <ListItemText primary={`Nº de orden : ${order.id}`} />
                </ListItem>
            </ul>
          </li>
        ))}
      </List>}
    </>
  );
}
import React, { useState, useEffect } from 'react';
import supabase from '../../../../supabase.config';
import { makeStyles, withStyles, lighten } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { TextField, Button, Box } from '@material-ui/core';
import './NewPlan.css';

//Switch
import {
  FormGroup,
  Switch,
  Grid,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 0,
    backgroundColor: '#fafafa',
  },
  root: {
    width: '500px',
    padding: 0,
    alignItems: 'center',
  },
  planT: {
    width: '100%',
    marginBottom: 15,
  },
  importe: {
    width: '30%',
    marginBottom: 15,
    backgroundColor: '#ffffff',
  },
  beneficio: {
    width: '500px',
    marginBottom: 15,
    backgroundColor: '#ffffff',
    
  },
  activo: {
    color: '#676161de',
  },
  saveButton: {
    color: '#fafafa',
        padding: theme.spacing(0.5),
        border: '3px solid #2c7f7b',
        backgroundColor: '#2c7f7b',
        fontWeight: 'bold',
        fontSize: '15px',
        '&:hover': {
            backgroundColor: lighten('#fafafa', 0.2),
            color: '#2c7f7b',
            padding: theme.spacing(0.5),
        }
  }
}));

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: '#27978b',
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

export default function NewPlan() {
  const classes = useStyles();

  // Estado donde voy a guardar los beneficios traidos desde la base
  // de datos para poner en el selector.
  let [benefits, setBenefits] = useState(null);

  // Función que se trae los beneficios de la base de datos
  // y los cuarda en el estado local 'benefits'.
  async function getBenefAsync() {
    let { data: benefs } = await supabase.from('benefits').select('*');
    setBenefits(benefs);
  }

  // Carga los beneficios a usar en el selector
  useEffect(() => {
    getBenefAsync();
  }, []);

  // recarga los beneficios a usar en el selector
  useEffect(() => {
    // if(benefits){
    //   console.log(benefits); //[{id: , title: , description:}]
    // }
  }, [benefits]);

  // Estado de información del plan a agregar
  let [state, setState] = useState({
    title: '',
    price: '',
    sbenefits: [],
    active: true,
  });

  // Estado de errores para poder guardar el plan
  let [error, setError] = useState({
    title: 'No puede quedar incompleto o en blanco.',
    price: 'Debe ser un número de 4 a 6 cifras',
    sbenefits: 'Debe tener al menos un beneficio.',
    active: '',
  });

  useEffect(() => {
    setError({
      title: 'No puede quedar incompleto o en blanco.',
      price: 'Debe ser un número de 4 a 6 cifras',
      sbenefits: 'Debe tener al menos un beneficio.',
      active: '',
    });
  }, []);

  // Cambios en los inputs (excepto en beneficio)
  let handlechange = event => {

    let item = event.target.name;
    let value = event.target.value;
    switch (item) {

      case 'title': // Que no esté vacío ni sean solo espacios
        // console.log(event.target.value)
        let titlereg =
          /[0-9a-zA-ZÀ-ÿ\u00f1\u00d1\.]+[ ]?[0-9a-z A-ZÀ-ÿ\u00f1\u00d1][:punct:]*$/;

        setError((error) => ({
          ...error,
          title: titlereg.test(event.target.value)
            ? ''
            : 'No puede quedar incompleto o en blanco.',
        }));
        setState({ ...state, title: event.target.value });
        break;

      case 'price':  // Que sean solo números
        if ((value === null) || (value === '')) {
          setError((error) => ({
            ...error, price: 'Debe ser un número de 4 a 6 cifras',
          }));
        } else {
          setError((error) => ({
            ...error,
            price: /^[0-9]{4,6}$/.test(value)
              ? ''
              : 'Debe ser un número de 4 a 6 cifras',
          }));

          setState({ ...state, price: value });
          break;
        }

      case 'active':
        setState({ ...state, [event.target.name]: event.target.checked });
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    // if (state.sbenefits.length) {
    //   console.log('sbenefits', state.sbenefits);
    // }
  }, [error, state]);

  // Función que verifica que no haya errores en los inputs
  // para habilitar el botón de guardar el plan.
  let validate = (modInfo) => {
    return Object.values(error).every((x) => x === '');
    //si no tiene ningún mensaje de error devuelve true
  };

  // Función que guarda la info del nuevo plan en la base de datos.
  async function handlesubmit(e) {
    e.preventDefault();
    console.log('vas a guardar:', state)
    // Agrega el plan nuevo en la tabla de planes.
    async function addNewPlan(state) {
      await supabase
        .from('plans')
        .insert([
          {
            name: state.title,
            price: state.price,
            active: state.active
          }
        ])
    };
    await addNewPlan(state)

    //Obtiene Id del plan nuevo
    async function GetNewPlanId(state) {
      try {
        let { data: idnewplan } = await supabase
          .from('plans')
          .select('id')
          .eq('name', state.title);

        console.log(idnewplan[0].id);
        return idnewplan[0].id;
      } catch (err) {
        console.error(err);
      }
      return;
    }

    let idplan = await GetNewPlanId(state);

    // Agrega cada beneficio al plan
    // Busca el id del beneficio seleccionado y lo conecta.
    async function addPlanBenef(idplan, sbenefits) { //idbenef -> sbenefits
      for (let i = 0; i < sbenefits.length; i++) {
        let { error } = await supabase
          .from('plans_benefits')
          .insert([
            {
              plan_id: idplan,
              benefit_id: sbenefits[i].id,
            }
          ])
        if (error) console.log(error);
      }
    }
    await addPlanBenef(idplan, state.sbenefits);

    alert('listo');
    // Luego limpia
    setState({ title: '', price: '', sbenefits: [], active: true });
    setError({
      title: 'No puede quedar incompleto o en blanco.',
      price: 'Debe ser un número de 4 a 6 cifras',
      sbenefits: 'Debe tener al menos un beneficio.',
      active: '',
    });
  }


  // Función que administra el selector de beneficios.
  let handleAutoComplete = (values) => {
    // console.log('seleccionaste :', values)
    if (values.length === 0) {
      setError((error) => ({
        ...error, sbenefits: 'Debe tener al menos un beneficio.',
      }));
    } else {
      setError((error) => ({ ...error, sbenefits: '' }));
    }
    setState({ ...state, sbenefits: values })
  };

  return (
    <div className={classes.container}>
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.inputsCont}>
          <TextField
            id="title"
            name="title"
            className={classes.planT}
            label="Nombre del plan"
            value={state.title}
            onChange={handlechange}
            error={error.title}
            helperText={error.title}
          />
          <TextField
            id='importeInput'
            name='price'
            className={classes.importe}
            label='Importe'
            variant='outlined'
            value={state.price}
            onChange={handlechange}
            error={error.price}
            helperText={error.price}
          />
          {benefits && <Autocomplete
            multiple
            limitTags={2}
            id='benefitInputa'
            // name='benefit'
            className={classes.beneficio}
            //  Acá va el arreglo a mostrar en el selector
            options={benefits}
            getOptionLabel={option => option.title}
            onChange={(event, value) => handleAutoComplete(value)}
            renderOption={option => option.title}
            renderInput={params => (
              <TextField
                id='benefitInput'
                name='benefit'
                {...params}
                label='Beneficios'
                variant='outlined'
                error={error.sbenefits}
                helperText={error.sbenefits}
                className={classes.textField}
                inputProps={{
                  ...params.inputProps,
                  autoComplete:
                    'new-password', // disable autocomplete and autofill
                }}
              />
            )}
          />
          }

        </div>
        {/* switch */}
        <div className={classes.activo}>
          <p>Activo:</p>
          <FormGroup>
            <Typography component="div">
              <Grid component="label" label={'on'} container alignItems="center" spacing={1}>
                <Grid item>No</Grid>
                <Grid item >
                  <AntSwitch checked={state.active} onChange={handlechange} name="active" />
                </Grid>
                <Grid item>Si</Grid>
              </Grid>
            </Typography>
          </FormGroup>
        </div>
        <div width='100%' align="right">
          <Button
            id='savebtn'
            disabled={!validate()}
            variant='contained'
            className={classes.saveButton}
            onClick={handlesubmit}
          >
            Guardar
        </Button>
        </div>
      </form>
    </div>
  )
}

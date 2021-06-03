import React, { useState, useEffect } from 'react';
import supabase from '../../../../supabase.config';
import { makeStyles } from '@material-ui/core/styles';
// import { Autocomplete } from '@material-ui/lab';
import { TextField, Button } from '@material-ui/core';
import './NewBenef.css';

const useStyles = makeStyles((theme) => ({
    nbcontainer: {
        padding: 0,
        backgroundColor: '#fafafa',
    },
    root: {
        width: '500px',
        padding: 0,
        alignItems: 'center',
    },
    benefT: {
        width: '100%',
        marginBottom: 15,
    },
    detail: {
        width: '500px',
        marginBottom: 15,
        backgroundColor: '#ffffff',
    },
    category: {
        width: '300px',
        marginBottom: 15,
        backgroundColor: '#ffffff',
    },
    activo: {
        color: '#676161de',
    },
    saveButton: {
        backgroundColor: '#27978b',
        color: '#f0f0f0',
    },
}));

export default function NewBenef() {
    const classes = useStyles();

    // // Estado donde voy a guardar los beneficios traidos desde la base
    // // de datos para poner en el selector.
    // let [categories, setCategories] = useState(null);

    // // Función que se trae las categorías de la base de datos
    // // y los cuarda en el estado local 'benefSupa'.
    // async function getCategories() {
    //   try{
    //   let { data: categs } = await supabase.from('categories').select('*');
    //   console.log(categs)
    //   setCategories(categs);
    //   } catch (error){
    //     console.log(error)
    //   }
    //   return;
    // }

    // // Carga las categorías a usar en el selector
    // useEffect(() => {
    //   getCategories();
    // }, []);

    // // Carga las categorías a usar en el selector
    // useEffect(() => {
    //   if (categories) {
    //     console.log(categories)
    //   }
    // }, [categories]);

    const [state, setState] = React.useState({
        title: '',
        description: '',
        // category: null,
    });

    // Estado de errores para poder guardar el beneficio
    let [error, setError] = useState({
        title: '',
        // title: 'No puede quedar incompleto o en blanco.',
        // description: 'No puede quedar incompleto o en blanco.',
        // category: 'Debe pertenecer al menos a una categoría.',
    });

    useEffect(() => {
        // setError({
        //   title: 'No puede quedar incompleto o en blanco.',
        //   // description: 'No puede quedar incompleto o en blanco.',
        //   // category: 'Debe pertenecer al menos a una categoría.',
        // });
    }, []);

    useEffect(() => {
        // console.log('state', state);
    }, [error, state]);

    // // Selección de la categoría
    // let handleselect = (event, value) => {
    //   setState({ ...state, benefit: value });
    // }

    // Cambios en los inputs
    let handlechange = (event) => {
        let item = event.target.name;
        switch (item) {
            case 'title': // Que no esté vacío ni sean solo espacios
                let titlereg =
                    /[0-9a-zA-ZÀ-ÿ\u00f1\u00d1.]+[ ]?[0-9a-z A-ZÀ-ÿ\u00f1\u00d1][:punct:]*$/;

                setError((error) => ({
                    ...error,
                    title: titlereg.test(event.target.value)
                        ? ''
                        : 'No puede quedar incompleto o en blanco.',
                }));
                setState({ ...state, title: event.target.value });
                break;

            case 'description':
                console.log(event.target.value);
                // let descreg =
                //   /[0-9a-zA-ZÀ-ÿ\u00f1\u00d1\.]+[ ]?[0-9a-z A-ZÀ-ÿ\u00f1\u00d1][:punct:]*$/;

                // setError((error) => ({
                //   ...error,
                //   description: descreg.test(event.target.value)
                //     ? ''
                //     : 'No puede quedar incompleto o en blanco.',
                // }));
                setState({ ...state, description: event.target.value });
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        // console.log('state', state);
    }, [error, state]);

    // Función que verifica que no haya errores en los inputs
    // para habilitar el botón de guardar el plan.
    let validate = (modInfo) => {
        return Object.values(error).every((x) => x === '');
        //si no tiene ningún mensaje de error devuelve true
    };

    async function handlesubmit(e) {
        e.preventDefault();
        console.log('vas a guardar:', state);

        // Agrega el nuevo beneficio en la tabla benefits.
        async function addNewBenef(state) {
            await supabase.from('benefits').insert([
                {
                    title: state.title,
                    description: state.description,
                    // category_id: state.category.id
                },
            ]);
        }
        await addNewBenef(state);

        alert('listo');
        // Luego limpia
        setState({ title: '', description: '', category: null });
        setError({
            title: 'No puede quedar incompleto o en blanco.',
            // description: 'No puede quedar incompleto o en blanco.',
            // category: 'Debe pertenecer al menos a una categoría.',
        });
    }

    return (
        <div className={classes.nbcontainer}>
            <form className={classes.root} noValidate autoComplete='off'>
                <div className='inputsCont'>
                    <TextField
                        id='title'
                        name='title'
                        className={classes.benefT}
                        label='Título del beneficio'
                        value={state.title}
                        onChange={handlechange}
                        error={error.title}
                        helperText={error.title}
                    />
                    <TextField
                        id='detalleInput'
                        name='description'
                        className={classes.detail}
                        label='Descripción'
                        variant='outlined'
                        value={state.description}
                        onChange={handlechange}
                    />

                    {/* {categories && (
            <Autocomplete
              id='categoryInputa'
              name='category'
              className={classes.category}
              //  Acá va el arreglo a mostrar en el selector
              options={categories}
              autoHighlight
              label='categorya'
              value={state.benefit}
              variant='outlined'
              onChange={handleselect}
              getOptionLabel={option => option.description}
              renderOption={option => option.description}
              renderInput={params => (
                categories && (
                  <TextField
                    id='categoryInput'
                    name='category'
                    {...params}
                    label='Categoría'
                    variant='outlined'
                    error={error.category}
                    helperText={error.category}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete:
                        'new-password', // disable autocomplete and autofill
                    }}
                  />
                )
              )}
            />
          )} */}
                </div>
                <div width='100%' align='right'>
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
    );
}

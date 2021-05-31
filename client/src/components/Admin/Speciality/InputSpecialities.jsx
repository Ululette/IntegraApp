import { React, useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    ctn:{
        display:'flex',
        padding:'10px',
        flex: '1 1 30%',
    },
    fab: {
        margin: theme.spacing(1),
        paddingLeft:theme.spacing(2),
        backgroundColor: '#2c7f7b',
        border:'2px solid #2c7f7b',
        size:'small',
        fontWeight:'bold',
        '&:hover':{
            backgroundColor: '#2c7f7b',
            border:'2px solid #fafafa'
        }
    },
    input:{
        margin: theme.spacing(1),
        size:'small',
        width:'80%',
        backgroundColor: '#ffffff',
        borderRadius:'5px'
    }
}));

const InputSpecialities = ({addClick}) => {
    const classes = useStyles();
    const [inputValue, setInputValue] = useState('');

    const handlerChangeInput = (event) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = ()=>{
        addClick(inputValue);
        setInputValue('');
    }
    
    return ( 
        <div className={classes.ctn}>
             <TextField
                className={classes.input}
                size='small'
                id='outlined-basic'
                label='Nueva Especialidad'
                variant='outlined'
                onChange={handlerChangeInput}
                value={inputValue}
            />
            <Button
                className={classes.fab}
                variant='contained'
                color='primary'
                onClick={handleButtonClick}
                disabled={!inputValue}
            >
                Agregar
            </Button >
        </div>
     );
}
 
export default InputSpecialities;
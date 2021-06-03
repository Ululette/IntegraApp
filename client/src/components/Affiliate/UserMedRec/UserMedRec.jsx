import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import styles from './UserMedRec.module.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import supabase from '../../../supabase.config';

const useStyles = makeStyles((theme)=>({
    // root: {
    //     display:'flex',
    //     justifyContent:'space-around',
    //     minWidth: 300,
    // },
    // title: {
    //   fontSize: 14,
    // },
    // pos: {
        
    //     // marginBottom: 12,
    // },
    root: {
        width: '100%',
        maxWidth: '40%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
  }));

function UserMedRec() {
    const classes = useStyles();
    const [medicalRecord,setMedicalRecord] = useState({})

    let userDni = JSON.parse(
        localStorage.getItem('userdata')
    ).dni;

    useEffect(()=>{
        fetchRecord(userDni);
    },[])
    const fetchRecord = async(userDni) => {
        try {
            const { data: record } = await supabase
                .from('medical_records')
                .select(`declaration`)
                .eq('partner_dni',userDni)
                record[0]?setMedicalRecord(record[0].declaration):setMedicalRecord(false)
        } catch (err) {
            return err;
        }
    }
    console.log('Medical record:',medicalRecord)

    if(medicalRecord){
        return(
            <div className={styles.container}>
                <List className={classes.root}>
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary="Alergias:"
                            secondary={
                            <React.Fragment>
                                {medicalRecord.allergies==='Si'?`${medicalRecord.allergiesD}`:`No`}
                            </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary="Asma"
                            secondary={
                            <React.Fragment>
                                {medicalRecord.asthma==='Si'?`${medicalRecord.asthmaD}`:`No`}
                            </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary="Diabetes:"
                            secondary={
                            <React.Fragment>
                                {medicalRecord.diabetes==='Si'?`${medicalRecord.diabetesD}`:`No`}
                            </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary="Desmayos:"
                            secondary={
                            <React.Fragment>
                                {medicalRecord.fainting==='Si'?`${medicalRecord.faintingD}`:`No`}
                            </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary="Patologias auditivas:"
                            secondary={
                            <React.Fragment>
                                {medicalRecord.hearing==='Si'?`${medicalRecord.hearingD}`:`No`}
                            </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary="Patologias cardiacas:"
                            secondary={
                            <React.Fragment>
                                {medicalRecord.heart==='Si'?`${medicalRecord.heartD}`:`No`}
                            </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary="Hernias:"
                            secondary={
                            <React.Fragment>
                                {medicalRecord.hernia==='Si'?`${medicalRecord.herniaD}`:`No`}
                            </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary="Hipertensión:"
                            secondary={
                            <React.Fragment>
                                {medicalRecord.hypertension==='Si'?`${medicalRecord.hypertensionD}`:`No`}
                            </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary="Hipotensión:"
                            secondary={
                            <React.Fragment>
                                {medicalRecord.hypotension==='Si'?`${medicalRecord.hypotensionD}`:`No`}
                            </React.Fragment>
                            }
                        />
                    </ListItem>
                </List>
                <List className={classes.root}>
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary="Medicinas:"
                            secondary={
                            <React.Fragment>
                                {medicalRecord.medicines==='Si'?`${medicalRecord.medicinesD}`:`No`}
                            </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary="Problemas psiquiátricos:"
                            secondary={
                            <React.Fragment>
                                {medicalRecord.psychiatric==='Si'?`${medicalRecord.psychiatricD}`:`No`}
                            </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary="Problemas psicológicos::"
                            secondary={
                            <React.Fragment>
                                {medicalRecord.psychological==='Si'?`${medicalRecord.psychologicalD}`:`No`}
                            </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary="Convulsiones::"
                            secondary={
                            <React.Fragment>
                                {medicalRecord.seizures==='Si'?`${medicalRecord.seizuresD}`:`No`}
                            </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary="Sinusitis:"
                            secondary={
                            <React.Fragment>
                                {medicalRecord.sinusitis==='Si'?`${medicalRecord.sinusitisD}`:`No`}
                            </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary="Problemas de columna:"
                            secondary={
                            <React.Fragment>
                                {medicalRecord.spine==='Si'?`${medicalRecord.spineD}`:`No`}
                            </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary="Protesis:"
                            secondary={
                            <React.Fragment>
                                {medicalRecord.surgeryProt==='Si'?`${medicalRecord.surgeryProtD}`:`No`}
                            </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary="Problemas de visión:"
                            secondary={
                            <React.Fragment>
                                {medicalRecord.visual==='Si'?`${medicalRecord.visualD}`:`No`}
                            </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary="Otros:"
                            secondary={
                            <React.Fragment>
                                {medicalRecord.others==='Si'?`${medicalRecord.othersD}`:`No`}
                            </React.Fragment>
                            }
                        />
                    </ListItem>
                </List> 
            </div>
        )
    } else {
        return(
            <Typography variant='h2' component='h5'>
                No tiene registro médico
            </Typography>
        )
    }
}

export default UserMedRec;

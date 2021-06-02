// import React from 'react';
// import Button from '@material-ui/core/Button';
// import styles from './UserMedRec.module.css';

// function UserMedRec() {
//     return (
//         <div className={styles.container}>
//             <a
//                 href={`../mymedicalrecords/pdf`}
//                 target='_blank'
//                 rel='noreferrer'
//             >
//                 <Button variant='outlined' color='secondary'>
//                     Ir a mi ficha medica
//                 </Button>
//             </a>
//         </div>
//     );
// }

// export default UserMedRec;
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import styles from './UserMedRec.module.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import supabase from '../../../supabase.config';

const useStyles = makeStyles({
    root: {
        display:'flex',
        justifyContent:'space-around',
        minWidth: 300,
    },
    title: {
      fontSize: 14,
    },
    pos: {
        
        // marginBottom: 12,
    },
  });

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
            setMedicalRecord(record[0].declaration);
        } catch (err) {
            return err;
        }
    }
    console.log('Medical record:',medicalRecord)

    return (
        // <div className={styles.container}>
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h5" component="h3">
                        Alergias:
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.allergies==='Si'?`${medicalRecord.allergiesD}`:`No`}
                    </Typography>
                    <Typography variant="h5" component="h3">
                        Asma:
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.asthma==='Si'?`${medicalRecord.asthmaD}`:`No`}
                    </Typography>
                    <Typography variant="h5" component="h3">
                        Diabetes:
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.diabetes==='Si'?`${medicalRecord.diabetesD}`:`No`}
                    </Typography>
                    <Typography variant="h5" component="h3">
                        Desmayos:
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.fainting==='Si'?`${medicalRecord.faintingD}`:`No`}
                    </Typography>
                    <Typography variant="h5" component="h3">
                        Patologias auditivas:
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.hearing==='Si'?`${medicalRecord.hearingD}`:`No`}
                    </Typography>
                    <Typography variant="h5" component="h3">
                        Patologias cardiacas:
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.heart==='Si'?`${medicalRecord.heartD}`:`No`}
                    </Typography>
                    <Typography variant="h5" component="h3">
                        Hernias:
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.hernia==='Si'?`${medicalRecord.herniaD}`:`No`}
                    </Typography>
                    <Typography variant="h5" component="h3">
                        Hipertensión:
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.hypertension==='Si'?`${medicalRecord.hypertensionD}`:`No`}
                    </Typography>
                    <Typography variant="h5" component="h3">
                        Hipotensión:
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.hypotension==='Si'?`${medicalRecord.hypotensionD}`:`No`}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="h5" component="h3">
                        Medicinas:
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.medicines==='Si'?`${medicalRecord.medicinesD}`:`No`}
                    </Typography>
                    <Typography variant="h5" component="h3">
                        Problemas psiquiátricos:
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.psychiatric==='Si'?`${medicalRecord.psychiatricD}`:`No`}
                    </Typography>
                    <Typography variant="h5" component="h3">
                        Problemas psicológicos:
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.psychological==='Si'?`${medicalRecord.psychologicalD}`:`No`}
                    </Typography>
                    <Typography variant="h5" component="h3">
                        Convulsiones:
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.seizures==='Si'?`${medicalRecord.seizuresD}`:`No`}
                    </Typography>
                    <Typography variant="h5" component="h3">
                        Sinusitis:
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.sinusitis==='Si'?`${medicalRecord.sinusitisD}`:`No`}
                    </Typography>
                    <Typography variant="h5" component="h3">
                        Problemas de columna:
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.spine==='Si'?`${medicalRecord.spineD}`:`No`}
                    </Typography>
                    <Typography variant="h5" component="h3">
                        Protesis:
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.surgeryProt==='Si'?`${medicalRecord.surgeryProtD}`:`No`}
                    </Typography>
                    <Typography variant="h5" component="h3">
                        Problemas de visión:
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.visual==='Si'?`${medicalRecord.visualD}`:`No`}
                    </Typography>
                    <Typography variant="h5" component="h3">
                        Otros:
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.others==='Si'?`${medicalRecord.othersD}`:`No`}
                    </Typography>
                </CardContent>
                </Card>
        // </div>
    );
}

export default UserMedRec;

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
        marginTop: 550,
        minWidth: 300,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
        
        marginBottom: 12,
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
        <div className={styles.container}>
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.allergies==='Si'?`Alergias:${medicalRecord.allergiesD}`:`Alergias:No`}
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.asthma==='Si'?`Asma:${medicalRecord.asthmaD}`:`Asma:No`}
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.diabetes==='Si'?`Diabetes:${medicalRecord.diabetesD}`:`Diabetes:No`}
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.fainting==='Si'?`Desmayos:${medicalRecord.faintingD}`:`Desmayos:No`}
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.hearing==='Si'?`Patologias auditivas:${medicalRecord.hearingD}`:`Patologias auditivas:No`}
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.heart==='Si'?`Patologias cardiacas:${medicalRecord.heartD}`:`Patologias cardiacas:No`}
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.hernia==='Si'?`Hernias:${medicalRecord.herniaD}`:`Hernias:No`}
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.hypertension==='Si'?`Hipertensión:${medicalRecord.hypertensionD}`:`Hipertensión:No`}
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.hypotension==='Si'?`Hipotensión :${medicalRecord.hypotensionD}`:`Hipotensión :No`}
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.medicines==='Si'?`Medicinas:${medicalRecord.medicinesD}`:`Medicinas:No`}
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.psychiatric==='Si'?`Problemas psiquiátricos:${medicalRecord.psychiatricD}`:`Problemas psiquiátricos:No`}
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.psychological==='Si'?`Problemas psicológicos:${medicalRecord.psychologicalD}`:`Problemas psicológicos:No`}
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.seizures==='Si'?`Convulsiones:${medicalRecord.seizuresD}`:`Convulsiones:No`}
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.sinusitis==='Si'?`Sinusitis:${medicalRecord.sinusitisD}`:`Sinusitis:No`}
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.spine==='Si'?`Problemas de columna:${medicalRecord.spineD}`:`Problemas de columna:No`}
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.surgeryProt==='Si'?`Protesis:${medicalRecord.surgeryProtD}`:`Protesis:No`}
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.visual==='Si'?`Problemas de visión:${medicalRecord.visualD}`:`Problemas de visión:No`}
                    </Typography>
                    <Typography variant="h6" component="h3">
                        {medicalRecord.others==='Si'?`Otros:${medicalRecord.othersD}`:`Otros:No`}
                    </Typography>
                </CardContent>
                </Card>
        </div>
    );
}

export default UserMedRec;

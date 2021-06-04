import React from 'react';
import * as styles from './DatosRevision.module.css';
import Pdf from 'react-to-pdf';
import { Divider, Button, makeStyles } from '@material-ui/core';
const ref = React.createRef();

const useStyles = makeStyles(() => ({
    popupBtn: {
        color: '#fafafa',
        width: 'fit-content',
        marginLeft: '40px',
        border: '3px solid #2c7f7b',
        borderRadius: '5px',
        backgroundColor: '#2c7f7b',
        fontWeight: 'bold',
        fontSize: '15px',
        '&:hover': {
            backgroundColor: '#fafafa',
            color: '#2c7f7b',
        },
    },
}));
const DatosRevision = () => {
    const datosTitular = JSON.parse(localStorage.getItem('datosTitular'));
    const datosEmpresa = JSON.parse(localStorage.getItem('datosEmpresa'));
    const datosDeclaration = JSON.parse(
        localStorage.getItem('datosDeclaration')
    );

    const classes = useStyles();

    return (
        <div className={styles.form}>
            <div className={styles.title}>
                <h1>Revision de Datos <Divider></Divider> </h1>
            </div>
            <div id='lacolumna' className={styles.ajuste}>
                <div className={styles.datos}>
                    <div className={styles.datosTitular}>
                        <div className={styles.firstColumn}>
                            <h2>Datos del Titular</h2>
                            <Divider></Divider>
                            <h4>Nombre: {datosTitular.first_name}</h4>
                            <h4>Apellido: {datosTitular.last_name}</h4>
                            <h4>Genero: {datosTitular.gender}</h4>
                            <h4>DNI: {datosTitular.dni}</h4>
                            <h4>CUIL: {datosTitular.cuil}</h4>
                            <h4>Teléfono: {datosTitular.phone_number}</h4>
                            <h4>Email: {datosTitular.email}</h4>
                            <h4>Ocupación: {datosTitular.occupation}</h4>
                            <h4>Estado civil: {datosTitular.marital_status}</h4>
                            <h4>
                                Fecha de nacimiento: {datosTitular.birth_date}
                            </h4>
                            <h4>Calle: {datosTitular.street_name}</h4>
                            <h4>Numero: {datosTitular.number}</h4>
                            {datosTitular.floor ? (
                                <h4>Piso: {datosTitular.floor}</h4>
                            ) : null}
                            {datosTitular.apartment ? (
                                <h4>Departamento: {datosTitular.apartment}</h4>
                            ) : null}
                            <h4>
                                Provincia: {datosTitular.state.split('-')[1]}
                            </h4>
                            <h4>
                                Localidad: {datosTitular.locality.split('-')[1]}
                            </h4>
                        </div>
                        <div className={styles.datosEmpresa}>
                            <h2>Datos del Empresa <Divider></Divider></h2>

                            <h4>Razón Social:{datosEmpresa.bussines_name}</h4>
                            <h4>
                                Grupo empresarial:{datosEmpresa.bussines_group}
                            </h4>
                            <h4>
                                Nombre y apellido del Referente de RRHH:
                                {datosEmpresa.rh_name}
                            </h4>
                            <h4>Teléfono:{datosEmpresa.company_phone}</h4>
                            <h4>E-mail:{datosEmpresa.company_email}</h4>
                            <h4>CUIT:{datosEmpresa.company_cuit}</h4>
                        </div>
                    </div>

                    <div ref={ref} id='Declaration' className={styles.salud}>
                        <h2>Declaracion Jurada de Salud
                        <Divider></Divider>
                        </h2>
                    
                        <h4>DNI : {datosTitular.dni}</h4>
                        {datosDeclaration.diabetes === 'Si' ? (
                            <h4>
                                Diabetes<br></br>
                                {datosDeclaration.diabetesD}
                            </h4>
                        ) : null}
                        {datosDeclaration.heart === 'Si' ? (
                            <h4>
                                Condiciones Cardíacas<br></br>{' '}
                                {datosDeclaration.heartD}
                            </h4>
                        ) : null}

                        {datosDeclaration.hernia === 'Si' ? (
                            <h4>
                                Hernia<br></br> {datosDeclaration.herniaD}
                            </h4>
                        ) : null}

                        {datosDeclaration.allergies === 'Si' ? (
                            <h4>
                                Alergias <br></br>
                                {datosDeclaration.allergiesD}
                            </h4>
                        ) : null}

                        {datosDeclaration.seizures === 'Si' ? (
                            <h4>
                                Convulsiones <br></br>
                                {datosDeclaration.seizuresD}
                            </h4>
                        ) : null}

                        {datosDeclaration.asthma === 'Si' ? (
                            <h4>
                                Asma <br></br>
                                {datosDeclaration.asthmaD}
                            </h4>
                        ) : null}

                        {datosDeclaration.sinusitis === 'Si' ? (
                            <h4>
                                Sinusitis, Adenoides, Otitis a repetición
                                <br></br>
                                {datosDeclaration.sinusitisD}
                            </h4>
                        ) : null}

                        {datosDeclaration.hypertension === 'Si' ? (
                            <h4>
                                Hipertensión<br></br>{' '}
                                {datosDeclaration.hypertensionD}
                            </h4>
                        ) : null}

                        {datosDeclaration.hypotension === 'Si' ? (
                            <h4>
                                Hipotensión<br></br>
                                {datosDeclaration.hypotensionD}
                            </h4>
                        ) : null}

                        {datosDeclaration.others === 'Si' ? (
                            <h4>
                                Otros<br></br>
                                {datosDeclaration.othersD}
                            </h4>
                        ) : null}
                        

                        {datosDeclaration.surgeryProt === 'Si' ? (
                            <h4>
                                {' '}
                                Operaciones/Protesís <br></br>
                                {datosDeclaration.surgeryProtD}
                                                            </h4>
                        ) : null}
                        

                        {datosDeclaration.hearing === 'Si' ? (
                            <h4>
                                {' '}
                                Dificultades Auditivas<br></br>
                                
                                {datosDeclaration.hearingD}
                            </h4>
                        ) : null}

                        {datosDeclaration.visual === 'Si' ? (
                            <h4>
                                Dificultades visuales<br></br>
                                {datosDeclaration.visualD}
                            </h4>
                        ) : null}

                        {datosDeclaration.spine === 'Si' ? (
                            <h4>
                                Desviación de Columna<br></br>
                                {datosDeclaration.spineD}
                            </h4>
                        ) : null}

                        {datosDeclaration.fainting === 'Si' ? (
                            <h4>
                                {' '}
                                Desmayos<br></br>
                                {datosDeclaration.faintingD}
                            </h4>
                        ) : null}
                        

                        {datosDeclaration.psychological === 'Si' ? (
                            <h4>
                                Tratamiento Psicologico<br></br>
                                
                                {datosDeclaration.psychologicalD}
                            </h4>
                        ) : null}

                        {datosDeclaration.psychiatric === 'Si' ? (
                            <h4>
                                Tratamiento psiquiátrico<br></br>
                                {datosDeclaration.psychiatricD}
                            </h4>
                        ) : null}

                        {datosDeclaration.medicines === 'Si' ? (
                            <h4>
                                {' '}
                                Toma los siguientes medicamentos<br></br>{' '}
                                {datosDeclaration.medicinesD}
                            </h4>
                        ) : null}
                    </div>
                </div>
            </div>

            <Pdf targetRef={ref} filename={`Partner-${datosDeclaration.dni}`}>
                {({ toPdf }) => (
                    <Button
                        className={classes.popupBtn}
                        variant='contained'
                        onClick={toPdf}
                    >
                        Descargar en Pdf
                    </Button>
                )}
              
            </Pdf>
        </div>
    );
};
export default DatosRevision;

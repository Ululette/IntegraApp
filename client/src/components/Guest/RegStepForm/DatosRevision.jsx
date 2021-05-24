import React from 'react';
import * as styles from './DatosRevision.module.css';
import Pdf from 'react-to-pdf';
const ref = React.createRef();

const DatosRevision = () => {
    const datosTitular = JSON.parse(localStorage.getItem('datosTitular'));
    const datosEmpresa = JSON.parse(localStorage.getItem('datosEmpresa'));
    const datosSalud = JSON.parse(localStorage.getItem('datosSalud'));

    return (
        <div className={styles.form}>
            <div className={styles.title}>
                <h1>Revision de Datos </h1>
            </div>
            <div id='lacolumna' className={styles.ajuste}>
                <div className={styles.datos}>
                    <div className={styles.datosTitular}>
                        <div className={styles.firstColumn}>
                            <h2>Datos del Titular</h2>
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
                            <h4>Piso/Depto: {datosTitular.apartment}</h4>
                            <h4>
                                Provincia: {datosTitular.state.split('-')[1]}
                            </h4>
                            <h4>
                                Localidad: {datosTitular.locality.split('-')[1]}
                            </h4>
                        </div>
                        <div className={styles.datosEmpresa}>
                            <h2>Datos del Empresa</h2>

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
                        </div>
                    </div>
                    <div ref={ref} id='Salud' className={styles.salud}>
                        <h2> Declaracion jurada antecedentes de Salud </h2>
                        <h4>Nombre completo: {datosSalud.completeName}</h4>
                        <h4>DNI: {datosSalud.dni}</h4>
                        {datosSalud.surgeryRad === 'Si' ? (
                            <div className={styles.segmentos}>
                                <h4>Cirugias</h4>
                                <h4>Tipo:{datosSalud.typeSurgery}</h4>
                                <h4>
                                    Diagnostico:{datosSalud.surgeryDiagnosis}
                                </h4>
                                <h4>Fecha:{datosSalud.dateSurgery}</h4>
                            </div>
                        ) : null}
                        {datosSalud.paceMakerRad === 'Si' ? (
                            <h4>Posee Marcapasos o CardioDesfribilador</h4>
                        ) : null}
                        {datosSalud.prosthesisRad === 'Si' ? (
                            <div className={styles.segmentos}>
                                <h4>Datos de protesis</h4>
                                <h4>
                                    Fecha de Colocacion:{' '}
                                    {datosSalud.prosthesisDate}
                                </h4>
                                <h4>Tipo: {datosSalud.typeProsthesis}</h4>
                            </div>
                        ) : null}
                        {datosSalud.psychiatricRad === 'Si' ? (
                            <h4>
                                Posee antecedentes de enfermedades Psiquiatricas
                            </h4>
                        ) : null}
                        {datosSalud.psychActuallyRad === 'Si' ? (
                            <div className={styles.segmentos}>
                                <h4>Tratamiento Psiquiatrico</h4>
                                <h4>Diagnostico:{datosSalud.psychDiagnosis}</h4>
                                <h4>Medicacion:{datosSalud.psychMeds}</h4>
                                <h4>
                                    Internaciones:
                                    {datosSalud.psychhospitalization}
                                </h4>
                                <h4>
                                    Fecha: {datosSalud.psychhospitalizationDate}
                                </h4>
                            </div>
                        ) : null}
                        {datosSalud.hospitalizationRad === 'Si' ? (
                            <div className={styles.segmentos}>
                                <h4>Internaciones clinicas</h4>
                                <h4>
                                    Motivo: {datosSalud.hospitalizationReason}
                                </h4>
                                <h4>Fecha: {datosSalud.hospitalizationDate}</h4>
                            </div>
                        ) : null}
                        {datosSalud.otherTreatmentsRad === 'Si' ? (
                            <div className={styles.segmentos}>
                                <h4>
                                    Tratamientos actuales: {datosSalud.otherT}
                                </h4>
                                <h4>
                                    Diagnostico:{datosSalud.otherTDiagnosis}
                                </h4>
                                <h4>
                                    Medico Tratante:{datosSalud.otherTMedic}
                                </h4>
                                <h4>Telefono: {datosSalud.otherTNumber}</h4>
                            </div>
                        ) : null}
                        <h4>
                            Ultima fecha de estudios-analisis:{' '}
                            {datosSalud.medicalStudiesDate}
                        </h4>
                        {datosSalud.medicalResultsRad === 'No' ? (
                            <div className={styles.segmentos}>
                                <h4>
                                    Diagnostico: {datosSalud.studiesDiagnostic}
                                </h4>
                            </div>
                        ) : null}
                        {datosSalud.hereditaryDiseasesRad === 'Si' ? (
                            <div className={styles.segmentos}>
                                <h4>
                                    Enfermedades congenitas o Hereditarias:
                                    {datosSalud.hereditaryDiseases}
                                </h4>
                            </div>
                        ) : null}
                        {datosSalud.bloodTransRad === 'Si' ? (
                            <div className={styles.segmentos}>
                                <h4>transfusiones de sangre</h4>
                                <h4>Causa: {datosSalud.bloodTransReason}</h4>
                                <h4>Fecha: {datosSalud.bloodTransDate}</h4>
                            </div>
                        ) : null}
                        {datosSalud.pregnantRad === 'Si' ? (
                            <h4> Transita un Embarazo</h4>
                        ) : null}
                        {datosSalud.childrens !== '0' ? (
                            <h4>Tiene {datosSalud.childrens} hijo/s</h4>
                        ) : null}
                        {datosSalud.studiesSixMonthsRad === 'Si' ? (
                            <div className={styles.segmentos}>
                                <h4>
                                    requiere atencion en los proximos 6 meses
                                    por:
                                    {datosSalud.studiesSixMonthsD}
                                </h4>
                            </div>
                        ) : null}

                        {datosSalud.visionHearingRad === 'Si' ? (
                            <div className={styles.segmentos}>
                                <h4>
                                    Dificultades de Vision/Audicion:{' '}
                                    {datosSalud.VHDetail}
                                </h4>
                                <h4>Diagnostico: {datosSalud.VHDiagnostic}</h4>
                            </div>
                        ) : null}

                        {datosSalud.diabetesRad === 'Si' ? (
                            <div className={styles.segmentos}>
                                <h4>
                                    {' '}
                                    presenta o ha presentado alguna de las
                                    siguientes patologias diabetes tipo 1 o 2,
                                    VIH, hepatitis B, hepatitis C, tuberculosis,
                                    mal de Chagas
                                </h4>
                            </div>
                        ) : null}

                        {datosSalud.otherDiabetesRad === 'Si' ? (
                            <div className={styles.segmentos}>
                                <h4>
                                    Presenta la siguiente patologia:
                                    {datosSalud.otherDiabetes}
                                </h4>
                            </div>
                        ) : null}
                        {datosSalud.adictionsRad === 'Si' ? (
                            <div className={styles.segmentos}>
                                <h4>
                                    Presenta/o adicciones:
                                    {datosSalud.adictionsDetail}
                                </h4>
                            </div>
                        ) : null}
                        {datosSalud.treatmentAdictionsRad === 'Si' ? (
                            <div className={styles.segmentos}>
                                <h4>Tratamiento de adicciones:</h4>
                                <h4>Fecha: {datosSalud.treatmentDate}</h4>
                            </div>
                        ) : null}
                        {datosSalud.eatingDisordersRad === 'Si' ? (
                            <div className={styles.segmentos}>
                                <h4>Desordenes alimenticios:</h4>
                                <h4>{datosSalud.eatingDisordersD}</h4>
                            </div>
                        ) : null}

                        <h4>Peso: {datosSalud.weight}Kg</h4>
                        <h4>Altura:{datosSalud.height}Cm</h4>
                        {datosSalud.disabilityCertRad === 'Si' ? (
                            <div className={styles.segmentos}>
                                <h4>Posee Certificado de Discapacidad</h4>
                            </div>
                        ) : null}

                        {datosSalud.otherPatRad === 'Si' ? (
                            <div className={styles.segmentos}>
                                <h4>Otras patologias:</h4>
                                <h4>{datosSalud.otherPatD}</h4>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>

            <Pdf targetRef={ref} filename={`Partner-${datosSalud.dni}`}>
                {({ toPdf }) => (
                    <button onClick={toPdf}> probando ese pdf</button>
                )}
            </Pdf>
        </div>
    );
};
export default DatosRevision;

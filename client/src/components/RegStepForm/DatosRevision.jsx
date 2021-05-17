import React from "react"
import * as styles from './DatosRevision.module.css'


const DatosRevision = () =>{

	const datosTitular = JSON.parse(localStorage.getItem('datosTitular'));
	const datosEmpresa = JSON.parse(localStorage.getItem('datosEmpresa'));

	return (
		<div className={styles.form}>

			<div className={styles.title}>
				<h1>Revision de Datos</h1>
			</div>

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
						<h4>Fecha de nacimiento: {datosTitular.birth_date}</h4>
						<h4>Calle: {datosTitular.street_name}</h4>
						<h4>Numero: {datosTitular.number}</h4>
						<h4>Piso/Depto: {datosTitular.apartment}</h4>
						<h4>Provincia:  {datosTitular.state.split("-")[1]}</h4>
						<h4>Localidad: {datosTitular.locality.split("-")[1]}</h4>
					</div>
				</div>
				<div className={styles.datosEmpresa}>
					<h2>Datos del Empresa</h2>

					<h4>Razón Social:{datosEmpresa.bussines_name}</h4>
					<h4>Grupo empresarial:{datosEmpresa.bussines_group}</h4>
					<h4>Nombre y apellido del Referente de RRHH:{datosEmpresa.rh_name}</h4>
					<h4>Teléfono:{datosEmpresa.company_phone}</h4>
					<h4>E-mail:{datosEmpresa.company_email}</h4>
				</div>
			</div>
		</div>
		)
}
export default DatosRevision
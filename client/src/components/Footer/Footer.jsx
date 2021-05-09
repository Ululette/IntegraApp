import React from 'react';
// import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import Iconos from './Iconos';
//rfc
export default function Footer() {
  return (
    <div className={styles.allfoot} >
      <ul className={`text-left  ${styles.listunstyled}`}>
        <li>Superintendencia de Servicios de Salud</li>
        <li>Organo Control de Obras Sociales y entidades de Medicina Prepaga</li>
        <li>0800-222-SALUD (72583) |
          <a href="http://www.sssalud.gob.ar" className="link-unstyled" to="http://www.sssalud.gob.ar" target="_blank">
            www.sssalud.gob.ar
          </a>
          | RNEMP Nº 132
        </li>
      </ul>
      <ul className={`col-sm-3 col-xs-3  ${styles.listunstyled}`} >
        <li>
          {/* <Link to='/integraclientes/sobre_nosotros' className={styles.ftlink}> */}
            Sobre Nosotros
          {/* </Link> */}
        </li>
        <li>
          {/* <Link to='/integraclientes/privacidad' className={styles.ftlink}> */}
            Política de privacidad
          {/* </Link> */}
        </li>
        <li>
          {/* <Link to='/prepagaclientes/lineaDenuncias' className={styles.ftlink}> */}
            Línea de denuncias
          {/* </Link> */}
        </li>
        <li>
          {/* <Link to='/prepagaclientes/solicitud-baja' className={styles.ftlink}> */}
            Solicitud de baja
          {/* </Link> */}
        </li>
        <li>
          {/* <Link to='/prepagaclientes/solicitud-arrepentimiento' className={styles.ftlink}> */}
            Solicitud de arrepentimiento
          {/* </Link> */}
        </li>
      </ul>
      <div className={`col-sm-3 col-xs-3`}>
        <ul className={styles.listunstyled}>
          <li>
          {/* <Link to='/IntegraSalud.jobs.com' className={styles.ftlink}> */}
            Trabajá con nosotros
          {/* </Link> */}
          </li>
        </ul>
      <Iconos />
    </div>      
    </div >
  );
}
import React from 'react';
// import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import Iconos from './Iconos.jsx';
//rfc
export default function Footer({ history }) {
    const location = history.location.pathname;
    return location.includes('admin') || location === '/login' ? null : (
        <div className={styles.allfoot}>
            <ul className={`text-left  ${styles.listunstyled}`}>
                <li>Superintendencia de Servicios de Salud</li>
                <li>
                    Organo Control de Obras Sociales y entidades de Medicina
                    Prepaga
                </li>
                <li>
                    0800-222-SALUD (72583) |
                    <a
                        href='http://www.sssalud.gob.ar'
                        className='link-unstyled'
                    >
                        www.sssalud.gob.ar
                    </a>
                    | RNEMP Nº 132
                </li>
            </ul>
            <ul className={`col-sm-3 col-xs-3  ${styles.listunstyled}`}>
                <li>Sobre Nosotros</li>
                <li>Política de privacidad</li>
                <li>Línea de denuncias</li>
                <li>Solicitud de baja</li>
                <li>Solicitud de arrepentimiento</li>
            </ul>
            <div className={`col-sm-3 col-xs-3`}>
                <ul className={styles.listunstyled}>
                    <li>Trabajá con nosotros</li>
                </ul>
                <Iconos />
            </div>
        </div>
    );
}

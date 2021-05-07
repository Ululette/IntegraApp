import React from 'react';
import styles from './Iconos.module.css';
import Logofb from '../../assets/facebook.png';
import Logoli from '../../assets/linkedin.png';
import Logotwitter from '../../assets/twitter.png';
import Logoenv from '../../assets/envelope.png';

export default function Iconos() {
  return (
    <div >
      <div className={styles.ft_followup}>¡Seguinos!</div>
      <div className={styles.ft_iconos}>
        {/* <a href="https://www.facebook.com/IntegraSalud/" target="_blank"> */}
        <img className={styles.ft_logo} src={Logofb} alt="FacebookIcon.png" />
        {/* </a> */}
        {/* <a href="https://ar.linkedin.com/company/swissmedicalgroup" target="_blank"> */}
        <img className={styles.ft_logo} src={Logoli} alt="LinkedinIcon.png" />
        {/* </a> */}
        {/* <a href="https://twitter.com/SwissMedicalG" target="_blank"> */}
        <img className={styles.ft_logo} src={Logotwitter} alt="TwitterIcon.png" />
        {/* </a> */}
        {/* <a href="mailto:info@IntegraSalud.com.ar" target="_blank"> */}
        <img className={styles.ft_env} src={Logoenv} alt="EnvelopeIcon.png" />
        {/* </a> */}
      </div>
    </div>
  );
}
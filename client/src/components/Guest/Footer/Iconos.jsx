import React from 'react';
import styles from './Iconos.module.css';
import Logofb from '../../../assets/icons/facebook.png';
import Logoli from '../../../assets/icons/linkedin.png';
import Logotwitter from '../../../assets/icons/twitter.png';
import Logoenv from '../../../assets/icons/envelope.png';

export default function Iconos() {
    return (
        <div className={styles.container}>
            <h4 className={styles.ft_followup}>¡Seguinos!</h4>
            <div className={styles.ft_iconos}>
                <img
                    className={styles.ft_logo}
                    src={Logofb}
                    alt='FacebookIcon.png'
                />
                <img
                    className={styles.ft_logo}
                    src={Logoli}
                    alt='LinkedinIcon.png'
                />
                <img
                    className={styles.ft_logo}
                    src={Logotwitter}
                    alt='TwitterIcon.png'
                />
                <img
                    className={styles.ft_env}
                    src={Logoenv}
                    alt='EnvelopeIcon.png'
                />
            </div>
        </div>
    );
}

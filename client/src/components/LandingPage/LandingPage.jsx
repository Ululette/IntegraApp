import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './LandingPage.module.css';
import InfoPlanes from '../InfoPlans/InfoPlanes.jsx';
import ContactForm from '../ContactForm/ContactForm.jsx';
import Carousel from './Carousel.jsx';

export default function LandingPage() {
    return (
        <div className={styles.all}>
            <div className={styles.first}>
                <div className={styles.typewriter}>
                    <h1>Bienvenido</h1>
                </div>
                <img
                    id={styles.dr1}
                    src='https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
                    alt=''
                />
            </div>

            <div className={styles.icons}>
                <div className={styles.icon}>
                    <img
                        className={styles.each}
                        src='https://image.flaticon.com/icons/png/128/3063/3063181.png'
                        alt=''
                    />
                </div>
                <div className={styles.icon}>
                    <img
                        className={styles.each}
                        src='https://image.flaticon.com/icons/png/128/1067/1067566.png'
                        alt=''
                    />
                </div>

                <div className={styles.icon}>
                    <NavLink to='/faqs'>
                        <img
                            className={styles.each}
                            src='https://image.flaticon.com/icons/png/128/2618/2618540.png'
                            alt=''
                        />
                    </NavLink>
                </div>
            </div>
            <div className={styles.info}>
                <p className={styles.des}>
                    Urgencias y emergencias - 0810-454-999{' '}
                </p>
                <p className={styles.des}>
                    Orientación medica telefonica - 0810-963-952{' '}
                </p>
                <p className={styles.des}>Preguntas frecuentes</p>
            </div>

            <div className={styles.app}>
                <div id={styles.photo}></div>
                <div className={styles.adjust}>
                    <div className={styles.mob}>
                        <h2>Integra mobile</h2>
                        <p className={styles.desM}>
                            Toda la información que necesitas en un solo lugar
                        </p>
                    </div>
                    <div className={styles.images}>
                        <img
                            className={styles.deco}
                            src='https://image.flaticon.com/icons/png/128/3538/3538424.png'
                            alt=''
                        />
                        <img
                            className={styles.deco}
                            src='https://image.flaticon.com/icons/png/128/2937/2937428.png'
                            alt=''
                        />
                        <img
                            className={styles.deco}
                            src='https://image.flaticon.com/icons/png/128/4163/4163340.png'
                            alt=''
                        />
                    </div>
                </div>
            </div>

            <div id={styles.nov}>
                <h3>Novedades</h3>
            </div>
            <div className={styles.news}>
                <Carousel />
            </div>
            <div className={styles.digital}>
                <div className={styles.doctor}></div>
                <div className={styles.cd}>
                    <h2 className={styles.credential}>Credencial digital</h2>
                    <p className={styles.desC}>
                        📱 La credencial va siempre con vos y sin ocupar lugar
                        en tu billetera
                    </p>
                    <p className={styles.desC}>
                        📱Todas las credenciales de tu grupo familiaren un solo
                        lugar
                    </p>
                </div>
            </div>

            <div id={styles.nov}>
                <h3>Nuestros planes</h3>
            </div>
            <div className={styles.plans}>
                <InfoPlanes id='infoPlans' />
            </div>
            <div id='contact'>
                <ContactForm />
            </div>
        </div>
    );
}

import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './LandingPage.module.css';
import InfoPlanes from '../InfoPlans/InfoPlanes.jsx';
import ContactForm from '../ContactForm/ContactForm.jsx';
import Carousel from './Carousel.jsx';
import anime from 'animejs/lib/anime.es.js';

export default function LandingPage() {
    // const path = anime.path('#svgLinear path');

    // useEffect(() => {
    //     anime({
    //         targets: '#squareSvg',
    //         translateX: path('x'),
    //         translateY: path('y'),
    //         rotate: path('angle'),
    //         easing: 'linear',
    //         duration: 2000,
    //         loop: true,
    //     });
    // });

    return (
        <div className={styles.all}>
            <header className={styles.first}>
                {/* <div className={styles.typewriter}>
                    <h2 id={styles.welcome}>Bienvenido</h2>
                </div> */}
                <div className={styles.videoContainer}>
                    <video
                        src='../../../assets/videos/banner.mp4'
                        autoPlay
                        muted
                        loop
                        playsInline
                    ></video>
                </div>
            </header>
            <section className={styles.promotions}>
                <div className={styles.iconsScreen2}>
                    <div className={styles.icon1}>
                        <img
                            src='../../../assets/icons/phoneheart.gif'
                            alt='Icon 1.'
                        />
                    </div>
                    <div className={styles.icon2_3}>
                        <img
                            src='../../../assets/icons/medicphone.gif'
                            alt='Icon 2.'
                        />
                        <h2 className={styles.subtitlePromotions}>
                            <div>
                                Toda la informacion que necesitas{' '}
                                <span className={styles.blueSpan}>
                                    en un solo lugar
                                </span>
                                .
                            </div>
                            <div className={styles.subtitlePromotions2}>
                                Usa la tecnologia a tu favor y lleva tu vida a
                                un mejor rumbo.
                            </div>
                        </h2>
                        <img
                            src='../../../assets/icons/medicrecords.gif'
                            alt='Icon 3.'
                        />
                    </div>
                </div>
                <h1 className={styles.bigTitlePromotions}>
                    <div className={styles.title1}>Tu mejor opcion</div>
                    <div className={styles.title2}>Tu Prepaga</div>
                    <div className={styles.title3}>Integra Salud</div>
                </h1>
            </section>
            <section className={styles.promotions2}>
                <div className={styles.promotions2_titles}>
                    <h3>Documentos virtuales</h3>
                    <h3>Todo al alcance de tu mano</h3>
                    <h3>La mas alta seguridad</h3>
                </div>
                <div className={styles.promotions2_descriptions}>
                    <h4 className={styles.promotions2_eachDescription}>
                        Ten todas tus recetas, ordenes y estudios en tu celular,
                        y descargalos apenas los necesites de manera inmediata.
                    </h4>
                    <h4 className={styles.promotions2_eachDescription}>
                        Tendras todas las herramientas necesarias para consultar
                        a tu medico en la palma de tu mano.
                    </h4>
                    <h4 className={styles.promotions2_eachDescription}>
                        Guardamos tu informacion en Storages con cifrado de
                        extremo a extremo.
                    </h4>
                </div>
            </section>
            {/* <section className={styles.infoAll}>
                <div className={styles.icons}>
                    <article className={styles.icon}>
                        <img
                            className={styles.each}
                            src='https://image.flaticon.com/icons/png/128/3063/3063181.png'
                            alt=''
                        />
                    </article>
                    <article className={styles.icon}>
                        <img
                            className={styles.each}
                            src='https://image.flaticon.com/icons/png/128/1067/1067566.png'
                            alt=''
                        />
                    </article>

                    <article className={styles.icon}>
                        <NavLink to='/faqs'>
                            <img
                                className={styles.each}
                                src='https://image.flaticon.com/icons/png/128/2618/2618540.png'
                                alt=''
                            />
                        </NavLink>
                    </article>
                </div>
                <article className={styles.info}>
                    <p className={styles.des}>
                        Urgencias y emergencias - 0810-454-999
                    </p>
                    <p className={styles.des}>
                        Orientación medica telefonica - 0810-963-952
                    </p>
                    <p className={styles.des}>Preguntas frecuentes</p>
                </article>
            </section> */}
            {/* <section className={styles.app}>
                <div id={styles.photo}></div>
                <div className={styles.adjust}>
                    <div className={styles.mob}>
                        <h2 className={styles.h2h}>Integra mobile</h2>
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
            </section> */}
            <section className={styles.carrouselNews}>
                <h3 id={styles.nov}>Novedades</h3>
                <article className={styles.news}>
                    <Carousel />
                </article>
            </section>

            <section className={styles.digital}>
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
            </section>
            <h3 id={styles.nov}>Nuestros planes</h3>
            <section className={styles.plans}>
                <InfoPlanes id='infoPlans' />
            </section>
            <section id='contact'>
                <ContactForm />
            </section>
        </div>
    );
}

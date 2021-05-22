import React from 'react';
import styles from './LandingPage.module.css';
import InfoPlanes from '../InfoPlans/InfoPlanes.jsx';
import ContactForm from '../ContactForm/ContactForm.jsx';
import Carousel from './Carousel.jsx';
import StarsBackground from './StarsBackground.jsx';
// import anime from 'animejs/lib/anime.es.js';

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
                        src='../../../assets/videos/banner.webm'
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
                            src='../../../assets/icons/ambulancee.png'
                            alt='Icon 1.'
                        />
                    </div>
                    <div className={styles.icon2_3}>
                        <img
                            src='../../../assets/icons/medicphonee.png'
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
                            src='../../../assets/icons/medicrecordd.png'
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
            <section className={styles.carrouselNews}>
                <h3 className={styles.nov}>Novedades</h3>
                <article className={styles.news}>
                    <Carousel />
                </article>
            </section>

            <section className={styles.digital}>
                <StarsBackground />
                <h2 className={styles.digitalTitle}>
                    <div>Credencial digital</div>
                    <div className={styles.digitalSubtitle}>
                        Innovamos para estar cada dia mas cerca tuyo!
                    </div>
                </h2>
                <div className={styles.digitalDescriptions}>
                    <p className={styles.digitalDescription1}>
                        📱 La credencial va siempre con vos y sin ocupar lugar
                        en tu billetera.
                    </p>
                    <p className={styles.digitalDescription2}>
                        📱Todas las credenciales de tu grupo familiar en un solo
                        lugar.
                    </p>
                </div>
            </section>
            <section className={styles.ourPlans}>
                <InfoPlanes id='infoPlans' />
            </section>
            <section id='contact'>
                <ContactForm />
            </section>
        </div>
    );
}

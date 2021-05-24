import React, { useEffect } from 'react';
import styles from './LandingPage.module.css';
import InfoPlanes from '../InfoPlans/InfoPlanes.jsx';
import ContactForm from '../ContactForm/ContactForm.jsx';
import Carousel from './Carousel.jsx';
import StarsBackground from './StarsBackground.jsx';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Chatbot from '../Chatbot/Chatbot.jsx';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        position: 'fixed',
        backgroundColor: '#213e3b',
        borderRadius: '50%',
        width: '75px',
        height: '75px',
        zIndex: 100,
        bottom: 100,
        right: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
    },
    icon: {
        color: '#fff',
        width: '100%',
        height: '100%',
    },
    chat: {},
}));

export default function LandingPage() {
    const classes = useStyles();
    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={styles.all}>
            <header data-aos='zoom-in' className={styles.first}>
                <div className={styles.typewriter}>
                    <h2 className={styles.welcome}>Bienvenido a</h2>
                    <h2 className={styles.welcome2}>Integra Salud</h2>
                </div>
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
            <section data-aos='zoom-out' className={styles.promotions}>
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
                                Toda la informacion que necesitas en un solo
                                lugar .
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
                    <div
                        data-aos='zoom-in'
                        data-aos-duration='1000'
                        className={styles.title1}
                    >
                        Tu mejor opcion
                    </div>
                    <div
                        data-aos='zoom-in'
                        data-aos-duration='1000'
                        data-aos-delay='400'
                        className={styles.title2}
                    >
                        Tu Prepaga
                    </div>
                    <div
                        data-aos='zoom-in'
                        data-aos-duration='1000'
                        data-aos-delay='800'
                        className={styles.title3}
                    >
                        Integra Salud
                    </div>
                </h1>
            </section>
            <section data-aos='fade-down' className={styles.promotions2}>
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

            <section data-aos='zoom-out-down' className={styles.carrouselNews}>
                <video
                    src='../../../assets/videos/newsVideo.mp4'
                    muted
                    autoPlay
                    loop
                    playsInline
                ></video>
                <div className={styles.infoAll}>
                    <h2 className={styles.nov}>
                        Informacion y numeros de contacto
                    </h2>
                    <div className={styles.icons}>
                        <div
                            data-aos='zoom-in'
                            data-aos-duration='1000'
                            className={styles.icon}
                        >
                            <img
                                className={styles.each}
                                src='https://image.flaticon.com/icons/png/128/3063/3063181.png'
                                alt=''
                            />
                        </div>
                        <div
                            data-aos='zoom-in'
                            data-aos-duration='1000'
                            data-aos-delay='400'
                            className={styles.icon}
                        >
                            <img
                                className={styles.each}
                                src='https://image.flaticon.com/icons/png/128/1067/1067566.png'
                                alt=''
                            />
                        </div>

                        <div
                            data-aos='zoom-in'
                            data-aos-duration='1000'
                            data-aos-delay='800'
                            className={styles.icon}
                        >
                            <a href='/faqs'>
                                <img
                                    className={styles.each}
                                    src='https://image.flaticon.com/icons/png/128/2618/2618540.png'
                                    alt=''
                                />
                            </a>
                        </div>
                    </div>
                    <div className={styles.info}>
                        <p className={styles.des}>
                            Urgencias y emergencias - 0810-454-999
                        </p>
                        <p className={styles.des}>
                            Orientación medica telefonica - 0810-963-952
                        </p>
                        <p className={styles.des}>Preguntas frecuentes</p>
                    </div>
                </div>
                <h3 className={styles.nov}>Ultimas noticias</h3>
                <article className={styles.news}>
                    <Carousel />
                </article>
            </section>

            <section data-aos='zoom-in-left' className={styles.digital}>
                <StarsBackground />
                <h2 className={styles.digitalTitle}>
                    <div data-aos='zoom-in' data-aos-duration='1000'>
                        Credencial digital
                    </div>
                    <div
                        data-aos='zoom-in'
                        data-aos-duration='1000'
                        data-aos-delay='500'
                        className={styles.digitalSubtitle}
                    >
                        Innovamos para estar cada dia mas cerca tuyo!
                    </div>
                </h2>
                <div className={styles.digitalDescriptions}>
                    <p
                        data-aos='zoom-in'
                        data-aos-duration='1000'
                        data-aos-delay='750'
                        className={styles.digitalDescription1}
                    >
                        📱 La credencial va siempre con vos y sin ocupar lugar
                        en tu billetera.
                    </p>
                    <p
                        data-aos='zoom-in'
                        data-aos-duration='1000'
                        data-aos-delay='750'
                        className={styles.digitalDescription2}
                    >
                        📱Todas las credenciales de tu grupo familiar en un solo
                        lugar.
                    </p>
                </div>
            </section>
            <section data-aos='slide-left' className={styles.ourPlans}>
                <InfoPlanes id='infoPlans' />
            </section>
            <section
                id='contact'
                data-aos='zoom-out-up'
                className={styles.contactSection}
            >
                <div className={styles.titlesContact}>
                    <h1 data-aos='flip-down'>Estas a un solo paso</h1>
                    <h2 data-aos='flip-down'>de ser parte de Integra Salud</h2>
                </div>
                <ContactForm data-aos='zoom-in' />
            </section>

            <div className={classes.root} data-aos='zoom-out'>
                <Button
                    aria-controls='fade-menu'
                    aria-haspopup='true'
                    onClick={handleClick}
                    className={classes.icon}
                >
                    <AccessibleForwardIcon className={classes.icon} />
                </Button>
                <Menu
                    id='fade-menu'
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                    className={classes.chat}
                >
                    <Chatbot />
                </Menu>
            </div>
        </div>
    );
}

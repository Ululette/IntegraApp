import React, { useState, useEffect } from 'react';
import Particles from 'react-tsparticles';
import axios from 'axios';
import styles from './UserHome.module.css';

function UserHome() {
    const affiliateData = JSON.parse(localStorage.getItem('affiliatedata'));
    const [quote, setQuote] = useState({});

    const fetchQuote = async () => {
        const newQuote = await axios
            .get('https://favqs.com/api/qotd')
            .then((res) => res.data)
            .then((q) => {
                return { message: q.quote.body, author: q.quote.author };
            });
        setQuote(newQuote);
    };
    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <div className={styles.container}>
            <Particles
                params={{
                    background: {
                        color: {
                            value: '#213e3b',
                        },
                        position: '50% 50%',
                        repeat: 'no-repeat',
                        size: 'cover',
                    },
                    fullScreen: {
                        enable: true,
                        zIndex: -1,
                    },
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: 'push',
                            },
                            onHover: {
                                enable: true,
                                mode: 'grab',
                                parallax: {
                                    enable: true,
                                    force: 60,
                                },
                            },
                        },
                        modes: {
                            bubble: {
                                distance: 400,
                                duration: 2,
                                opacity: 0.8,
                                size: 40,
                            },
                            grab: {
                                distance: 400,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: '#ffffff',
                        },
                        links: {
                            color: {
                                value: '#ffffff',
                            },
                            distance: 150,
                            enable: true,
                            opacity: 0.4,
                        },
                        move: {
                            attract: {
                                rotate: {
                                    x: 600,
                                    y: 1200,
                                },
                            },
                            enable: true,
                            outModes: {
                                bottom: 'out',
                                left: 'out',
                                right: 'out',
                                top: 'out',
                            },
                        },
                        number: {
                            density: {
                                enable: true,
                            },
                        },
                        opacity: {
                            random: {
                                enable: true,
                            },
                            value: {
                                min: 0.1,
                                max: 0.5,
                            },
                            animation: {
                                enable: true,
                                speed: 3,
                                minimumValue: 0.1,
                            },
                        },
                        size: {
                            random: {
                                enable: true,
                            },
                            value: {
                                min: 0.1,
                                max: 10,
                            },
                            animation: {
                                enable: true,
                                speed: 20,
                                minimumValue: 0.1,
                            },
                        },
                    },
                }}
            />
            <h1 className={styles.name}>Hola {affiliateData.name}</h1>
            <div className={styles.quoteContainer}>
                <q>{quote.message}</q>
                <p>{quote.author}</p>
            </div>
        </div>
    );
}

export default UserHome;

import React from 'react';
import Particles from 'react-tsparticles';
import styles from './AdminHome.module.css';

function AdminHome() {
    return (
        <div className={styles.container}>
            <Particles
                params={{
                    background: {
                        color: {
                            value: '#043564',
                        },
                        image: "url('http://vincentgarreau.com/particles.js/assets/img/kbLd9vb_new.gif')",
                        position: '0 50%',
                        repeat: 'no-repeat',
                        size: '60%',
                    },
                    fullScreen: {
                        enable: false,
                    },
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: 'repulse',
                            },
                            onHover: {
                                mode: 'grab',
                            },
                        },
                        modes: {
                            bubble: {
                                distance: 400,
                                duration: 2,
                                opacity: 8,
                                size: 40,
                            },
                            grab: {
                                distance: 200,
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
                            opacity: 0.4,
                        },
                        move: {
                            attract: {
                                rotate: {
                                    x: 600,
                                    y: 1200,
                                },
                            },
                            direction: 'left',
                            enable: true,
                            outModes: {
                                bottom: 'out',
                                left: 'out',
                                right: 'out',
                                top: 'out',
                            },
                            speed: 6,
                            straight: true,
                        },
                        opacity: {
                            value: 0.5,
                            animation: {
                                speed: 1,
                                minimumValue: 0.1,
                            },
                        },
                        shape: {
                            options: {
                                star: {
                                    sides: 5,
                                },
                            },
                            type: 'star',
                        },
                        size: {
                            random: {
                                enable: true,
                            },
                            value: {
                                min: 1,
                                max: 4,
                            },
                            animation: {
                                speed: 40,
                                minimumValue: 0.1,
                            },
                        },
                    },
                }}
            />
            <h1>Hola Merlin</h1>
        </div>
    );
}

export default AdminHome;

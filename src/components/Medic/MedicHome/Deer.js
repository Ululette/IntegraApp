<Particles
    className={styles.background}
    params={{
        autoPlay: true,
        background: {
            color: {
                value: 'transparent',
            },
            image: '',
        },
        backgroundMask: {
            composite: 'destination-out',
            cover: {
                color: {
                    value: '#000000',
                },
                opacity: 1,
            },
            enable: false,
        },
        fullScreen: {
            enable: true,
        },
        detectRetina: false,
        fpsLimit: 30,
        infection: {
            cure: false,
            delay: 0,
            enable: false,
            infections: 0,
            stages: [],
        },
        interactivity: {
            detectsOn: 'canvas',
            events: {
                onClick: {
                    enable: false,
                    mode: 'push',
                },
                onDiv: {
                    selectors: '#repulse-div',
                    enable: false,
                    mode: 'repulse',
                    type: 'circle',
                },
                onHover: {
                    enable: true,
                    mode: 'bubble',
                    parallax: {
                        enable: false,
                        force: 2,
                        smooth: 10,
                    },
                },
                resize: true,
            },
            modes: {
                attract: {
                    distance: 200,
                    duration: 0.4,
                    easing: 'ease-out-quad',
                    factor: 1,
                    maxSpeed: 50,
                    speed: 1,
                },
                bounce: {
                    distance: 200,
                },
                bubble: {
                    distance: 40,
                    duration: 2,
                    opacity: 8,
                    size: 6,
                },
                connect: {
                    distance: 80,
                    links: {
                        opacity: 0.5,
                    },
                    radius: 60,
                },
                grab: {
                    distance: 400,
                    links: {
                        blink: false,
                        consent: false,
                        opacity: 1,
                    },
                },
                light: {
                    area: {
                        gradient: {
                            start: {
                                value: '#000000',
                            },
                            stop: {
                                value: '#000000',
                            },
                        },
                        radius: 1000,
                    },
                    shadow: {
                        color: {
                            value: '#000000',
                        },
                        length: 2000,
                    },
                },
                push: {
                    quantity: 4,
                },
                remove: {
                    quantity: 2,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                    factor: 100,
                    speed: 1,
                    maxSpeed: 50,
                    easing: 'ease-out-quad',
                },
                slow: {
                    factor: 1,
                    radius: 0,
                },
                trail: {
                    delay: 1,
                    pauseOnStop: false,
                    quantity: 1,
                },
            },
        },
        manualParticles: [],
        motion: {
            disable: false,
            reduce: {
                factor: 4,
                value: true,
            },
        },
        particles: {
            bounce: {
                horizontal: {
                    random: {
                        enable: false,
                        minimumValue: 0.1,
                    },
                    value: 1,
                },
                vertical: {
                    random: {
                        enable: false,
                        minimumValue: 0.1,
                    },
                    value: 1,
                },
            },
            collisions: {
                bounce: {
                    horizontal: {
                        random: {
                            enable: false,
                            minimumValue: 0.1,
                        },
                        value: 1,
                    },
                    vertical: {
                        random: {
                            enable: false,
                            minimumValue: 0.1,
                        },
                        value: 1,
                    },
                },
                enable: false,
                mode: 'bounce',
                overlap: {
                    enable: true,
                    retries: 0,
                },
            },
            color: {
                value: '#002EFF',
                animation: {
                    h: {
                        count: 0,
                        enable: false,
                        offset: 0,
                        speed: 1,
                        sync: true,
                    },
                    s: {
                        count: 0,
                        enable: false,
                        offset: 0,
                        speed: 1,
                        sync: true,
                    },
                    l: {
                        count: 0,
                        enable: false,
                        offset: 0,
                        speed: 1,
                        sync: true,
                    },
                },
            },
            destroy: {
                mode: 'none',
                split: {
                    count: 1,
                    factor: {
                        random: {
                            enable: false,
                            minimumValue: 0,
                        },
                        value: 3,
                    },
                    rate: {
                        random: {
                            enable: false,
                            minimumValue: 0,
                        },
                        value: {
                            min: 4,
                            max: 9,
                        },
                    },
                },
            },
            life: {
                count: 0,
                delay: {
                    random: {
                        enable: false,
                        minimumValue: 0,
                    },
                    value: 0,
                    sync: false,
                },
                duration: {
                    random: {
                        enable: false,
                        minimumValue: 0.0001,
                    },
                    value: 0,
                    sync: false,
                },
            },
            links: {
                blink: false,
                color: {
                    value: '#002EFF',
                },
                consent: false,
                distance: 30,
                enable: true,
                frequency: 1,
                opacity: 0.4,
                shadow: {
                    blur: 5,
                    color: {
                        value: '#002EFF',
                    },
                    enable: false,
                },
                triangles: {
                    enable: false,
                    frequency: 1,
                },
                width: 1,
                warp: false,
            },
            move: {
                angle: {
                    offset: 45,
                    value: 90,
                },
                attract: {
                    enable: false,
                    rotate: {
                        x: 600,
                        y: 1200,
                    },
                },
                decay: 0,
                distance: 0,
                direction: 'none',
                drift: 0,
                enable: true,
                gravity: {
                    acceleration: 9.81,
                    enable: false,
                    maxSpeed: 50,
                },
                path: {
                    clamp: true,
                    delay: {
                        random: {
                            enable: false,
                            minimumValue: 0,
                        },
                        value: 0,
                    },
                    enable: false,
                },
                outModes: {
                    default: 'bounce',
                    bottom: 'bounce',
                    left: 'bounce',
                    right: 'bounce',
                    top: 'bounce',
                },
                random: false,
                size: false,
                speed: 1,
                straight: false,
                trail: {
                    enable: false,
                    length: 10,
                    fillColor: {
                        value: '#002EFF',
                    },
                },
                vibrate: false,
                warp: false,
            },
            number: {
                density: {
                    enable: false,
                    area: 2000,
                    factor: 1000,
                },
                limit: 0,
                value: 200,
            },
            opacity: {
                random: {
                    enable: false,
                    minimumValue: 0.1,
                },
                value: {
                    min: 0.05,
                    max: 0.4,
                },
                animation: {
                    count: 0,
                    enable: true,
                    speed: 2,
                    sync: false,
                    destroy: 'none',
                    minimumValue: 0.05,
                    startValue: 'random',
                },
            },
            reduceDuplicates: false,
            rotate: {
                random: {
                    enable: false,
                    minimumValue: 0,
                },
                value: 0,
                animation: {
                    enable: false,
                    speed: 0,
                    sync: false,
                },
                direction: 'clockwise',
                path: false,
            },
            shadow: {
                blur: 0,
                color: {
                    value: '#002EFF',
                },
                enable: false,
                offset: {
                    x: 0,
                    y: 0,
                },
            },
            shape: {
                options: {},
                type: 'circle',
            },
            size: {
                random: {
                    enable: true,
                    minimumValue: 1,
                },
                value: 1,
                animation: {
                    count: 0,
                    enable: false,
                    speed: 40,
                    sync: false,
                    destroy: 'none',
                    minimumValue: 0.1,
                    startValue: 'random',
                },
            },
            stroke: {
                width: 0,
            },
            twinkle: {
                lines: {
                    enable: false,
                    frequency: 0.05,
                    opacity: 1,
                },
                particles: {
                    enable: false,
                    frequency: 0.05,
                    opacity: 1,
                },
            },
        },
        pauseOnBlur: true,
        pauseOnOutsideViewport: true,
        responsive: [],
        themes: [],
        polygon: {
            draw: {
                enable: true,
                stroke: {
                    color: {
                        value: 'rgba(0,0,0,1)',
                    },
                    width: 0.5,
                    opacity: 0.2,
                },
            },
            enable: true,
            inline: {
                arrangement: 'equidistant',
            },
            move: {
                radius: 10,
                type: 'path',
            },
            scale: 0.5,
            type: 'inline',
            url: 'https://particles.js.org/images/smalldeer.svg',
        },
    }}
/>;

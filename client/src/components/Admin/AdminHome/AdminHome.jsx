import React from 'react';
import Particles from 'react-particles-js';
import styles from './AdminHome.module.css';

function AdminHome() {
    return (
        <div className={styles.container}>
            <h1>Hola Merlin</h1>
            <Particles
                params={{
                    polygon: {
                        enable: true,
                        type: 'inside',
                        move: {
                            radius: 10,
                        },
                        url: '/client/src/assets/svg/small-deer.svg',
                    },
                }}
            />
        </div>
    );
}

export default AdminHome;

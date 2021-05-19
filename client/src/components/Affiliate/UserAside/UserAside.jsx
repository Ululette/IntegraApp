import React, { useState, useEffect } from 'react';
import {
    CircularProgress,
} from '@material-ui/core';
import 'firebase/auth';
import supabase from '../../../supabase.config.js';
import { useUser } from 'reactfire';
import { NavLink } from 'react-router-dom';

//Styles
import styles from './UserAside.module.css';

//Icons
import HomeIcon from '@material-ui/icons/Home';
import FaceIcon from '@material-ui/icons/Face';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import NoteIcon from '@material-ui/icons/Note';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PaymentIcon from '@material-ui/icons/Payment';
import ForumIcon from '@material-ui/icons/Forum';


function UserAside() {
    const [familyGroup, setFamilyGroup] = useState([]);
    const userData = JSON.parse(localStorage.getItem('userdata'));
    const affiliateData = JSON.parse(localStorage.getItem('affiliatedata'));
    const userFirebase = useUser();

    if (!userFirebase.data && !affiliateData && !userData) {
        window.location = '/login';
    }

    useEffect(() => {
        getFamilyGroup();
    }, []);

    const getFamilyGroup = async () => {
        let { data: familyGroup, error: fetchFamilyGroup } = await supabase
            .from('partners')
            .select('name, lastname')
            .eq('family_group', affiliateData.family_group);
        if (fetchFamilyGroup) {
            console.log(fetchFamilyGroup);
            alert(fetchFamilyGroup.message);
            return 'Error en fetchFamilyGroup';
        }
        setFamilyGroup(familyGroup);
    };

    if (familyGroup.length === 0) return <CircularProgress />;

    return (
        <div className={styles.container}>
            <aside className={styles.aside}>
                <ul className={styles.buttonsContainer}>
                    <NavLink
                        to={`/${userData.dni}/affiliate`}
                        className={styles.link}
                    >
                        <HomeIcon />
                        <li>Inicio</li>
                    </NavLink>
                    <NavLink
                        to={`/${userData.dni}/affiliate/familymembers`}
                        className={styles.link}
                        activeClassName={styles.activeLink}
                    >
                        <FaceIcon />
                        <li>Mi cuenta</li>
                    </NavLink>
                    <NavLink
                        to={`/${userData.dni}/affiliate/mymedicalrecords`}
                        className={styles.link}
                        activeClassName={styles.activeLink}
                    >
                        <FavoriteBorderIcon />
                        <li>Mi carpeta medica</li>
                    </NavLink>
                    <article>
                        <NoteIcon />
                        <li>Mi plan</li>
                    </article>
                    <article>
                        <DoneAllIcon />
                        <li>Mis autorizaciones</li>
                    </article>
                    <article>
                        <PhoneAndroidIcon />
                        <li>Mi credencial</li>
                    </article>
                    <NavLink
                        to={`/${userData.dni}/affiliate/doctor`}
                        className={styles.link}
                        activeClassName={styles.activeLink}
                    >
                        <AssignmentIcon />
                        <li>Cartilla medica</li>
                    </NavLink>
                    <article>
                        <PaymentIcon />
                        <li>Pago online</li>
                    </article>
                    <article>
                        <ForumIcon />
                        <li>Contactanos</li>
                    </article>
                </ul>
            </aside>
        </div>
    );
}

export default UserAside;

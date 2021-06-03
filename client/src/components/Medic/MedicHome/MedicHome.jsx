import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import {
    Accessibility,
    Assignment,
    EmojiPeople,
    ImportContacts,
    Receipt,
    Settings,
} from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import supabase from '../../../supabase.config.js';
import styles from './MedicHome.module.css';

function MedicHome({ medicData }) {
    console.log(medicData);

    const [patients, setPatients] = useState([]);

    const fetchPatients = async () => {
        const { data: patient } = await supabase
            .from('medics_partners')
            .select('partners(name, lastname, state)')
            .eq('medic_dni', medicData.dni);
        setPatients(
            patient.filter((el) => el.partners.state === 'aceptado').length
        );
    };

    useEffect(() => {
        fetchPatients();
        //eslint-disable-next-line
    }, []);

    return (
        <div className={styles.container}>
            <h1>
                Bienvenido {medicData.name} {medicData.lastname}
            </h1>
            <div className={styles.sectionContainer}>
                <section className={styles.directAccess}>
                    <List>
                        <NavLink to={`/${medicData.dni}/medic/profile`}>
                            <ListItem button>
                                <ListItemIcon>
                                    <Settings />
                                </ListItemIcon>
                                <ListItemText
                                    primary='Mi cuenta'
                                    secondary='Modificar datos personales.'
                                />
                            </ListItem>
                        </NavLink>
                    </List>
                </section>
                <section className={styles.directAccess}>
                    <List>
                        <NavLink to={`/${medicData.dni}/medic/patients`}>
                            <ListItem button>
                                <ListItemIcon>
                                    <Accessibility />
                                </ListItemIcon>
                                <ListItemText
                                    primary='Mis pacientes'
                                    secondary='Lista, detalles y crear consulta para cada paciente.'
                                />
                            </ListItem>
                        </NavLink>
                    </List>
                </section>
                <section className={styles.directAccess}>
                    <List>
                        <NavLink to={`/${medicData.dni}/medic/myConsults`}>
                            <ListItem button>
                                <ListItemIcon>
                                    <Assignment />
                                </ListItemIcon>
                                <ListItemText
                                    primary='Mis consultas'
                                    secondary='Detalles de las consultas que realice.'
                                />
                            </ListItem>
                        </NavLink>
                    </List>
                </section>
                <section className={styles.directAccess}>
                    <List>
                        <NavLink
                            to={`/${medicData.dni}/medic/prescriptionsandorders`}
                        >
                            <ListItem button>
                                <ListItemIcon>
                                    <Receipt />
                                </ListItemIcon>
                                <ListItemText
                                    primary='Mis recetas y ordenes'
                                    secondary='Lista de recetas y ordenes que realice.'
                                />
                            </ListItem>
                        </NavLink>
                    </List>
                </section>
                <section className={styles.directAccess}>
                    <List>
                        <a
                            href='https://idhs.org.ar/'
                            target='_blank'
                            rel='noreferrer'
                        >
                            <ListItem button>
                                <ListItemIcon>
                                    <ImportContacts />
                                </ListItemIcon>
                                <ListItemText
                                    primary='Capacitacion continua'
                                    secondary='Programa para actualizarme al dia a dia de cada caso.'
                                />
                            </ListItem>
                        </a>
                    </List>
                </section>
                <section className={styles.patientCount}>
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <EmojiPeople />
                            </ListItemIcon>
                            <ListItemText
                                primary={`${patients}`}
                                secondary='Pacientes que actualmente atiendo.'
                            />
                        </ListItem>
                    </List>
                </section>
            </div>
        </div>
    );
}

export default MedicHome;

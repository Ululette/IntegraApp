import React, { useState, useEffect } from 'react';
import supabase from '../../../supabase.config.js';
import styles from './AdminHome.module.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chart from 'react-google-charts';
import CountUp from 'react-countup';

//MATERIAL-UI COMPONENTS
import { DataGrid } from '@material-ui/data-grid';

import StorefrontIcon from '@material-ui/icons/Storefront';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import ErrorIcon from '@material-ui/icons/Error';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SettingsIcon from '@material-ui/icons/Settings';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import WarningIcon from '@material-ui/icons/Warning';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

function AdminHome() {
    const [activeAffiliates, setActiveAffiliates] = useState('');
    const [affiliatesToRevision, setAffiliatesToRevision] = useState('');
    const [downRequests, setDownRequests] = useState('');
    const [medics, setMedics] = useState('');
    const [bestPlans, setBestPlans] = useState('');
    const [contactForm, setContactForm] = useState('');
    const [planInfo, setPlanInfo] = useState('');
    const [admins, setAdmins] = useState('');
    const [authorizations, setAuthorizations] = useState('');
    const [debtors, setDebtors] = useState('');

    const fetchingData = async () => {
        const { data: numberAffiliates } = await supabase
            .from('partners')
            .select('id')
            .eq('state', 'aceptado');

        setActiveAffiliates(numberAffiliates.length);

        const { data: numberAffiliatesToRevision } = await supabase
            .from('partners')
            .select('id')
            .eq('state', 'revision pendiente');

        setAffiliatesToRevision(numberAffiliatesToRevision.length);

        const { data: numberAdmins } = await supabase
            .from('admins')
            .select('id');

        setAdmins(numberAdmins.length);

        const { data: numberDownRequests } = await supabase
            .from('familiar_downs_request')
            .select('id')
            .eq('status', 'pendiente');

        setDownRequests(numberDownRequests.length);

        const { data: numberMedics } = await supabase
            .from('medics')
            .select('id')
            .eq('state', 'activo');

        setMedics(numberMedics.length);

        const { data: numberContacts } = await supabase
            .from('guest_contacts')
            .select('id');

        setContactForm(numberContacts.length);

        //FECHAS

        const rightNow = new Date();
        const monthFormated =
            String(rightNow.getMonth()).length === 1
                ? `0${rightNow.getMonth()}`
                : `${rightNow.getMonth()}`;
        const dayFormated =
            String(rightNow.getDate()).length === 1
                ? `0${rightNow.getDate()}`
                : `${rightNow.getDate()}`;

        const dateFormated = `${rightNow.getFullYear()}-${monthFormated}-${dayFormated}`;

        const { data: paymentsExpired } = await supabase
            .from('payments')
            .select(
                'expiration_date, amount, payed, partners(dni, name, lastname)'
            )
            .lt('expiration_date', dateFormated)
            .eq('payed', false);

        setDebtors(paymentsExpired);

        const { data: numberPlans } = await supabase
            .from('partners')
            .select('plans (name, price)')
            .eq('state', 'aceptado');

        setBestPlans(numberPlans.map((el) => el.plans.name).sort());
        setPlanInfo(
            numberPlans.reduce((accu, el) => {
                return accu + el.plans.price;
            }, 0)
        );

        const { data: numberAuth } = await supabase
            .from('orders')
            .select('id')
            .eq('status', 'en espera de autorizacion');

        setAuthorizations(numberAuth.length);
    };

    useEffect(() => {
        fetchingData();
    }, []);

    if (authorizations === '' && bestPlans === '')
        return <CircularProgress color='secondary' />;

    const counts = {};
    const countPlans = [['Plan', 'Socios']];

    bestPlans.forEach((el) => {
        counts[el] = (counts[el] || 0) + 1;
    });

    for (let key in counts) {
        countPlans.push({ name: key, count: counts[key] });
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'dni', headerName: 'DNI', width: 200 },
        { field: 'name', headerName: 'Nombre', width: 200 },
        { field: 'lastname', headerName: 'Apellido', width: 200 },
        {
            field: 'month',
            headerName: 'Fecha expiracion',
            width: 200,
        },
        {
            field: 'debt',
            headerName: 'Deuda',
            width: 200,
        },
    ];

    const rows = debtors.map((el, index) => {
        return {
            id: index,
            dni: el.partners.dni,
            name: el.partners.name,
            lastname: el.partners.lastname,
            month: el.expiration_date,
            debt: el.amount,
        };
    });

    return (
        <div className={styles.container}>
            <div className={styles.dataContainer}>
                <section className={styles.card}>
                    <div className={`${styles.iconCard} ${styles.bg_green}`}>
                        <StorefrontIcon />
                    </div>
                    <div className={styles.infoCard}>
                        <div className={styles.auxiliar}></div>
                        <article className={styles.description}>
                            <p>Ganancias mensuales</p>
                            <h3>
                                $<CountUp end={planInfo} duration={10} />
                            </h3>
                        </article>
                    </div>
                </section>
                <section className={styles.card}>
                    <div className={`${styles.iconCard} ${styles.bg_blue}`}>
                        <AddToQueueIcon />
                    </div>
                    <div className={styles.infoCard}>
                        <div className={styles.auxiliar}></div>
                        <article className={styles.description}>
                            <p>Interesados a revisar</p>
                            <h3>
                                <CountUp
                                    end={affiliatesToRevision}
                                    duration={5}
                                />
                            </h3>
                        </article>
                    </div>
                </section>
                <section className={styles.card}>
                    <div
                        className={`${styles.iconCard} ${styles.bg_lightblue}`}
                    >
                        <HourglassEmptyIcon />
                    </div>
                    <div className={styles.infoCard}>
                        <div className={styles.auxiliar}></div>
                        <article className={styles.description}>
                            <p>Faltan enviar formulario</p>
                            <h3>
                                <CountUp end={contactForm} duration={5} />
                            </h3>
                        </article>
                    </div>
                </section>
                <section className={styles.card}>
                    <div className={`${styles.iconCard} ${styles.bg_yellow}`}>
                        <ErrorIcon />
                    </div>
                    <div className={styles.infoCard}>
                        <div className={styles.auxiliar}></div>
                        <article className={styles.description}>
                            <p>Socios que quieren la baja</p>
                            <h3>
                                <CountUp end={downRequests} duration={5} />
                            </h3>
                        </article>
                    </div>
                </section>
                <section className={styles.card}>
                    <div className={`${styles.iconCard} ${styles.bg_purple}`}>
                        <AccessibilityIcon />
                    </div>
                    <div className={styles.infoCard}>
                        <div className={styles.auxiliar}></div>
                        <article className={styles.description}>
                            <p>Afiliados activos</p>
                            <h3>
                                <CountUp end={activeAffiliates} duration={5} />
                            </h3>
                        </article>
                    </div>
                </section>
                <section className={styles.card}>
                    <div className={`${styles.iconCard} ${styles.bg_red}`}>
                        <AddBoxIcon />
                    </div>
                    <div className={styles.infoCard}>
                        <div className={styles.auxiliar}></div>
                        <article className={styles.description}>
                            <p>Medicos activos</p>
                            <h3>
                                <CountUp end={medics} duration={5} />
                            </h3>
                        </article>
                    </div>
                </section>
                <section className={styles.card}>
                    <div className={`${styles.iconCard} ${styles.bg_black}`}>
                        <SettingsIcon />
                    </div>
                    <div className={styles.infoCard}>
                        <div className={styles.auxiliar}></div>
                        <article className={styles.description}>
                            <p>Administradores</p>
                            <h3>
                                <CountUp end={admins} duration={5} />
                            </h3>
                        </article>
                    </div>
                </section>
            </div>

            <section className={styles.chartContainer}>
                <div className={styles.iconChart}>
                    <ShoppingCartIcon />
                    <h3>Planes mas consumidos</h3>
                </div>
                <Chart
                    chartType='PieChart'
                    loader={<CircularProgress />}
                    data={countPlans.map((el) =>
                        el.name ? [el.name, el.count] : el
                    )}
                    className={styles.chart}
                />
            </section>
            <div className={styles.dataGridContainer}>
                <div className={styles.iconGrid}>
                    <WarningIcon />
                    <h3>Socios con deudas</h3>
                </div>
                <section className={styles.dataGrid}>
                    <DataGrid rows={rows} columns={columns} pageSize={5} />
                </section>
            </div>
        </div>
    );
}

export default AdminHome;

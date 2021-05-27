import React, { useState, useEffect } from 'react';
import supabase from '../../../supabase.config.js';
import styles from './AdminHome.module.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chart from 'react-google-charts';
import CountUp from 'react-countup';

function AdminHome() {
    const adminData = JSON.parse(localStorage.getItem('admindata'));

    const [activeAffiliates, setActiveAffiliates] = useState('');
    const [affiliatesToRevision, setAffiliatesToRevision] = useState('');
    const [downRequests, setDownRequests] = useState('');
    const [medics, setMedics] = useState('');
    const [bestPlans, setBestPlans] = useState('');
    const [contactForm, setContactForm] = useState('');
    const [planInfo, setPlanInfo] = useState('');
    const [admins, setAdmins] = useState('');
    const [authorizations, setAuthorizations] = useState('');

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

    // console.log(activeAffiliates);
    // console.log(affiliatesToRevision);
    // console.log(downRequests);
    // console.log(medics);
    // console.log(contactForm);
    // console.log(authorizations);

    const counts = {};
    const countPlans = [['Plan', 'Socios']];

    bestPlans.forEach((el) => {
        counts[el] = (counts[el] || 0) + 1;
    });

    for (let key in counts) {
        countPlans.push({ name: key, count: counts[key] });
    }

    console.log(planInfo);

    return (
        <div className={styles.container}>
            <h1>Hola {adminData.name}</h1>
            <div className={styles.dataContainer}>
                <article>
                    <h3>Afiliados activos</h3>
                    <CountUp end={activeAffiliates} duration={5} />
                </article>
                <article>
                    <h3>Interesados a revisar</h3>
                    <CountUp end={affiliatesToRevision} duration={5} />
                </article>
                <article>
                    <h3>Formularios pendientes</h3>
                    <CountUp end={contactForm} duration={5} />
                </article>
                <article>
                    <h3>Pedidos de bajas</h3>
                    <CountUp end={downRequests} duration={5} />
                </article>
                <article>
                    <h3>Medicos activos</h3>
                    <CountUp end={medics} duration={5} />
                </article>
                <article>
                    <h3>Administradores</h3>
                    <CountUp end={admins} duration={5} />
                </article>
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType='PieChart'
                    loader={<CircularProgress />}
                    data={countPlans.map((el) =>
                        el.name ? [el.name, el.count] : el
                    )}
                    options={{ title: 'Planes mas consumidos' }}
                />
                <article>
                    <h3>Ganancias mensuales</h3>
                    $<CountUp end={planInfo} duration={10} />
                </article>
            </div>
        </div>
    );
}

export default AdminHome;

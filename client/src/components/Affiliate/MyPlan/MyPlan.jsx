import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import supabase from '../../../supabase.config.js';
import styles from './MyPlan.module.css';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
        width: '33%',
    },
}));

function MyPlan({ affiliateData }) {
    const classes = useStyles();
    const [plan, setPlan] = useState('');
    const [numberFamiliars, setNumberFamiliars] = useState(0);

    const fetchPlanDetails = async () => {
        const { data: myPlan, error: fetchMyPlan } = await supabase
            .from('plans')
            .select('name, price, benefits(description)')
            .eq('id', affiliateData.plan_id);
        if (fetchMyPlan) return alert(fetchMyPlan.message);
        setPlan(myPlan[0]);

        const { data: familyGroup, error: fetchFamilyGroup } = await supabase
            .from('partners')
            .select('name')
            .eq('family_group', affiliateData.family_group);
        if (fetchFamilyGroup) return alert(fetchFamilyGroup.message);
        setNumberFamiliars(familyGroup.length);
    };

    useEffect(() => {
        fetchPlanDetails();
        //eslint-disable-next-line
    }, []);

    if (plan === '' && numberFamiliars === 0) return <CircularProgress />;

    const planName = `integra${plan.name.substring(8)}`;

    return (
        <div className={styles.container}>
            <header className={`${styles.header} ${styles[planName]}`}>
                <h3>Mi Plan</h3>
                <h2>{plan.name}</h2>
            </header>
            <h3 className={styles.benefitsHeader}>Beneficios incluidos:</h3>
            <List className={styles.benefitsList}>
                {plan.benefits.map((el, idx) => (
                    <ListItem
                        className={classes.root}
                        key={`benefit-${idx}`}
                        button
                    >
                        <ListItemText primary={el.description} />
                    </ListItem>
                ))}
            </List>
            <section className={styles.prices}>
                <article>
                    <p>Costo mensual:</p>
                    <p>Total x{numberFamiliars} socios:</p>
                </article>
                <article>
                    <p> ${plan.price}</p>
                    <p> ${plan.price * numberFamiliars}</p>
                </article>
            </section>
        </div>
    );
}

export default MyPlan;

import React, { useEffect, useState } from 'react';
import supabase from '../../../supabase.config.js';
import { makeStyles } from '@material-ui/core/styles';
import styles from './MyPlan.module.css';
import CompareMyPlan from './CompareMyPlan';
import { List, ListItem, ListItemText } from '@material-ui/core';

let useStyles = makeStyles(() => ({
    root: {
        width: '33%',
    },
}));

function MyPlan({ affiliateData }) {
    let classes = useStyles();
    let [plan, setPlan] = useState(null);
    let [numberFamiliars, setNumberFamiliars] = useState(0);

    let fetchPlanDetails = async () => {
        let { data: myPlan, error: fetchMyPlan } = await supabase
            .from('plans')
            .select('id, name, price,benefits(id,title)')
            .eq('id', affiliateData.plan_id);
        // console.log(myPlan[0])
        setPlan(myPlan[0]);

        let { data: familyGroup, error: fetchFamilyGroup } = await supabase
            .from('partners')
            .select('name')
            .match({
                family_group: affiliateData.family_group,
                state: 'aceptado',
            });
        if (fetchFamilyGroup) return alert(fetchFamilyGroup.message);
        setNumberFamiliars(familyGroup.length);
    };

    useEffect(() => {
        fetchPlanDetails();
        //eslint-disable-next-line
    }, []);

    useEffect(() => {}, [plan]);

    let [comp, setComp] = useState(false);

    function handleCompare() {
        comp ? setComp(false) : setComp(true);
        // alert('clickeaste')
        return;
    }
    useEffect(() => {
        // console.log('clickeaste', comp);
    }, [comp]);

    return (
        <div className={styles.container}>
            {plan && !comp && (
                <>
                    <header
                        className={`${styles.header} ${
                            styles[`integra${plan.name.substring(8)}`]
                        }`}
                    >
                        <h3>Mi Plan</h3>
                        <h2>{plan.name}</h2>
                    </header>
                    <h3 className={styles.benefitsHeader}>
                        Beneficios incluidos:
                    </h3>
                    <List className={styles.benefitsList}>
                        {plan.benefits.map((el, idx) => (
                            <ListItem
                                className={classes.root}
                                key={`benefit-${idx}`}
                                button
                            >
                                <ListItemText primary={el.title} />
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
                    <hr className={styles.divider} />
                    <button
                        className={styles.buttonCompare}
                        onClick={handleCompare}
                    >
                        <h3>Otras opciones</h3>
                    </button>
                </>
            )}
            {plan && comp && (
                <>
                    <button
                        className={styles.buttonBack}
                        onClick={handleCompare}
                    >
                        <p className={styles.nuni}>Volver</p>
                    </button>
                    {/* <hr className={styles.divider} /> */}
                    <CompareMyPlan
                        plandata={plan}
                        familymembers={numberFamiliars}
                    />
                </>
            )}
        </div>
    );
}

export default MyPlan;

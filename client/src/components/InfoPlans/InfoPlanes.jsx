import React, { useState, useEffect } from 'react';
import InfoCard from './InfoCard';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import styles from './InfoPlans.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getPlans } from '../../actions/getter.action';
import { teal } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';

function InfoPlanes() {
    const plans = useSelector((state) => state.plans.allPlans);
    const dispatch = useDispatch();
    const [currCard, setCurrCard] = useState(0);
    useEffect(() => {
        dispatch(getPlans());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const forward = () => {
        currCard < plans.length - 1
            ? setCurrCard(currCard + 1)
            : setCurrCard(0);
    };

    const back = () => {
        currCard > 0
            ? setCurrCard(currCard - 1)
            : setCurrCard(plans.length - 1);
    };

    console.log(plans);

    if (plans.length === 0) return <CircularProgress />;

    const leftPlan = plans[currCard > 1 ? currCard - 1 : plans.length - 1];
    const plan = plans[currCard];
    const rightPlan = plans[currCard < plans.length - 1 ? currCard + 1 : 0];

    return (
        <div className={styles.carousel}>
            <div className={styles.left} onClick={back}>
                <ArrowBackIosIcon style={{ color: teal[300] }} />
            </div>
            <div className={styles.card}>
                <InfoCard
                    key={`${leftPlan.id}-12`}
                    className={styles.center}
                    plan={leftPlan}
                />
                <InfoCard
                    key={`${plan.id}-12`}
                    className={styles.center}
                    plan={plan}
                />
                <InfoCard
                    key={`${rightPlan.id}-12`}
                    className={styles.center}
                    plan={rightPlan}
                />
            </div>
            <div className={styles.right} onClick={forward}>
                <ArrowForwardIosIcon style={{ color: teal[300] }} />
            </div>
        </div>
    );
}

export default InfoPlanes;

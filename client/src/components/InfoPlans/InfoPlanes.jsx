import React, { useState, useEffect } from 'react';
import InfoCard from './InfoCard';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Styles from './InfoPlans.module.css';
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

    const leftPlan = plans[currCard > 1 ? currCard - 1 : plans.length - 1];
    const plan = plans[currCard];
    const rightPlan = plans[currCard < plans.length - 1 ? currCard + 1 : 0];

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
    console.log(leftPlan);
    return (
        <div className={Styles.carousel}>
            <div className={Styles.left} onClick={back}>
                <ArrowBackIosIcon style={{ color: teal[300] }} />
            </div>
            <div className={Styles.card}>
                <InfoCard
                    key={leftPlan.id}
                    className={Styles.center}
                    plan={leftPlan}
                />
                <InfoCard key={plan.id} className={Styles.center} plan={plan} />
                <InfoCard
                    key={rightPlan.id}
                    className={Styles.center}
                    plan={rightPlan}
                />
            </div>
            <div className={Styles.right} onClick={forward}>
                <ArrowForwardIosIcon style={{ color: teal[300] }} />
            </div>
        </div>
    );
}

export default InfoPlanes;

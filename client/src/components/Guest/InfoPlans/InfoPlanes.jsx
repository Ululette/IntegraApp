import React, { useEffect, useState } from 'react';
import InfoCard from './InfoCard';
import styles from './InfoPlans.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getPlans } from '../../../actions/getter.action';
import CircularProgress from '@material-ui/core/CircularProgress';
import Flicking from '@egjs/react-flicking';

function InfoPlanes() {
    const plans = useSelector((state) => state.plans.allPlans);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPlans());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (plans.length === 0) return <CircularProgress />;

    return (
        <div>
            <h1>Nuestros Planes</h1>
            <Flicking gap={10} circular={true}>
                {plans.map((el, idx) => (
                    <InfoCard key={`plancito=${idx}`} plan={el} />
                ))}
            </Flicking>
        </div>
    );
}

export default InfoPlanes;

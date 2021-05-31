import React, { useEffect } from 'react';
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
        <div className={styles.carousel}>
            <Flicking gap={10} circular={true} className={styles.cardContainer}>
                {/* {plans.map((el, idx) => (
                    <InfoCard
                        key={`plancito=${idx}`}
                        plan={el}
                        className={styles.card}
                    />
                ))} */}
            </Flicking>
        </div>
    );
}

export default InfoPlanes;

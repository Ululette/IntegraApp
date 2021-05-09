import React, { useState, useEffect } from 'react';
import InfoCard from './InfoCard';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import * as Styles from './InfoPlans.module.css';
// import supabase from '../../supabase.config'
// import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { getPlans } from '../../actions/getter.action';

export default function InfoPlanes(props) {
    // const [fetchPlans, setFetchPlans] = useState([])

    // const fetch = async () => {
    //   let { data: plans, error } = await supabase.from("plans").select(
    //     `description,
    //     price,
    //     benefits (
    //       benefit_description
    //       )`
    //   );
    //   console.error(error);
    //   setFetchPlans(plans);
    // }

    // const { plans, getPlans } = props;

    const plans = useSelector((state) => state.allPlans);
    const dispatch = useDispatch();

    const [currCard, setCurrCard] = useState(0);

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

    const handleKeyDown = (e) => {
        if (e.keyCode === 39) {
            forward();
        }
        if (e.keyCode === 37) {
            back();
        }
    };

    // const move = setTimeout
    // const stop = clearTimeout

    useEffect(() => {
        dispatch(getPlans());

        // move(forward, 1500)

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const showData = () => {
        if (plans.length) {
            return (
                <div className={Styles.carousel}>
                    <div className={Styles.card}>
                        <div className={Styles.left} onClick={back}>
                            <ArrowBackIosIcon />
                        </div>
                        <InfoCard
                            key={leftPlan.id_plan}
                            className={Styles.center}
                            plan={leftPlan}
                        />
                        <InfoCard
                            key={plan.id_plan}
                            className={Styles.center}
                            plan={plan}
                        />
                        <InfoCard
                            key={rightPlan.id_plan}
                            className={Styles.center}
                            plan={rightPlan}
                        />
                        <div className={Styles.right} onClick={forward}>
                            <ArrowForwardIosIcon />
                        </div>
                    </div>
                </div>
            );
        } else {
            return <p>Loading...</p>;
        }
    };

    return <div>{showData()}</div>;
}

// function mapStateToProps (state) {
//   return {
//     plans: state.allPlans
//   }
// }

// function mapDispatchToProps (dispatch) {
//    return { getPlans : () => dispatch(getPlans()) }
// }

// export default connect (mapDispatchToProps, mapStateToProps)(InfoPlanes)

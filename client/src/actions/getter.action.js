import {
    GET_PLANS_BENEFITS,
    GET_BENEFITS,
    GET_AFFILIATES,
} from './constants.actions';
import supabase from '../supabase.config';

function getPlans() {
    return async (dispatch) => {
        try {
            const { data: plans } = await supabase
                .from('plans')
                .select('id, name, price, benefits (title, description)');
            dispatch({ type: GET_PLANS_BENEFITS, payload: plans });
        } catch (err) {
            console.log(err);
        }
    };
}

function getBenefits() {
    return async (dispatch) => {
        try {
            const { data: benefits } = await supabase
                .from('benefits')
                .select('title, id, description');
            dispatch({ type: GET_BENEFITS, payload: benefits });
        } catch (err) {
            console.log(err);
        }
    };
}

function getAffiliates() {
    return async (dispatch) => {
        try {
            const { data: user, error: errorFetchUserData } = await supabase
                .from('partners')
                .select('*, plans (id, name)');
            if (errorFetchUserData) return console.log(errorFetchUserData);
            dispatch({ type: GET_AFFILIATES, payload: user });
        } catch (err) {
            console.log(err);
        }
    };
}

export { getPlans, getBenefits, getAffiliates };

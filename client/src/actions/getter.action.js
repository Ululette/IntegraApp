import { GET_PLANS_BENEFITS } from './constants.action.js';
import supabase from '../supabase.config.js';

function getPlans() {
    return async (dispatch) => {
        try {
            const { data: plans } = await supabase
                .from('plans')
                .select('price, description, benefits (benefit_description)');
            dispatch({ type: GET_PLANS_BENEFITS, payload: plans });
        } catch (err) {
            console.error(err);
        }
    };
}

export { getPlans };

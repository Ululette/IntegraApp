import { GET_PLANS_BENEFITS } from './constants.actions';
import supabase from '../supabase.config';

function getPlans() {
    return async (dispatch) => {
        try {
            const { data: plans } = await supabase
                .from('plans')
                .select('id_plan, price, description, benefits (benefit_description)');
            dispatch({ type: GET_PLANS_BENEFITS, payload: plans });
        } catch (err) {
            console.error(err);
        }
    };
}

export { getPlans };

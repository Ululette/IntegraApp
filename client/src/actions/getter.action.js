import {
    GET_PLANS_BENEFITS,
    GET_BENEFITS,
    GET_AFFILIATES,
    GET_STATES,
    GET_LOCALITIES

} from './constants.actions';
import supabase from '../supabase.config';

function getPlans() {
    return async (dispatch) => {
        try {
            const { data: plans } = await supabase
                .from('plans')
                .select('id, name, price,active, benefits (title, description)');
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
function getStates() {
    return async (dispatch) => {
      try {
        const { data: states } = await supabase
          .from("states")
          .select("id,name");
        dispatch({ type: GET_STATES, payload: states });
      } catch (err) {
        console.error(err);
      }
    };
  }
  
  function getLocalities(idState) {
    return async (dispatch) => {
      if(!idState){
        try {
          const { data: localities } = await supabase
            .from("localities")
            .select("*");
          dispatch({ type: GET_LOCALITIES, payload: localities });
        } catch (err) {
          console.error(err);
        }
      }
    };
  }
export { getPlans, getBenefits, getAffiliates,getStates,getLocalities };

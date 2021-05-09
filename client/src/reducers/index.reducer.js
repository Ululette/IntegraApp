import { GET_PLANS_BENEFITS } from '../actions/constants.actions';

const initialState = {
    allPlans: [],
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PLANS_BENEFITS:
            return {
                ...state,
                allPlans: action.payload,
            };
        default:
            return state;
    }
}

export default rootReducer;
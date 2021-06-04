import { GET_AFFILIATES } from '../actions/constants.actions.js';

const initialState = {
    allAffiliates: [],
};

function affiliatesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_AFFILIATES:
            return {
                ...state,
                allAffiliates: action.payload,
            };
        default:
            return state;
    }
}

export default affiliatesReducer;

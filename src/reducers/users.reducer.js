import { GET_USERS } from '../actions/constants.actions.js';

const initialState = {
    allUsers: [],
};

function allUsersReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                allUsers: action.payload,
            };
        default:
            return state;
    }
}

export default allUsersReducer;
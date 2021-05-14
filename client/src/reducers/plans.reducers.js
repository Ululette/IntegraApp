import { SET_NP_BEN_SEL, ADD_NP_BEN, SEND_NP_FORM } from '../actions/actions';

const initialState = {
    //------New plan------
    npbensel: [],
    addedbenefs: [],
    sended: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        //------New Plan------
        case SET_NP_BEN_SEL:
            return {
                ...state,
                npbensel: action.payload,
            };
        case ADD_NP_BEN:
            return {
                ...state,
                addedbenefs: action.payload,
            };
        case SEND_NP_FORM:
            return {
                ...state,
                sended: action.payload,
            };
        default:
            return state;
    }
}

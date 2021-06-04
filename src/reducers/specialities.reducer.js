import { GET_SPECIALITIES,FIND_SPECIALITY,DELETE_SPECIALITY } from '../actions/constants.actions';

const initialState = {
    medic_specialities: [],
    prueba:[]
};

export default function specialitiesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_SPECIALITIES:
            return {
                ...state,
                medic_specialities: action.payload
            };
        case FIND_SPECIALITY:
            return {
                ...state,
                wanted: action.payload
            };
        case DELETE_SPECIALITY:
            return {
                ...state,
                pruba: action.payload
            };
        default:
            return state;
        }
}
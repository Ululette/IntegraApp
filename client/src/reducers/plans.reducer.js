import { GET_PLANS } from '../const'

initialState = {
    plans:[]
}


export default plans = (state = initialState, action) => {
    switch (action){
        case GET_PLANS : return { ...state, plans: action.payload };
        default: return state;
    }
}
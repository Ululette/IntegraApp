import { GET_PLANS_BENEFITS, GET_BENEFITS } from "../actions/constants.actions";

const initialState = {
  allPlans: [],
  allBenefits: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PLANS_BENEFITS:
      return {
        ...state,
        allPlans: action.payload,
      };
    case GET_BENEFITS:
      return {
        ...state,
        allBenefits: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;

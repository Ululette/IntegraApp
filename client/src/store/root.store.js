import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/index.reducer.js';
import planReducer from '../reducers/plans.reducers.js';
import specialitiesReducer from '../reducers/specialities.reducer.js';
import affiliatesReducer from '../reducers/affiliates.reducer.js';

const allReducer = combineReducers({
    plans: rootReducer,
    newPlans: planReducer,
    specialities: specialitiesReducer,
    affiliates: affiliatesReducer,
});
const store = createStore(
    allReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;

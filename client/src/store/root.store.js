import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/index.reducer";
import thunk from "redux-thunk";

const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

export default store;
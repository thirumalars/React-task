import { createStore, combineReducers } from "redux";
import DashboardReducer from './reducers/dashboardReducer'
const rootReducers = combineReducers(
    {
        DashboardReducer
    }
);
//const store = createStore(rootReducers);
const store = createStore(rootReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;
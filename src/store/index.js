import { createStore,combineReducers} from 'redux';
import authReducer from './reducers';

const rootReducer = combineReducers({
    //Combining of the multiple reducers
  auth: authReducer,
});

const store = createStore(rootReducer);

export default store;

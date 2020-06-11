import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import restReducer from './reducers/RestReducer';

// use combine reducer to group all reducers together. 
const reducer = combineReducers({
    rest: restReducer
  });

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store; 
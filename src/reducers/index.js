import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
import data from './data';

const rootReducer = combineReducers({ user, wallet, data });

export default rootReducer;

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

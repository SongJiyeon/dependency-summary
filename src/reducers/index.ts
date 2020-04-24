import { combineReducers } from 'redux';
import counter from './counter';
import loggedIn from './loggedIn';

const rootReducer = combineReducers({
  counter,
  loggedIn
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

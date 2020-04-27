import { combineReducers } from 'redux';
import loggedIn from './loggedIn';
import registerMode from './registerMode';
import userRepos from './userRepos';

const rootReducer = combineReducers({
  loggedIn,
  registerMode,
  userRepos
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

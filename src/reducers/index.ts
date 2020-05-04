import { combineReducers } from 'redux';
import loggedIn from './loggedIn';
import renderMode from './renderMode';
import userRepos from './userRepos';
import targetPath from './targetPath';
import techStack from './techStack';

const rootReducer = combineReducers({
  loggedIn,
  renderMode,
  userRepos,
  targetPath,
  techStack
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

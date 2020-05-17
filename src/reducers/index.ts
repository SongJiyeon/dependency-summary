import { combineReducers } from 'redux';
import loggedIn from './loggedIn';
import loadingMsg from './loadingMsg';
import renderMode from './renderMode';
import modalStatus from './modalStatus';
import userRepos from './userRepos';
import targetPath from './targetPath';
import techStack from './techStack';
import techList from './techList';

const rootReducer = combineReducers({
  loggedIn,
  loadingMsg,
  renderMode,
  modalStatus,
  userRepos,
  targetPath,
  techStack,
  techList
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

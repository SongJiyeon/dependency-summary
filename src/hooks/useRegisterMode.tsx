import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { setRegisterMode } from '../reducers/registerMode';
import { useCallback } from 'react';

export default function useRegisterMode() {
  const registerMode = useSelector((state: RootState) => state.registerMode);
  const dispatch = useDispatch();

  const onClickRegisterMode = useCallback((mode: 'stats' | 'userRepos' | 'cloneUrl' | 'localPath') => dispatch(setRegisterMode(mode)), [dispatch]);

  return {
    registerMode,
    onClickRegisterMode
  };
};

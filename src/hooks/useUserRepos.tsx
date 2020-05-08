import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { setUserRepos } from '../reducers/userRepos';
import { useCallback } from 'react';

export default function useUserRepos() {
  const userRepos = useSelector((state: RootState) => state.userRepos);
  const dispatch = useDispatch();

  const onLoad = useCallback((repos: object[]) => dispatch(setUserRepos(repos)), [dispatch]);

  return {
    userRepos,
    onLoad
  };
};

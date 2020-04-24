import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { setLoggedIn } from '../reducers/loggedIn';
import { useCallback } from 'react';

export default function useCounter() {
  const loggedIn = useSelector((state: RootState) => state.loggedIn);
  const dispatch = useDispatch();

  const onLogin = useCallback((status: boolean, token: string) => dispatch(setLoggedIn(status, token)), [dispatch]);

  return {
    loggedIn,
    onLogin
  };
};

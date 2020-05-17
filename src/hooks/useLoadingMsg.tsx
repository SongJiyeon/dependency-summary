import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { setLoadingMsg, resetLoadingMsg } from '../reducers/loadingMsg';
import { useCallback } from 'react';

export default function useLoadingMsg() {
  const loadingMsg = useSelector((state: RootState) => state.loadingMsg);
  const dispatch = useDispatch();

  const pushLoadingMsg = useCallback((message: string) => dispatch(setLoadingMsg(message)), [dispatch]);
  const clearLoadingMsg = useCallback((emptyArr: []) => dispatch(resetLoadingMsg(emptyArr)), [dispatch]);

  return {
    loadingMsg,
    pushLoadingMsg,
    clearLoadingMsg
  }
};

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { setModalStatus } from '../reducers/modalStatus';
import { useCallback } from 'react';

export default function useModalStatus() {
  const status = useSelector((state: RootState) => state.modalStatus);
  const dispatch = useDispatch();

  const setStatus = useCallback((status: true | false) => dispatch(setModalStatus(status)), [dispatch]);

  return {
    status,
    setStatus
  };
};

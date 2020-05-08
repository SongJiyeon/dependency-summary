import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { setTargetPath } from '../reducers/targetPath';
import { useCallback } from 'react';

export default function useTargetPath() {
  const targetPath = useSelector((state: RootState) => state.targetPath);
  const dispatch = useDispatch();

  const onTargetChange = useCallback((path: string | null) => dispatch(setTargetPath(path)), [dispatch]);

  return {
    targetPath,
    onTargetChange
  };
};

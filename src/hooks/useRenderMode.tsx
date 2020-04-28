import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { RenderModeState, setRenderMode } from '../reducers/renderMode';
import { useCallback } from 'react';

export default function useRenderMode() {
  const renderMode = useSelector((state: RootState) => state.renderMode);
  const dispatch = useDispatch();

  const onClickRenderMode = useCallback((mode: RenderModeState) => dispatch(setRenderMode(mode)), [dispatch]);

  return {
    renderMode,
    onClickRenderMode
  };
};

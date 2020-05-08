import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { setTechStack, addTechStack, deleteTechStack } from '../reducers/techStack';
import { useCallback } from 'react';

export default function useTargetPath() {
  const techStack = useSelector((state: RootState) => state.techStack);
  const dispatch = useDispatch();

  type techStackType = {
    'name': string,
    'type': string,
    'image_url': string,
    'homepage_url': string
  };

  type techStacksType = techStackType[];

  const onSetTechStack = useCallback((techStack: techStacksType) => dispatch(setTechStack(techStack)), [dispatch]);
  const onAddTechStack = useCallback((techStack: techStackType) => dispatch(addTechStack(techStack)), [dispatch]);
  const onDeleteTechStack = useCallback((name: string) => dispatch(deleteTechStack(name)), [dispatch]);

  return {
    techStack,
    onSetTechStack,
    onAddTechStack,
    onDeleteTechStack
  };
};

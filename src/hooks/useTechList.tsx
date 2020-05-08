import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { setTechList, addTechList, deleteTechList } from '../reducers/techList';
import { useCallback } from 'react';

export default function useTargetPath() {
  const techList = useSelector((state: RootState) => state.techList);
  const dispatch = useDispatch();

  type techListType = {
    'name': string,
    'type': string,
    'image_url': string,
    'homepage_url': string
  };

  type techListsType = techListType[];

  const onSetTechList = useCallback((techList: techListsType) => dispatch(setTechList(techList)), [dispatch]);
  const onAddTechList = useCallback((techList: techListType) => dispatch(addTechList(techList)), [dispatch]);
  const onDeleteTechList = useCallback((name: string) => dispatch(deleteTechList(name)), [dispatch]);

  return {
    techList,
    onSetTechList,
    onAddTechList,
    onDeleteTechList
  };
};

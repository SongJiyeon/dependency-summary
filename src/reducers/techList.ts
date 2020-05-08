import _ from 'lodash';

const SET_TECH_LIST = 'techList/SET_TECH_LIST' as const;
const ADD_TECH_LIST = 'techList/ADD_TECH_LIST' as const;
const DELETE_TECH_LIST = 'techList/DELETE_TECH_LIST' as const;

type techListType = {
  name: '',
  type: '',
  image_url: '',
  homepage_url: ''
};

type techListsType = techListType[];

export const setTechList = (techList: techListsType) => ({
  type: SET_TECH_LIST,
  techList
});

export const addTechList = (techList: techListType) => ({
  type: ADD_TECH_LIST,
  techList
});

export const deleteTechList = (name: string) => ({
  type: DELETE_TECH_LIST,
  name
});

type techListAction =
  | ReturnType<typeof setTechList>
  | ReturnType<typeof addTechList>
  | ReturnType<typeof deleteTechList>;

function techList(state: techListType[] = [], action: techListAction) {
  switch(action.type) {
    case SET_TECH_LIST:
      state = _.sortBy(state, ['type', 'name']);
      return action.techList;
    case ADD_TECH_LIST:
      state.push(action.techList);
      state = _.sortBy(state, ['type', 'name']);
      return state;
    case DELETE_TECH_LIST:
      return state.filter(tech => action.name !== tech.name);
    default:
      state = _.sortBy(state, ['type', 'name']);
      return state;
  };
};

export default techList;

import _ from 'lodash';

const SET_TECH_STACK = 'techStack/SET_TECH_STACK' as const;
const ADD_TECH_STACK = 'techStack/ADD_TECH_STACK' as const;
const DELETE_TECH_STACK = 'techStack/DELETE_TECH_STACK' as const;

type techStackType = {
  name: '',
  type: '',
  image_url: '',
  homepage_url: ''
};

type techStacksType = techStackType[];

export const setTechStack = (techStack: techStacksType) => ({
  type: SET_TECH_STACK,
  techStack
});

export const addTechStack = (techStack: techStackType) => ({
  type: ADD_TECH_STACK,
  techStack
});

export const deleteTechStack = (name: string) => ({
  type: DELETE_TECH_STACK,
  name
});

type techStackAction =
  | ReturnType<typeof setTechStack>
  | ReturnType<typeof addTechStack>
  | ReturnType<typeof deleteTechStack>;

function techStack(state: techStackType[] = [], action: techStackAction) {
  switch(action.type) {
    case SET_TECH_STACK:
      state = _.sortBy(state, tech => tech.name);
      return action.techStack;
    case ADD_TECH_STACK:
      state.push(action.techStack);
      state = _.sortBy(state, tech => tech.name);
      return state;
    case DELETE_TECH_STACK:
      return state.filter(tech => action.name !== tech.name);
    default:
      state = _.sortBy(state, tech => tech.name);
      return state;
  };
};

export default techStack;

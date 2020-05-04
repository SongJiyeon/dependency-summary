const SET_TECH_STACK = 'techStack/SET_TECH_STACK' as const;

export const setTechStack = (techStack: object[]) => ({
  type: SET_TECH_STACK,
  techStack
});

type techStackAction =
  | ReturnType<typeof setTechStack>;

const initialState = [{
  name: '',
  type: '',
  image_url: '',
  homepage_url: ''
}];

function techStack(state: object[] = initialState, action: techStackAction) {
  switch(action.type) {
    case SET_TECH_STACK:
      return action.techStack;
    default:
      return state;
  };
};

export default techStack;

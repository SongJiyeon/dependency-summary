const SET_TARGET_PATH = 'loggedIn/SET_TARGET_PATH' as const;

export const setTargetPath = (path: string) => ({
  type: SET_TARGET_PATH,
  path
});

type TargetPathAction =
  | ReturnType<typeof setTargetPath>;

const initialState = '';

function targetPath(state: string = initialState, action: TargetPathAction) {
  switch(action.type) {
    case SET_TARGET_PATH:
      return action.path;
    default:
      return state;
  };
};

export default targetPath;

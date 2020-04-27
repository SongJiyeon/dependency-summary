const SET_REGISTER_MODE = 'registerMode/SET_REGISTER_MODE' as const;

export const setRegisterMode = (mode: 'stats' | 'userRepos' | 'cloneUrl' | 'localPath') => ({
  type: SET_REGISTER_MODE,
  mode
});

type RegisterModeAction =
  | ReturnType<typeof setRegisterMode>;

type RegisterModeState = {
  mode: 'stats' | 'userRepos' | 'cloneUrl' | 'localPath'
};

const initialState: RegisterModeState = {
  mode: 'stats'
};

function registerMode(state: RegisterModeState = initialState, action: RegisterModeAction) {
  switch(action.type) {
    case SET_REGISTER_MODE:
      return { mode: action.mode };
    default:
      return state;
  };
};

export default registerMode;

const SET_RENDER_MODE = 'renderMode/SET_RENDER_MODE' as const;

export type RenderModeState =
| 'stats' 
| 'userRepos' 
| 'cloneUrl' 
| 'localPath' 
| 'userSettings'
| 'moduleUsage'
| 'dependencyTree'
| 'techStack';

export const setRenderMode = (mode: RenderModeState) => ({
  type: SET_RENDER_MODE,
  mode
});

type RenderModeAction =
  | ReturnType<typeof setRenderMode>;

const initialState: RenderModeState = 'stats';

function renderMode(state: RenderModeState = initialState, action: RenderModeAction) {
  switch(action.type) {
    case SET_RENDER_MODE:
      return action.mode;
    default:
      return state;
  };
};

export default renderMode;

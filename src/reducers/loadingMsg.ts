const SET_LOADING_MSG = 'loadingMsg/SET_LOADING_MSG' as const;
const RESET_LOADING_MSG = 'loadingMsg/RESET_LOADING_MSG' as const;

export const setLoadingMsg = (message: string) => ({
  type: SET_LOADING_MSG,
  message
});

export const resetLoadingMsg = (emptyArr: []) => ({
  type: RESET_LOADING_MSG,
  emptyArr
});

type loadingMsgAction =
  | ReturnType<typeof setLoadingMsg>
  | ReturnType<typeof resetLoadingMsg>;

type loadingMsgState = string[];

const initialState: loadingMsgState = [];

function loadingMsg(state: loadingMsgState = initialState, action: loadingMsgAction) {
  switch(action.type) {
    case SET_LOADING_MSG:
      return [ ...state, action.message ];
    case RESET_LOADING_MSG:
      return [];
    default:
      return state;
  };
};

export default loadingMsg;

const SET_LOGGED_IN = 'loggedIn/SET_LOGGED_IN' as const;

export const setLoggedIn = (status: boolean, token: string) => ({
  type: SET_LOGGED_IN,
  status,
  token
});

type LoggedInAction =
  | ReturnType<typeof setLoggedIn>;

type LoggedInState = {
  status: boolean,
  token: string
};

const initialState: LoggedInState = {
  status: false,
  token: ''
};

function loggedIn(state: LoggedInState = initialState, action: LoggedInAction) {
  switch(action.type) {
    case SET_LOGGED_IN:
      return { status: action.status, token: action.token };
    default:
      return state;
  };
};

export default loggedIn;

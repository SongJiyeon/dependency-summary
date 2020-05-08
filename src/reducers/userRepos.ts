const SET_USER_REPOS = 'userRepos/SET_USER_REPOS' as const;

export const setUserRepos = (repos: object[]) => ({
  type: SET_USER_REPOS,
  repos
});

type UserReposAction =
  | ReturnType<typeof setUserRepos>;

const initialState = [];

function userRepos(state: object[] = initialState, action: UserReposAction) {
  switch(action.type) {
    case SET_USER_REPOS:
      return action.repos;
    default:
      return state;
  };
};

export default userRepos;

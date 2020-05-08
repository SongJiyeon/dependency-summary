const SET_MODAL_STATUS = 'modalStatus/SET_MODAL_STATUS' as const;

export type modalStatusState = true | false;

export const setModalStatus = (status: modalStatusState) => ({
  type: SET_MODAL_STATUS,
  status
});

type modalStatusAction =
  | ReturnType<typeof setModalStatus>;

function modalStatus(state: modalStatusState = false, action: modalStatusAction) {
  switch(action.type) {
    case SET_MODAL_STATUS:
      return action.status;
    default:
      return state;
  };
};

export default modalStatus;

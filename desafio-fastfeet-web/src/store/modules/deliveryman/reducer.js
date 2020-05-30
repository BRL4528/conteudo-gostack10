import produce from 'immer';

const INITIAL_STATE = {
  deletedDelyveriman: null,
};

export default function delivaryman(state = INITIAL_STATE, actions) {
  return produce(state, (draft) => {
    switch (actions.type) {
      case '@deliveryman/DELETE_DELIVERYMAN_SUCCESS': {
        draft.deletedDelyveriman = actions.payload.deleted;

        break;
      }
      case '@auth/SIGN_OUT': {
        draft.deletedDelyveriman = null;
        break;
      }
      default:
    }
  });
}

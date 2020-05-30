import produce from 'immer';

const INITIAL_STATE = {
  orders: null,
  deleted: null,
};

export default function order(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@order/UPDATE_ORDER_SUCCESS': {
        draft.orders = action.payload.orders;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.orders = null;
        break;
      }
      case '@order/DELETE_ORDER_SUCCESS': {
        draft.deleted = action.payload.deleted.id;
        break;
      }

      default:
    }
  });
}

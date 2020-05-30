import produce from 'immer';

const INITIAL_STATE = {
  deleted: null,
};
export default function recipient(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@recipient/DELET_RECIPIENT_SUCCESS': {
        draft.deleted = action.payload.deleted;
        console.tron.log(action.payload.deleted);
        break;
      }

      default:
    }
  });
}

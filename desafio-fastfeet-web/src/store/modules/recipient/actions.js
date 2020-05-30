export function recipientCreateRequest(data) {
  return {
    type: '@recipient/CRATE_RECIPIENT_REQUEST',
    payload: { data },
  };
}

export function createRecipientSucess() {
  return {
    type: '@recipient/CRATE_RECIPIENT_SUCCESS',
  };
}

export function recipientUpdateRequest(data) {
  return {
    type: '@recipient/UPDATE_RECIPIENT_REQUEST',
    payload: { data },
  };
}

export function recipientDeleteRequest(data) {
  return {
    type: '@recipient/DELETE_RECIPIENT_REQUEST',
    payload: { data },
  };
}

export function deletedRecipientSucess(deleted) {
  return {
    type: '@recipient/DELET_RECIPIENT_SUCCESS',
    payload: { deleted },
  };
}

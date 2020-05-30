export function deliverymanProfileCreateRequest(data) {
  return {
    type: '@deliveryman/CREATE_PROFILE_REQUEST',
    payload: { data },
  };
}

export function deliverymanProfileEditRequest(data) {
  return {
    type: '@deliveryman/EDIT_PROFILE_REQUEST',
    payload: { data },
  };
}

export function deliverymanDeleteRequest(data) {
  return {
    type: '@deliveryman/DELETE_ORDER_REQUEST',
    payload: { data },
  };
}

export function deliverymanDeleteFailure() {
  return {
    type: '@deliveryman/DELETE_DELIVERYMAN_REQUEST',
  };
}

export function deliverymanDeletedSuccess(deleted) {
  return {
    type: '@deliveryman/DELETE_DELIVERYMAN_SUCCESS',
    payload: { deleted },
  };
}

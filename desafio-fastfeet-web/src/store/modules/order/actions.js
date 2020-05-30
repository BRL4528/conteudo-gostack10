export function orderUpRequest(data) {
  return {
    type: '@order/UPDATE_ORDER_REQUEST',
    payload: { data },
  };
}

export function orderUpFailure() {
  return {
    type: '@order/UPDATE_ORDER_FAILURE',
  };
}

export function orderUpSucess(order) {
  return {
    type: '@order/UPDATE_ORDER_SUCCESS',
    payload: { order },
  };
}

export function orderDeleteRequest(data) {
  return {
    type: '@order/DELETE_ORDER_REQUEST',
    payload: { data },
  };
}

export function orderDeleteSuccess(deleted) {
  return {
    type: '@order/DELETE_ORDER_SUCCESS',
    payload: { deleted },
  };
}

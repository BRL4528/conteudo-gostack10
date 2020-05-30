export function problemCancelRequest(data) {
  return {
    type: '@problem/CANCEL_PROBLEM_REQUEST',
    payload: { data },
  };
}

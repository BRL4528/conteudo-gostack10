import { all, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

export function* cancelOrder({ payload }) {
  try {
    const delivery_id = payload.data;

    console.tron.log(delivery_id);
    const response = yield call(api.delete, `problems/${delivery_id}`);

    console.tron.log(response);
    toast.success('Entrega cancelada com sucesso!');

    // yield put(orderUpSucess(response.data));
  } catch (err) {
    toast.error('Erro ao cancelar a encomenda, confira os dados!');

    // yield put(orderUpFailure());
  }
}

export default all([
  takeLatest('@problem/CANCEL_PROBLEM_REQUEST', cancelOrder),
]);

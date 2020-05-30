/* eslint-disable prefer-object-spread */
import { put, all, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { orderUpSucess, orderUpFailure, orderDeleteSuccess } from './actions';

export function* updateOrder({ payload }) {
  try {
    const { id, recipient_id, deliveryman_id, product } = payload.data;

    const order = Object.assign({
      id,
      recipient_id,
      deliveryman_id,
      product,
    });
    const response = yield call(api.put, 'orders', order);

    console.tron.log(response);
    toast.success('Entrega atualizada com sucesso!');

    yield put(orderUpSucess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar a encomenda, confira os dados!');

    yield put(orderUpFailure());
  }
}

export function* deleteOrder({ payload }) {
  try {
    const id = payload.data;

    const response = yield call(api.delete, `orders/${id}`);

    toast.success('Entrega excluida com sucesso!');

    yield put(orderDeleteSuccess(response.data));
  } catch (err) {
    toast.error(
      'Erro ao deletar a encomenda, consulte o administrador do sistema!'
    );

    yield put(orderUpFailure());
  }
}

export default all([
  takeLatest('@order/UPDATE_ORDER_REQUEST', updateOrder),
  takeLatest('@order/DELETE_ORDER_REQUEST', deleteOrder),
]);

/* eslint-disable prefer-object-spread */
import { put, all, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { deliverymanDeleteFailure, deliverymanDeletedSuccess } from './actions';

export function* deleteDeliveryman({ payload }) {
  try {
    const id = payload.data;

    const response = yield call(api.delete, `couriers/${id}`);

    toast.success('Entregador deletado com sucesso!');

    yield put(deliverymanDeletedSuccess(response.data));
  } catch (err) {
    toast.error(
      'Erro ao deletar o entregador, conaulte o administrador do sistema!'
    );

    yield put(deliverymanDeleteFailure());
  }
}

export function* createProfileDeliveryman({ payload }) {
  try {
    const { name, email, avatar_id } = payload.data;

    const deliverymanProfile = Object.assign({
      name,
      email,
      avatar_id,
    });

    yield call(api.post, 'couriers', deliverymanProfile);

    toast.success('Entregador cadastrado com sucesso!');
  } catch (err) {
    toast.error('Erro ao cadastrar entregador, verifique os dados!');
  }
}

export function* editProfileDeliveryman({ payload }) {
  try {
    const { id, name, email, avatar_id } = payload.data;

    const deliverymanEditProfile = Object.assign({
      id,
      name,
      email,
      avatar_id,
    });

    yield call(api.put, 'couriers', deliverymanEditProfile);
    toast.success('Entregador atualizado com sucesso!');
  } catch (err) {
    toast.error('Erro ao atualizar entregador, verifique os dados!');
  }
}

export default all([
  takeLatest('@deliveryman/DELETE_ORDER_REQUEST', deleteDeliveryman),
  takeLatest('@deliveryman/CREATE_PROFILE_REQUEST', createProfileDeliveryman),
  takeLatest('@deliveryman/EDIT_PROFILE_REQUEST', editProfileDeliveryman),
]);

import { put, all, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { createRecipientSucess, deletedRecipientSucess } from './actions';

export function* createRecipient({ payload }) {
  try {
    const {
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    } = payload.data;

    const recipient = {
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    };
    yield call(api.post, 'recipients', recipient);

    toast.success('Destino cadastrado com sucesso!');

    yield put(createRecipientSucess());
  } catch (err) {
    toast.error('Erro ao cadastrar novo destino, confira seus dados!');

    // yield put(orderUpFailure());
  }
}

export function* updateRecipient({ payload }) {
  try {
    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    } = payload.data;

    const recipient = {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    };

    yield call(api.put, 'recipients', recipient);

    toast.success('Destino atualizado com sucesso!');
  } catch (err) {
    toast.error('Erro ao atualizar destino!');
  }
}

export function* deleteRecipient({ payload }) {
  try {
    const id = payload.data;

    const response = yield call(api.delete, `recipients/${id}`);

    yield put(deletedRecipientSucess(response));
    console.tron.log(response);
    toast.success('Destino exlcuido com sucesso!');
  } catch (err) {
    toast.error(
      'Erro ao excluir destino, consulte os administardores do sistemas!'
    );
  }
}
export default all([
  takeLatest('@recipient/CRATE_RECIPIENT_REQUEST', createRecipient),
  takeLatest('@recipient/UPDATE_RECIPIENT_REQUEST', updateRecipient),
  takeLatest('@recipient/DELETE_RECIPIENT_REQUEST', deleteRecipient),
]);

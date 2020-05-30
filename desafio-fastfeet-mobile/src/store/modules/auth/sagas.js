import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signFailure, signInSuccess } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    console.tron.log(id);
    const response = yield call(api.get, `deliverymans/${id}`);

    // const { token, user } = response.data;

    // if (user.provider) {
    //   Alert.alert(
    //     'Erro no login',
    //     'Usuário não pode ser prestador de serviços'
    //   );
    //   return;
    // }

    yield put(signInSuccess(id, response));

    // history.push('/dashboard');
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados'
    );
    yield put(signFailure());
  }
}

export function signOut() {
  // history.push('/');
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);

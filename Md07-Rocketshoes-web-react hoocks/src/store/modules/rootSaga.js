// basicamente mesmo papel do rootReducer que é juntar todos os Sagas em um unico arquivo, aqui poderia ter mais, mas estou utilizando a apenas CART
import { all } from 'redux-saga/effects';

import cart from './cart/sagas';

export default function* rootSaga() {
  return yield all([cart]);
}

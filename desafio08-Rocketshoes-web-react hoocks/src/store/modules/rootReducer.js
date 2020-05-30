import { combineReducers } from 'redux';

// Se eu tivesse utilizando mais modulos, novos reducers, vou combinalos passando...

// import NOVO REDUCER './NOVO REDUCER';

// export default combineReducers({
//   cart
//   NOVO REDUCER
// });

import cart from './cart/reducer';

export default combineReducers({
  cart
});

// Utilizo o Saga, no momento em que preciso fazer uma verificação, ou manipular algum dado de dentro do Redux
import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';
import { formatPrice } from '../../../util/format';

import { addToCartSuccess, updateAmountSuccess } from './actions';

// Basicamente o * tem a mesma função que um async(e o await == yield), só que mais potente
function* addToCart({ id }) {
  // Procuro aq, se existe um produto em que o id seja igual ao id do novo produto que esta sendo adicionado
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  // Faço a chamada na API utilizando call, o call é responsavel por chamar metodos que são asincronos e que retornam promisses dentro do JS.
  // aqui pego meu estoque
  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  // aqui estou armazenando a quantidade do produto que tenho alocado no carrinho.
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  // se minha quantidade que for adicionar no carrinho, for maior doq tenho em estoque, imprimo uma mensagem personalizada.
  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de esoque');
    return;
  }

  if (productExists) {
    // Utilizo o put, para disparar uma action do Redux
    yield put(updateAmountSuccess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormated: formatPrice(response.data.price)
    };
    // Utilizo o put, para disparar uma action do Redux, passando meus dados depois de ter realizado a verificação.
    yield put(addToCartSuccess(data));

    // quando o usuario adicionar item ao carrinho, ele é direcionado para a pagina do carrinho
    history.push('/cart');
  }
}
// Alterando a quantidade do produto dentro do meu carrinho.
function* updateAmount({ id, amount }) {
  // impede que diminui a quantidade para baixo de zero;
  if (amount <= 0) return;

  // Busco no meu estoque as informações de meu estoque.
  const stock = yield call(api.get, `stock/${id}`);
  const stockAmount = stock.data.amount;

  // Verifico se a quantidade que usuario esta pedindo é maior que tenho em estoque
  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de esoque');
    return;
  }
  // Utilizo o put, para disparar uma action do Redux, enviando as informações
  yield put(updateAmountSuccess(id, amount));
}

// com all, posso cadastrar varios listener, que ficaram ouvindo quando uma action for disparada, para disparar minhas ações aqui, que mais tarte vai ou não disparar uma ação no meu redux.
export default all([
  // com takeLaster(), se meu usuario clickar no botão duas vezes, vai manter o ultimo clik, descartando a primeira chamada na API, que é realizada a cada click, para cadastrar o item no carrinho apenas uma vez.
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount)
]);

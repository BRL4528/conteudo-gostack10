import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete
} from 'react-icons/md';

import { formatPrice } from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions';

import { Container, ProductoTable, Total } from './styles';

export default function Cart() {
  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce((totalSum, product) => {
        return totalSum + product.price * product.amount;
      }, 0)
    )
  );
  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount)
    }))
  );

  const dispatch = useDispatch();

  // Funções que estão acrescentando ou subtraindo quantidades de produtos no carrinho, estão passando as informações direto,
  // para meu reducer
  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  return (
    <Container>
      <ProductoTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <tr>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormated}</span>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => decrement(product)}>
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button type="button" onClick={() => increment(product)}>
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subtotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() =>
                    dispatch(CartActions.removeFromCart(product.id))
                  }
                >
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductoTable>
      <footer>
        <button type="button">Finalizar Pedido</button>

        <Total>
          <span>Total</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}

// Pega informações do meu Estado e mapea em formato de propriedades pro componet
// --- const mapStateToProps = state => ({
// Retorno aq o valor de meu Subtotal
// --- cart: state.cart.map(product => ({
// ---   ...product,
// ---   subtotal: formatPrice(product.price * product.amount)
// --- })),
// --- Retorno aq o valor de meu total
// ---   total: formatPrice(
// ---     state.cart.reduce((total, product) => {
// ---       return total + product.price * product.amount;
// ---     }, 0)
// ---   )
// --- });

// Pega informações do meu State e mapea em formato de propriedades pro componet
// --- const mapDispatchToProps = dispatch =>
// ---   bindActionCreators(CartActions, dispatch);

// --- export default connect(mapStateToProps, mapDispatchToProps)(Cart);
//

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';

export default function Home() {
  /**
   *  state = {
   * products: []
   * };
   */
  const [products, setProducts] = useState([]);

  const amount = useSelector(state =>
    state.cart.reduce((SumAmount, product) => {
      SumAmount[product.id] = product.amount;

      return SumAmount;
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('products');

      // Formata os numeros quando vem da API, fazendo assim, o valor não é formatado toda vez que existir uma ação na tela
      const data = response.data.map(product => ({
        ...product,
        priceFormated: formatPrice(product.price)
      }));
      setProducts(data);
    }
    loadProducts();
  }, []);
  // Fazer requisições para API
  /* async componentDidMount() {
   *  const response = await api.get('products');
   */
  // Formata os numeros quando vem da API, fazendo assim, o valor não é formatado toda vez que existir uma ação na tela
  /**
   *  const data = response.data.map(product => ({
   *    ...product,
   *    priceFormated: formatPrice(product.price)
   * }));
   *  this.setState({ products: data });
   * }
   */

  function handleAddProduct(id) {
    // enviando o id para minhas Actions, para meu Redux virificar qual type estou acionando aqui,e executando a ação correta
    dispatch(CartActions.addToCartRequest(id));
  }

  return (
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormated}</span>

          <button type="button" onClick={() => handleAddProduct(product.id)}>
            <div>
              <MdAddShoppingCart size={16} color="#FFF" />
              {amount[product.id] || 0}
            </div>

            <span>Adicionar ao Carrinho</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}

// Dessa maneira, meu carrinho refle a quantidade de produto que usuario escolhe
/**
 *
 * const mapStateToProps = state => ({
 * amount: state.cart.reduce((amount, product) => {
 *   amount[product.id] = product.amount;
 *
 *   return amount;
 *}, {})
 * });
 */

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(CartActions, dispatch);

// export default connect(null, mapDispatchToProps)(Home);

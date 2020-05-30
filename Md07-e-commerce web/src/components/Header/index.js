/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { MdShoppingBasket } from 'react-icons/md';

import { Container, Cart } from './styles';

import logo from '../../assets/images/logo/rocktshoes.svg';

// eslint-disable-next-line react/prop-types
function Header({ cartSize }) {
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Rocketshoes" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Menu carrinho</strong>
          <span>{cartSize} itens </span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Cart>
    </Container>
  );
}

// Estou passando atraves de meu reducer as informações de meu carrinho,
// Aqui recebi as informações no meu state, e coloca qual informação eu quero utilizar.
export default connect(state => ({
  cartSize: state.cart.length
}))(Header);

/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';
import logo from '../../assets/img/logo.svg';

import { Container, Profile, Content, Menu } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="fastfeet" />
          <Menu>
            <Link to="/dashboard">ENCOMENDAS</Link>
            <Link to="/deliveryman">ENTREGADORES</Link>
            <Link to="/recipient">DESTINATÁRIO</Link>
            <Link to="/problem">PROBLEMAS</Link>
          </Menu>
        </nav>
        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link onClick={handleSignOut}>Sair do sistema</Link>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

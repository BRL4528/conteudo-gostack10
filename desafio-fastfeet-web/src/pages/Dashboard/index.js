/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { FaPlus, FaCircle, FaSearch } from 'react-icons/fa';

import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import Actions from '~/components/Actions';

import {
  Container,
  Content,
  Form,
  SubmitButton,
  List,
  StatusStyle,
  Window,
} from './styles';

export default function Dashboard() {
  const [visible, setVisible] = useState('');
  const [b, setB] = useState(true);
  const deleted = useSelector((state) => state.order.deleted);

  const [orders, setOrders] = useState([]);
  const [newSearch, setNewSearch] = useState('');

  useEffect(() => {
    async function loadOrders() {
      const response = await api.get('orders');
      const { data } = response;

      setOrders(data);
    }

    loadOrders();
  }, [deleted]);

  function handleToggleVisible(e) {
    setB(!b);
    if (b) {
      const t = e.target.id;
      setVisible(t);
    } else {
      setVisible('');
    }
  }

  async function handleAddnewSearch(e) {
    e.preventDefault(e);

    const response = await api.get(`order?product=${newSearch}`);
    const { data } = response;

    if (data.length === 0) {
      toast.error('Item Não encontrado');
      return;
    }

    setOrders(data);
  }

  function pageAddOurs(e) {
    e.preventDefault(e);
    history.push('/createorders');
  }

  function handleChangeSearch(e) {
    e.preventDefault(e);
    setNewSearch(e.target.value);
  }

  return (
    <>
      <Container>
        <Content>
          <h1>Gerenciando encomendas</h1>
          <Form onSubmit={handleAddnewSearch}>
            <div>
              <button className="search" type="submit">
                <FaSearch size={16} color="#EEE" />
              </button>
              <input
                type="text"
                placeholder="Buscar por encomendas"
                onChange={handleChangeSearch}
              />
            </div>
            <SubmitButton onClick={pageAddOurs}>
              <div>
                <FaPlus />
              </div>
              Cadastrar
            </SubmitButton>
          </Form>

          <table cellSpacing="0">
            <List asset>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Destinatário</th>
                  <th>Entregador</th>
                  <th>Cidade</th>
                  <th>Estado</th>
                  <th>Status</th>
                  <th>
                    <span>Ações</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.recipient.name}</td>
                    <td>
                      <div className="divAvatar">
                        <img
                          src={order.deliveryman.avatar.url}
                          alt={order.deliveryman.name}
                        />
                        <span>{order.deliveryman.name}</span>
                      </div>
                    </td>

                    <td>{order.recipient.city}</td>
                    <td>
                      <span>{order.recipient.state}</span>
                    </td>
                    <td>
                      <StatusStyle asset={order}>
                        <FaCircle size={6} />
                        <strong asset={order}>
                          <>
                            {order.canceled_at != null
                              ? 'Cancelado'
                              : order.start_date != null
                              ? 'Retirada'
                              : order.end_date != null
                              ? 'Entregue'
                              : 'Pendente'}
                          </>
                        </strong>
                      </StatusStyle>
                    </td>
                    <td>
                      <button
                        id={order.id}
                        type="button"
                        onClick={handleToggleVisible}
                      >
                        ...
                      </button>
                      <Window id={order.id} test={parseFloat(visible)}>
                        <Actions>{order}</Actions>
                      </Window>
                    </td>
                  </tr>
                ))}
              </tbody>
            </List>
          </table>
        </Content>
      </Container>
    </>
  );
}

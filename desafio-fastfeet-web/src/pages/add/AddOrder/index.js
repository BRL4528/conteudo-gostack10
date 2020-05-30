/* eslint-disable radix */
import React, { useState, useEffect } from 'react';

import { FaCheck } from 'react-icons/fa';

import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  SubmitButtonSave,
  Content,
  Form,
  Box,
  SubmitButtonBack,
} from './styles';

export default function CreateOrders() {
  const [destiny, setDestiny] = useState([]);
  const [couriers, setCouriers] = useState([]);
  const [newValue, setNewValue] = useState('');

  const [newOrders, setNewOrders] = useState({
    recipient_id: 0,
    deliveryman_id: 0,
    product: '',
  });

  useEffect(() => {
    async function loadDestiny() {
      const response = await api.get('recipient');
      const { data } = response;

      setDestiny(data);
    }
    loadDestiny();
  }, []);

  useEffect(() => {
    async function loadOrders() {
      const response = await api.get('couriers');
      const { data } = response;
      setCouriers(data);
    }
    loadOrders();
  }, []);

  function submitButtonBack() {
    history.push('/');
  }

  function handleSelectChange(e) {
    e.preventDefault(e);
    const ValueId = parseInt(e.target.value);
    if (e.target.name === 'destiny') {
      newOrders.recipient_id = ValueId;
    }
    if (e.target.name === 'couriers') {
      newOrders.deliveryman_id = ValueId;
    } else {
      newOrders.product = newValue;
    }
    setNewOrders(newOrders);
  }

  function newOnChange(e) {
    setNewValue(e.target.value);
  }

  function submitButtonPush() {
    api.post('orders', {
      recipient_id: newOrders.recipient_id,
      deliveryman_id: newOrders.deliveryman_id,
      product: newOrders.product,
    });
  }

  return (
    <Container>
      <Content>
        <h1>Cadastro de encomendas</h1>
        <Form>
          <SubmitButtonBack onClick={submitButtonBack}>
            <div>
              <FaCheck />
            </div>
            Voltar
          </SubmitButtonBack>
          <SubmitButtonSave onClick={submitButtonPush}>
            <div>
              <FaCheck />
            </div>
            Salvar
          </SubmitButtonSave>
        </Form>

        <Box>
          <div>
            <strong>Destinatários</strong>
            <select onChange={handleSelectChange} name="destiny">
              <option value="">Selecione...</option>
              {destiny.map((places) => (
                <option key={places.id} value={places.id}>
                  {places.name}
                </option>
              ))}
            </select>

            <strong>Entregador</strong>
            <select onChange={handleSelectChange} name="couriers">
              <option value="">Selecione...</option>
              {couriers.map((deliveryman) => (
                <option key={deliveryman.id} value={deliveryman.id}>
                  {deliveryman.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <strong>Nome do produto</strong>
            <form onSubmit={handleSelectChange}>
              <input
                onChange={newOnChange}
                type="input"
                placeholder="Nome produto"
              />
            </form>
          </div>
        </Box>
      </Content>
    </Container>
  );
}

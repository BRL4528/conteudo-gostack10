/* eslint-disable radix */
import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Input } from '@rocketseat/unform';
import Select from 'react-select';

import { FaCheck } from 'react-icons/fa';

import api from '~/services/api';
import history from '~/services/history';

import { orderUpRequest } from '~/store/modules/order/actions';

import {
  Container,
  SubmitButtonSave,
  Content,
  Box,
  SubmitButtonBack,
  Card,
} from './styles';

export default function CreateOrders() {
  const dispath = useDispatch();
  const orders = useSelector((state) => state.order.orders);

  const [destiny, setDestiny] = useState([]);
  const [couriers, setCouriers] = useState([]);
  const [recipíentValue, setRecipient] = useState(0);
  const [deliverymanValue, setDeliveryMan] = useState(0);

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

  const options = useMemo(
    () =>
      destiny.map((recipient) => {
        const valores = {
          value: recipient.id,
          label: recipient.name,
        };
        return valores;
      }),
    [destiny]
  );

  const optionsDelivery = useMemo(
    () =>
      couriers.map((deliveryMan) => {
        const valores = {
          value: deliveryMan.id,
          label: deliveryMan.name,
        };
        return valores;
      }),
    [couriers]
  );

  function submitButtonBack() {
    history.push('/');
  }

  function handleSubmitUpdate({ product }) {
    const params = new URL(document.location).searchParams;
    const id = params.get('id');

    const data = {
      id,
      recipient_id: recipíentValue,
      deliveryman_id: deliverymanValue,
      product,
    };
    dispath(orderUpRequest(data));
  }

  function setValueRecipient(data) {
    setRecipient(data.value);
  }

  function setValueDeliveryman(data) {
    setDeliveryMan(data.value);
  }

  return (
    <Container>
      <Content>
        <h1>Editar encomendas</h1>

        <Form initialData={orders} onSubmit={handleSubmitUpdate}>
          <Card>
            <SubmitButtonBack onClick={submitButtonBack}>
              <div>
                <FaCheck />
              </div>
              Voltar
            </SubmitButtonBack>
            <SubmitButtonSave>
              <div>
                <FaCheck />
              </div>
              Salvar
            </SubmitButtonSave>
          </Card>
          <Box>
            <strong>Destinatários</strong>
            <Select
              name="recipient"
              type="select"
              options={options}
              onChange={setValueRecipient}
              className="select"
            />

            <strong>Entregador</strong>
            <Select
              name="deliveryman"
              options={optionsDelivery}
              onChange={setValueDeliveryman}
              className="select"
            />

            <div>
              <strong>Nome do produto</strong>

              <Input type="input" placeholder="Nome produto" name="product" />
            </div>
          </Box>
        </Form>
      </Content>
    </Container>
  );
}

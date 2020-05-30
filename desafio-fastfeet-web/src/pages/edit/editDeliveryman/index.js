/* eslint-disable no-new-object */
/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { FaCheck } from 'react-icons/fa';

import history from '~/services/history';
import api from '~/services/api';

import { deliverymanProfileEditRequest } from '~/store/modules/deliveryman/actions';

import AvatarInput from './AvatarInput';

import { Container, SubmitButtonSave, SubmitButtonBack } from './styles';

export default function AddDeliveryman() {
  const [deliverymanEdit, setDeliverymanEdit] = useState([]);
  const [url, setUrl] = useState('');
  const dispath = useDispatch();

  useEffect(() => {
    const params = new URL(document.location).searchParams;
    const id = parseInt(params.get('id'), 10);

    async function loadEditDeliveryman() {
      const response = await api.get('couriers');
      const { data } = response;

      const editDeliveryman = data.find((couriers) => couriers.id === id);

      setDeliverymanEdit(editDeliveryman);
      setUrl(editDeliveryman.avatar);
    }
    loadEditDeliveryman();
  }, []);

  function handleSubmit(data) {
    const { id } = deliverymanEdit;
    const editCourier = new Object();
    editCourier.id = id;
    editCourier.name = data.name;
    editCourier.avatar_id = data.avatar_id;
    editCourier.email = data.email;
    dispath(deliverymanProfileEditRequest(editCourier));
  }

  function submitButtonBack() {
    history.push('/deliveryman');
  }

  return (
    <Container>
      <h1>Editar entregador</h1>
      <Form initialData={deliverymanEdit} onSubmit={handleSubmit}>
        <SubmitButtonBack onClick={submitButtonBack}>
          <div>
            <FaCheck />
          </div>
          Voltar
        </SubmitButtonBack>
        <SubmitButtonSave type="submit">
          <div>
            <FaCheck />
          </div>
          Salvar
        </SubmitButtonSave>

        <AvatarInput name="avatar_id">{url}</AvatarInput>

        <Input name="name" type="text" placeholder="Nome do entregador" />

        <Input name="email" type="email" placeholder="Email do entrgador" />
      </Form>
    </Container>
  );
}

/* eslint-disable radix */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { FaCheck } from 'react-icons/fa';

import history from '~/services/history';

import { deliverymanProfileCreateRequest } from '~/store/modules/deliveryman/actions';

import AvatarInput from './AvatarInput';

import { Container, SubmitButtonSave, SubmitButtonBack } from './styles';

export default function AddDeliveryman() {
  const dispath = useDispatch();

  function handleSubmit(data) {
    dispath(deliverymanProfileCreateRequest(data));
  }

  function submitButtonBack() {
    history.push('/deliveryman');
  }

  return (
    <Container>
      <h1>Cadastro do entregador</h1>
      <Form onSubmit={handleSubmit}>
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

        <AvatarInput name="avatar_id" />

        <Input name="name" type="text" placeholder="Nome do entregador" />

        <Input name="email" type="email" placeholder="Email do entrgador" />
      </Form>
    </Container>
  );
}

/* eslint-disable radix */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { FaCheck } from 'react-icons/fa';

import history from '~/services/history';

import { recipientCreateRequest } from '~/store/modules/recipient/actions';

import { Container, SubmitButtonSave, SubmitButtonBack } from './styles';

export default function AddDeliveryman() {
  const dispath = useDispatch();

  function handleSubmit(data) {
    dispath(recipientCreateRequest(data));
  }

  function submitButtonBack() {
    history.push('/recipient');
  }

  return (
    <Container>
      <h1>Cadastro de destinatários</h1>
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

        <Input name="name" type="text" placeholder="Nome destinatário" />

        <Input name="street" type="text" placeholder="Rua" />

        <Input name="number" type="number" placeholder="Número" />

        <Input name="complement" type="text" placeholder="Complemento" />

        <Input name="state" type="text" placeholder="Estado" />

        <Input name="city" type="text" placeholder="Cidade" />

        <Input name="zip_code" type="zipe" placeholder="Cep" />
      </Form>
    </Container>
  );
}

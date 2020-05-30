/* eslint-disable no-new-object */
/* eslint-disable radix */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { FaCheck } from 'react-icons/fa';

import history from '~/services/history';

import { recipientUpdateRequest } from '~/store/modules/recipient/actions';

import { Container, SubmitButtonSave, SubmitButtonBack } from './styles';
import api from '~/services/api';

export default function AddDeliveryman() {
  const [editRecipient, setRecipient] = useState([]);

  useEffect(() => {
    async function loadEditRecipient() {
      const params = new URL(document.location).searchParams;
      const id = parseInt(params.get('id'), 10);

      const response = await api.get('recipients');
      const { data } = response;

      const recipient = data.find((detiny) => detiny.id === id);

      setRecipient(recipient);
    }
    loadEditRecipient();
  }, []);

  const dispath = useDispatch();

  function handleSubmit(data) {
    const { id } = editRecipient;
    const destiny = new Object();
    destiny.id = id;
    destiny.name = data.name;
    destiny.street = data.street;
    destiny.number = data.number;
    destiny.complement = data.complement;
    destiny.state = data.state;
    destiny.city = data.city;
    destiny.zip_code = data.zip_code;

    dispath(recipientUpdateRequest(destiny));
  }

  function submitButtonBack() {
    history.push('/recipient');
  }

  return (
    <Container>
      <h1>Edição de destinatários</h1>
      <Form initialData={editRecipient} onSubmit={handleSubmit}>
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

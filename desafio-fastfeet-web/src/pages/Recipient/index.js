import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { FaPlus, FaSpinner, FaSearch } from 'react-icons/fa';

import { toast } from 'react-toastify';
import { Container, Content, Form, SubmitButton, List, Window } from './styles';
import Actions from '~/components/Actions';

import api from '~/services/api';
import history from '~/services/history';

export default function Recipient() {
  const [recipient, setRecipient] = useState([]);
  const [visible, setVisible] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [b, setB] = useState(true);
  const deleted = useSelector((state) => state.recipient.deleted);
  const loading = false;

  useEffect(() => {
    async function loadRecipient() {
      const response = await api.get('recipients');
      const { data } = response;

      setRecipient(data);
    }
    loadRecipient();
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

  function pageAddRecipient(e) {
    e.preventDefault(e);
    history.push('/createRecipient');
  }

  function handleChangeSearch(e) {
    e.preventDefault(e);
    setNewSearch(e.target.value);
  }

  async function handleAddnewSearch(e) {
    e.preventDefault(e);

    const response = await api.get(`recipient?name=${newSearch}`);
    const { data } = response;

    if (data.length === 0) {
      toast.error('Destino não encontrado');
      return;
    }

    setRecipient(data);
  }

  return (
    <>
      <Container>
        <Content>
          <h1>Gerenciando destinatários</h1>
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

            <SubmitButton onClick={pageAddRecipient} loading={loading}>
              {loading ? (
                <FaSpinner color="#FFF" size={14} />
              ) : (
                ((<FaPlus color="#FFF" size={14} />), 'Cadastrar')
              )}
            </SubmitButton>
          </Form>

          <table cellSpacing="0">
            <List>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Endereço</th>
                  <th>
                    <span>Ações</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {recipient.map((client) => (
                  <tr key={client.id}>
                    <td>#{client.id}</td>
                    <td>{client.name}</td>
                    <td>{client.street}</td>
                    <td>
                      <button
                        id={client.id}
                        type="button"
                        onClick={handleToggleVisible}
                      >
                        ...
                      </button>
                      <Window id={client.id} test={parseFloat(visible)}>
                        <Actions>{client}</Actions>
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

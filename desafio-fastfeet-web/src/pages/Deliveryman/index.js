import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { FaPlus, FaSpinner, FaSearch } from 'react-icons/fa';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content, Form, SubmitButton, List, Window } from './styles';
import Actions from '~/components/Actions';

export default function Deliveryman() {
  const [listDeliveryman, setDeliveryman] = useState([]);
  const [visible, setVisible] = useState('');
  const [openActions, setOpenActions] = useState(true);
  const [search, setSearch] = useState('');
  const loading = false;
  const deleted = useSelector((state) => state.deliveryman.deletedDelyveriman);

  useEffect(() => {
    async function loadDeliveryman() {
      const response = await api.get('couriers');
      const { data } = response;

      setDeliveryman(data);
    }
    loadDeliveryman();
  }, [deleted]);

  function handleToggleVisible(e) {
    setOpenActions(!openActions);
    if (openActions) {
      const t = e.target.id;
      setVisible(t);
    } else {
      setVisible('');
    }
  }

  function pageAddDeliveryman(e) {
    e.preventDefault(e);
    history.push('/createdeliveryman');
  }

  function setSearchNewDeliveryman(e) {
    e.preventDefault(e);
    setSearch(e.target.value);
  }

  async function loadingNewSearchDeliveryman(e) {
    e.preventDefault(e);

    const response = await api.get(`courier?name=${search}`);
    const { data } = response;

    if (data.length === 0) {
      toast.error('Item Não encontrado');
      return;
    }

    setDeliveryman(data);
  }

  return (
    <>
      <Container>
        <Content>
          <h1>Gerenciando entregadores</h1>
          <Form onSubmit={loadingNewSearchDeliveryman}>
            <div>
              <button className="search" type="submit">
                <FaSearch size={16} color="#EEE" />
              </button>
              <input
                type="text"
                placeholder="Buscar por entregadores"
                onChange={setSearchNewDeliveryman}
              />
            </div>
            <SubmitButton onClick={pageAddDeliveryman} loading={loading}>
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
                  <th>Foto</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>
                    <span>Ações</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {listDeliveryman.map((deliveryman) => (
                  <tr>
                    <td>#{deliveryman.id}</td>
                    <td>
                      <img
                        src={deliveryman.avatar.url}
                        alt={deliveryman.name}
                      />
                    </td>
                    <td>{deliveryman.name}</td>
                    <td>{deliveryman.email}</td>
                    <td>
                      <button
                        id={deliveryman.id}
                        type="button"
                        onClick={handleToggleVisible}
                      >
                        ...
                      </button>

                      <Window
                        id={deliveryman.id}
                        visible={parseInt(visible, 10)}
                      >
                        <Actions>{deliveryman}</Actions>
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

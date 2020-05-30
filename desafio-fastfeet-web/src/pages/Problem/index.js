/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { MdInsertEmoticon } from 'react-icons/md';

import { Container, Content, List, Window, NoProblem } from './styles';
import Actions from '~/components/Actions';

import api from '~/services/api';

export default function Recipient() {
  const [recipient, setRecipient] = useState([]);
  const [visible, setVisible] = useState('');
  const [b, setB] = useState(true);
  const deleted = useSelector((state) => state.recipient.deleted);

  useEffect(() => {
    async function loadRecipient() {
      const response = await api.get('problems');
      const { data } = response;

      // const data = response.data.filter(function(obj) {
      //   return obj.canceled_at !== null;
      // });
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

  return (
    <>
      <Container>
        <Content>
          {Object.keys(recipient).length !== 0 ? (
            <>
              <h1>Problemas na entrega</h1>

              <table cellSpacing="0">
                <List>
                  <thead>
                    <tr>
                      <th>Entrega</th>
                      <th>Problema</th>

                      <th>
                        <span>Ações</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recipient.map((delivery) => (
                      <tr key={delivery.id}>
                        <td>#{delivery.delivery_id}</td>
                        <td>{delivery.description}</td>
                        <td>
                          <button
                            id={delivery.id}
                            type="button"
                            onClick={handleToggleVisible}
                          >
                            ...
                          </button>
                          <Window id={delivery.id} test={parseFloat(visible)}>
                            <Actions>{delivery}</Actions>
                          </Window>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </List>
              </table>
            </>
          ) : (
            <>
              <NoProblem>
                <MdInsertEmoticon size={65} color="#999" />
                <strong>Não existe problemas</strong>
              </NoProblem>
            </>
          )}
        </Content>
      </Container>
    </>
  );
}

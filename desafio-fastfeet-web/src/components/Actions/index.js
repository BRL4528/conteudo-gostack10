/* eslint-disable no-inner-declarations */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { MdRemoveRedEye, MdEdit, MdDeleteForever } from 'react-icons/md';

import { toast } from 'react-toastify';
import { deliverymanDeleteRequest } from '~/store/modules/deliveryman/actions';
import { orderDeleteRequest } from '~/store/modules/order/actions';
import { recipientDeleteRequest } from '~/store/modules/recipient/actions';
import { problemCancelRequest } from '~/store/modules/problem/actions';

import { Action, Visible, View, BoxProblem } from './styles';

import history from '~/services/history';
import api from '~/services/api';

export default function Actions({ children }) {
  const [visibleComponents, setVisible] = useState(false);
  const [page, setPage] = useState('');
  const [valuesModules, setValuesModules] = useState([]);
  const [orders, setOrders] = useState([]);
  const [view, setView] = useState('');
  const [a, setA] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setValuesModules(children);
    const url_string = window.location.href;
    const url = new URL(url_string);

    if (url.pathname === '/dashboard') {
      setVisible(true);
      setPage('/dashboard');
      return;
    }

    if (url.pathname === '/deliveryman') {
      setVisible(false);
      setPage('/deliveryman');
      return;
    }
    if (url.pathname === '/recipient') {
      setVisible(false);
      setPage('/recipient');
      return;
    }
    if (url.pathname === '/problem') {
      setVisible(true);
      setPage('/problem');
      return;
    }

    setVisible(true);
  }, []);

  useEffect(() => {
    async function load() {
      if (page !== '') {
        const response = await api.get('orders');
        const { data } = response;
        setOrders(data);
      }
    }
    load();
  }, [page]);

  function handleToggleView(e) {
    setA(!a);
    if (a) {
      const { id } = e.target;
      setView(id);
    } else {
      setView('');
    }
  }

  async function handleDelet(e) {
    e.preventDefault(e);
    if (page === '/deliveryman') {
      const idDeliveryman = orders.find(
        (couriers) => couriers.deliveryman.id === valuesModules.id
      );
      if (idDeliveryman === undefined) {
        dispatch(deliverymanDeleteRequest(valuesModules.id));
      } else {
        toast.warning('Este entregador esta vinculado a uma entrega!');
      }
    }
    if (page === '/recipient') {
      const idRecipient = orders.find(
        (couriers) => couriers.recipient.id === valuesModules.id
      );
      if (idRecipient === undefined) {
        dispatch(recipientDeleteRequest(valuesModules.id));
      } else {
        toast.warning('Este destino esta vinculado a uma entrega!');
      }
    }
    if (page === '/problem') {
      dispatch(problemCancelRequest(e.target.name));
    }

    if (page === '/dashboard') {
      dispatch(orderDeleteRequest(valuesModules.id));
    }
  }

  function handleEdit(e) {
    if (page === '/deliveryman') {
      history.push(`editDeliveryman/?id=${e.target.id}`);
      return;
    }
    if (visibleComponents) {
      history.push(`editOrder/?id=${e.target.id}`);
      return;
    }
    if (page === '/recipient') {
      history.push(`editRecipient/?id=${e.target.id}`);
    }
  }

  return (
    <>
      <Action visible={visibleComponents}>
        {visibleComponents ? (
          <>
            <p>
              <MdRemoveRedEye size={13} id={valuesModules.id} color="#7159c1" />
              <button
                type="button"
                id={valuesModules.id}
                onClick={handleToggleView}
              >
                Visualizar
              </button>
            </p>
          </>
        ) : (
          ''
        )}
        {page === '/problem' ? (
          ''
        ) : (
          <>
            <p>
              <MdEdit size={13} color="blue" />
              <button type="button" id={valuesModules.id} onClick={handleEdit}>
                Editar
              </button>
            </p>
          </>
        )}

        <p>
          <MdDeleteForever size={13} color="red" />
          <button
            id={valuesModules.id}
            name={valuesModules.delivery_id}
            onClick={handleDelet}
            type="submit"
          >
            {page === '/problem' ? 'Cancelar' : 'Excluir'}
          </button>
        </p>
      </Action>
      {visibleComponents && page !== '/problem' ? (
        <>
          <Visible
            name="View"
            id={valuesModules.id}
            test={parseFloat(view)}
            onClick={handleToggleView}
            visible={visibleComponents}
          />

          <View name="View" id={valuesModules.id} test={parseFloat(view)}>
            <strong>Informações da encomenda</strong>
            <p>
              {children.recipient.street}, {children.recipient.number}
            </p>
            <p>{children.recipient.city}</p>
            <p>{children.recipient.zip_code}</p>

            <strong>Datas</strong>
            <div>
              <strong>Retirada</strong>
              <p>
                {valuesModules.start_date === null
                  ? 'Pendente'
                  : valuesModules.start_date}
              </p>
              <strong>Entrega</strong>
              <p>
                {valuesModules.end_date === null
                  ? 'Pendente'
                  : valuesModules.end_date}
              </p>
            </div>

            <strong>Assinatura</strong>
            <p>
              {valuesModules.signature === null
                ? 'Pendente'
                : valuesModules.signature}
            </p>
          </View>
        </>
      ) : (
        ''
      )}
      {page === '/problem' ? (
        <>
          <BoxProblem>
            <Visible
              name="View"
              id={valuesModules.id}
              test={parseFloat(view)}
              onClick={handleToggleView}
              visible={visibleComponents}
            />

            <View name="View" id={valuesModules.id} test={parseFloat(view)}>
              <strong>Visualizar problema</strong>

              <p>{children.description}</p>
            </View>
          </BoxProblem>
        </>
      ) : (
        ''
      )}
    </>
  );
}

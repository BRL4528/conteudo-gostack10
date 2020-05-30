import React from 'react';
import Header from '../../components/Header';

// import { Container } from './styles';

export default function CreateOrders() {
  return (
    <>
      <form onSubmit={() => {}}>
        <div>
          <label>Destinatários</label>
          <select name="createOrder">
            <option value="valdir">Valdir</option>
            <option value="Catra">catra</option>
            <option value="Paulo Veloster">Paulo Veloster</option>
          </select>
        </div>
        <div>
          <label>Entregador</label>
          <select name="entregador">
            <option value="valdir">Valdir</option>
            <option value="Catra">catra</option>
            <option value="Paulo Veloster">Paulo Veloster</option>
          </select>
        </div>
        <div>
          <label>Nome do produto</label>
          <input type="input" placeholder="Nome produto" />
        </div>
      </form>
    </>
  );
}

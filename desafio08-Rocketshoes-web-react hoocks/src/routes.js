import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';

export default function Routes() {
  return (
    // Switch => Obriga apenas uma rota ser chamada por momento.
    // Quando coloco apenas / no path, preciso expecificar minha rota com exact, para ser a rota exata que estou descrevendo.
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/cart" exact component={Cart} />
    </Switch>
  );
}

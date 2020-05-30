import React from 'react';
// BrowserRouter Resposavel pelo modelo de rotas, o caminho na barra do browser
// Switch garante que apenas uma rota seja chamada por momento
// Route representa uma pagina da aplicação
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Repository from './pages/Repository';

export default function Routes() {
  return (
    // O BrowserRouter procura pelo inicio do "path" e não pela URL que usuario digitou, ou seja pelo "/",
    // Para chamar o "path" exato para os caminhos "path='/repository'", utiliza-se "exact".

    // Para Receber parametros atraves do URL, preciso avisar em minhas Routes, fazendo => path="/repository/:repository",
    // onde o :repository é o nome do parametro que estou enviando.

    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />

        <Route path="/repository/:repository" component={Repository} />
      </Switch>
    </BrowserRouter>
  );
}

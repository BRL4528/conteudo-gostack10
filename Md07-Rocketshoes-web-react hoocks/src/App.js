import React from 'react';
import { Router } from 'react-router-dom';

// Deixa disponivel o Store(Meu Redux), diponivel para toda a aplicação.
import { Provider } from 'react-redux';
// Responsavel pelas mensagens de erro em tela.
import { ToastContainer } from 'react-toastify';

import './config/ReactotronConfig';

import GlobalStyle from './styles/global';
import Header from './components/Header';
import Routes from './routes';

import history from './services/history';
import store from './store';

function App() {
  return (
    // Envolvendo minha aplicação com o Provider, toda a aplicação tera acesso ao Store.
    <Provider store={store}>
      <Router history={history}>
        <Header />
        <Routes />
        <GlobalStyle />
        {/* autoClose significa o tempo de minha mensagem na tela    */}
        <ToastContainer autoClose={3000} />
      </Router>
    </Provider>
  );
}

export default App;

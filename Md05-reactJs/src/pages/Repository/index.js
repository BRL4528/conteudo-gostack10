import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import {
  Loading,
  Owner,
  IssueList,
  Bot,
  Button,
  PageControl,
  NumberPage,
} from './styles';

export default class Repository extends Component {
  // Preciso validar as informações que estão vindo atravez de meu URL, e para isso,
  // Utilizo o propsTypes.
  // eslint-disable-next-line react/sort-comp
  static propsTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.sstring,
      }),
    }).isRequired,
  };

  // eslint-disable-next-line react/state-in-constructor
  state = {
    repository: {},
    issues: [],
    loading: true,
    pagina: 1,
  };

  // Faz a chamada na API para pegar dados dos repositorios
  async componentDidMount(tag) {
    // Responsavem para acessar os dados que estou recebendo da barra URL
    // eslint-disable-next-line react/prop-types
    const { match } = this.props;

    // Neste ponto preciso Ajustar os dados que vem da barra URL utilizo o => decodeURIComponent, e para acessar os dados,
    // Utilizo o match.params, onde estarão meus dado que estou recebendo do URL
    // eslint-disable-next-line react/prop-types
    const repoName = decodeURIComponent(match.params.repository);

    const { pagina } = this.state;
    // VERIFICA AQ QUAL É A CONDIÇÃO DO ISSUES QUE USUARIO ESTA PEDINDO
    if (tag === undefined) {
      // eslint-disable-next-line no-param-reassign
      tag = 'all';
    }

    // Para Fazer as duas Chamada na API, ao mesmo tempo, fasso dessa forma =>
    /*
    * const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`,
    * */
    // E salvo em um Array => [repository, issues]
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      // Para minha segunda chamada, estou enviando alguns Parametros, as que estão em aberto (state: 'open',) e paginando de 5 em cinco (per_page: 5,)
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: tag,
          page: pagina,
        },
      }),
    ]);

    // Armazeno as informações Buscadas da API no meu State
    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  handleSelectChange = (e) => {
    this.componentDidMount(e.target.value);
  };

  handleSelectPageNext = (e) => {
    // eslint-disable-next-line radix
    let numero = parseInt(e.target.value);
    numero += 1;
    this.atualiza(numero);

    this.componentDidMount();
  };

  handleSelectPageBack = (e) => {
    // eslint-disable-next-line radix
    let numero = parseInt(e.target.value);
    numero -= 1;
    this.atualiza(numero);

    this.componentDidMount();
  };

  atualiza(x) {
    this.setState({ pagina: x });
  }

  render() {
    // Fasso a Desestruturação de meu State, para poder utilizar nos componets
    const { repository, issues, loading, pagina } = this.state;

    // Equanto acontece a chamada na API, meu loading vai estar True, onde apresento uma
    // tela de carregamento.
    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    // Apos a chamada na API realizada, apresendo os dados buscados.
    return (
      <Container>
        <div>
          <NumberPage>
            Pagina:
            {pagina}
          </NumberPage>
          <Bot id="selc" onChange={this.handleSelectChange}>
            <option value="all">Todos</option>
            <option value="open">Abertos</option>
            <option value="closed">Fechados</option>
          </Bot>
        </div>

        <Owner>
          <Link to="/">Voltar aos Repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          {issues.map((issue) => (
            <li key={String(issues.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map((label) => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <PageControl>
          <Button value={pagina} onClick={this.handleSelectPageBack}>
            Anterior
          </Button>
          <Button value={pagina} onClick={this.handleSelectPageNext}>
            Proximo
          </Button>
        </PageControl>
        <NumberPage>
          Pagina:
          {pagina}
        </NumberPage>
      </Container>
    );
  }
}

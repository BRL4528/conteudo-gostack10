/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List, ImputForm } from './styles';

export default class Main extends Component {
  // newRepo: '' = Armazena os dados digitados pelo usuario
  // epositories: [] = Meu array de repositorios ja adicionados
  // loading: false = para quando estiver fazendo a chamada na API, anima o button com um Loading
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: false,
  };

  // Carregar dados do local storage
  componentDidMount() {
    // Pego os dados do Local Storage
    const repositories = localStorage.getItem('repositories');

    // Se tiver algo, preencho o meu repositories
    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Salvar os dados do local storage
  componentDidUpdate(_, prevState) {
    // Pego meus repositorios
    const { repositories } = this.state;
    // Faço uma comparação, para saber se ouve alterações nos meus repositorios.
    if (prevState.repositories !== repositories) {
      // Se sim, eu salvo no local Storage, Se não, Faço Nada
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  // Pega o Event do input e Armazena dentro do newRepo
  handleInputChange = (e) => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async (e) => {
    try {
      // Evita que o Formulario Faça o Refresh na pagina =>  e.preventDefault();
      e.preventDefault();

      // abilita o Loading Para Quando estiver fazendo a chamada na API, anima o button com um "Carregando  "
      this.setState({ loading: true });
      this.setState({ error: false });

      // Fasso a Desestruturação para pegar o valor digitado pelo User de dentro de newRepo e pego o elemento repositories
      const { newRepo, repositories } = this.state;

      // Verifica se esxiste repositório repetido antes de realizar a chamada API
      const verificado = repositories.findIndex(
        // eslint-disable-next-line eqeqeq
        (val) => val.name == newRepo.toLowerCase()
      );
      if (verificado === -1) {
        // Fasso a chamada da API do GitHub
        const response = await api.get(`/repos/${newRepo}`);

        // Pega apenas as informações importantes da API do GitHub
        const data = {
          name: response.data.full_name.toLowerCase(),
        };

        // Utilizando o conceito de Imultabilidade do Rect [...repositories] copio o repositório ja existente e adiociono o novo [data].
        // Limpo o newRepo e mudo a tag do loading para falso para finalizar a animação.
        this.setState({
          repositories: [...repositories, data],
          newRepo: '',
          loading: false,
        });
      } else {
        // Se existir repositorio repetido mando o erro
        throw new Error('Repositório duplicado');
      }
    } catch (err) {
      this.setState({ loading: false });
      this.setState({ error: true });
    }
  };

  render() {
    // Fasso a Desestruturação, para pegar de dentro do State
    const { newRepo, repositories, loading, error } = this.state;

    // Quando meu Loading for True, insere atraves do CSS estilizações -  <SubmitButton loading={loading}>

    // Para saber se meu Loading esta Abilitado para adionar ou não a imagem de carregamento eu Realizo um
    // CONDITIONAL RENDERY =>

    // {loading ? (
    // <FaSpinner color="#FFF" size={14} />
    //  ) : (
    //  <FaPlus color="#FFF" size={14} />
    // )}

    // Para navegar ate a pagina de repositórios sem que a pagina recarregue, utilizo um componente do "react-router-dom",
    // o <Link /> no lugar de <a></a>, e para ajustar os dados que estou eviando atraves de minha URL, utilizo "encodeURIComponent", tirando assim a barra "/"
    // =>  <Link to={`/repository/${encodeURIComponent(repository.name)}`}>

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>
        <Form onSubmit={this.handleSubmit}>
          <ImputForm
            type="text"
            placeholder="Adicionar Repositório"
            value={newRepo}
            onChange={this.handleInputChange}
            error={error}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
        <List>
          {repositories.map((repository) => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  // Dessa forma estou recebendo os dados em meus parametros, e acessando o  parametro enviado de minha tela Man, no caso User.name
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  // Aqui fasso a validação de minhas propriedades, com prop-types, no caso estou utilizando a prop Navigation
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  // eslint-disable-next-line react/state-in-constructor
  state = {
    stars: [],
    loading: false,
    charge: false,
    refreshing: false,
    page: 1,
  };

  // Informações que são buscadas automaticamente quando usuario entra na tela de User
  async componentDidMount() {
    this.load();
  }

  load = async (page = 1) => {
    // faz verificação, para ver qual loading apresentar
    if (page < 2) {
      this.setState({ loading: true });
    }
    if (page > 1) {
      this.setState({ charge: true });
    }

    const { stars } = this.state;

    // Como ja acessei minhas propriedades na linha 21, apenas desestruturo o navigation, e utilizo as informações passadas pela minha tela principal.
    const { navigation } = this.props;
    // Aqui pego as informações que estão sendo passandas da minha pagina principal.
    const user = navigation.getParam('user');
    // Pego as informações de minha API
    const response = await api.get(`/users/${user.login}/starred`, {
      params: { page },
    });

    // Atualizo o estado, fazendo uma verificação da pagina, caso ela seja menor que 1, apenas coloco os dados => refresh, caso seja maior que 1, siginifica que mudei de pagina
    // então copio meus stars e coloco os novos da nova pagina.
    this.setState({
      stars: page >= 2 ? [...stars, ...response.data] : response.data,
      page,
      loading: false,
      charge: false,
    });
  };

  // Chegando nos 20% de conteudo, envia para meu load, o numero da pagina nova.
  loadMore = () => {
    const { page } = this.state;

    const PaginaSeguinte = page + 1;

    this.load(PaginaSeguinte);
  };

  // Quando ativar os 20% de conteudo, e meu charge esti
  renderFooter = () => {
    const { charge } = this.state;
    if (charge) return null;
    return (
      <>
        <ActivityIndicator />
      </>
    );
  };

  // Quando o refresh estiver true, ativa o onRefrech, que roda a funça que dara o refrech
  refreshList = () => {
    let { page } = this.state;
    if (page <= 1) {
      this.load(page);
    } else {
      page = 1;
      const refreshPage = page;
      this.load(refreshPage);
    }
  };

  // Enviando os dados para a pagina Stars
  handleNavigate = repository => {
    const { navigation } = this.props;

    navigation.navigate('Stars', { repository });
  };

  render() {
    // Fasso a desestruturação
    const { navigation } = this.props;
    const { stars, loading, refreshing } = this.state;

    // Aqui pego as informações que estão sendo passandas da minha pagina principal.
    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (
          <ActivityIndicator color="#999" />
        ) : (
          <Stars
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            data={stars}
            keyExtractor={star => String(star.id)}
            ListFooterComponent={this.renderFooter}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            renderItem={({ item }) => (
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <TouchableOpacity onPress={() => this.handleNavigate(item)}>
                    <Title>{item.name}</Title>
                  </TouchableOpacity>

                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}

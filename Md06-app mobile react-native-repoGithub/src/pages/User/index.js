import 'react-native-gesture-handler';
import React, { Component } from 'react';
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
    }).isRequired,
  };

  // eslint-disable-next-line react/state-in-constructor
  state = {
    stars: [],
  };

  // Informações que são buscadas automaticamente quando usuario entra na tela de User
  async componentDidMount() {
    // Como ja acessei minhas propriedades na linha 21, apenas desestruturo o navigation, e utilizo as informações passadas pela minha tela principal.
    const { navigation } = this.props;
    // Aqui pego as informações que estão sendo passandas da minha pagina principal.
    const user = navigation.getParam('user');
    // Pego as informações de minha API
    const response = await api.get(`/users/${user.login}/starred`);
    // Atualizo o estado
    this.setState({ stars: response.data });
  }

  render() {
    // Fasso a desestruturação
    const { navigation } = this.props;
    const { stars } = this.state;

    // Aqui pego as informações que estão sendo passandas da minha pagina principal.
    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      </Container>
    );
  }
}

import 'react-native-gesture-handler';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

export default class Main extends Component {
  // eslint-disable-next-line react/sort-comp
  static navigationOptions = {
    title: 'Usuários',
  };

  // Fasso a verificação de minhas Propriedades com o prop-types
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  // Crio meu State
  // eslint-disable-next-line react/state-in-constructor
  state = {
    newUser: '',
    users: [],
    loading: false,
  };

  // Assim como no local storage do computador, utilizo AsyncStorage, uma biblioteca que permiti utilizar locar storage do celualr
  // Mas aqui, ele deve ser asincrono, porque demora um pouco para gravar os dados no banco de dados.
  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');
    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  // Verifico as informações do meu state atual, caso haja novas informações, atualizo no local storage
  async componentDidUpdate(_, prevState) {
    const { users } = this.state;

    if (prevState.users !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  // buscando na API
  handleAddUser = async () => {
    const { users, newUser } = this.state;

    this.setState({ loading: true });

    const response = await api.get(`/users/${newUser}`);

    // Salvando as informações que quero utilizar
    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    // Setando no state
    this.setState({
      users: [...users, data],
      newUser: '',
      loading: false,
    });
    // Utilizo este elemento para o teclado sumir ao final da chamada
    Keyboard.dismiss();
  };

  // Para minnha navegação, envio as informações de meus User, atravez da propriedade de navegação, que é acessada atraves de minhas Propriedade.
  handleNavigate = user => {
    const { navigation } = this.props;

    navigation.navigate('User', { user });
  };

  // No input existe varios atributos de assecibilidade, estou desabilitando =>  autoCorrect={false}, se estiver true faz correção automatica
  // faz a capaptalização padrão da primeira letra colocada na frase =>  autoCapitalize="none"
  // estiliza a tecla do teclado para enviar od dados do input =>  returnKeyType="send"
  // passo a função para a tecla do teclado => onSubmitEditing={this.handleAddUser}

  // Para listar itens no React Native, utilizo o FlatList, em meu componente List, adiciono data={users}, que são os dados a serem listados,
  // adiciono   keyExtractor={user => user.login}, igual o key do Web, a chave unica do elemneto a ser mapeado,
  // Para mim renderiar as informações, utilizo => renderItem={({ item }), desestruturando o elemento que tem as informações dos itens.

  render() {
    const { users, newUser, loading } = this.state;
    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar usuário"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Icon name="add" size={20} color="#FFF" />
            )}
          </SubmitButton>
        </Form>
        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>

              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>Ver perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}

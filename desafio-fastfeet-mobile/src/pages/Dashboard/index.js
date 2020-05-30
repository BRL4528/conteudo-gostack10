import React, { useEffect } from 'react';
import { View } from 'react-native';

import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import Background from '~/components/Background';

import Delivery from '~/components/Delivery';

import {
  Container,
  TextName,
  TextHome,
  Avatar,
  Header,
  Left,
  Card,
  SubCard,
  ButtonPending,
  ButtonDelivered,
  TextPeding,
  TextDelivered,
  List,
} from './styles';

export default function Dashboard() {
  const data = useSelector((state) => state.auth.data);

  //  useEffect(() => {
  //    async function loadAppointments() {
  //      const response = await api.get('')
  //    }
  //  })

  return (
    <Background>
      <Container>
        <Header>
          <Left>
            <Avatar
              source={{
                uri: data.avatar
                  ? data.avatar.url
                  : `https://api.adorable.io/avatar/50/${data.name}.png`,
              }}
            />
            <View>
              <TextHome>Seja bem vindo de volta!</TextHome>
              <TextName>{data.name}</TextName>
            </View>
          </Left>
          <Icon name="input" size={23} color="red" />
        </Header>
        <Card>
          <TextName>Entregas</TextName>
          <SubCard>
            <ButtonPending onPress={() => {}}>
              <TextPeding>Pedidos</TextPeding>
            </ButtonPending>
            <ButtonDelivered onPress={() => {}}>
              <TextDelivered>Entregue</TextDelivered>
            </ButtonDelivered>
          </SubCard>
        </Card>

        <List
          data={data}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <Delivery data={item} />}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Entregas',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="menu" size={20} color={tintColor} />
  ),
};

import React from 'react';
import { Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
// import line from '~/assets/line.png';

import {
  Container,
  Left,
  NameDelivery,
  Situation,
  Info,
  Card1,
  TextCard1,
  Line,
  Card2,
  TextTitle,
  TextSub,
  ButtonDetals,
  TextDetal,
} from './styles';

export default function Delivery({ data }) {
  return (
    <Container>
      <Left>
        <Icon name="directions" size={30} color="#7159c1" />
        <NameDelivery>Encomenda #{data.id}</NameDelivery>
      </Left>
      <Situation>
        <Card1>
          <Icon name="place" size={20} color="#1E0037" />
          <TextCard1>Aguardando retirada</TextCard1>
        </Card1>
        <Card1>
          <Icon name="place" size={20} color="#999" />
          <TextCard1> Retirada </TextCard1>
        </Card1>
        <Card1>
          <Icon name="place" size={20} color="#999" />
          <TextCard1>Entregue</TextCard1>
        </Card1>
        <Line />
      </Situation>
      <Info>
        <Card2>
          <TextTitle>Data</TextTitle>
          <TextSub>15/01/2020</TextSub>
        </Card2>
        <Card2>
          <TextTitle>Cidade</TextTitle>
          <TextSub>Rio do sul</TextSub>
        </Card2>
        <Card2>
          <ButtonDetals onPress={() => {}}>
            <TextDetal>Ver detalhes</TextDetal>
          </ButtonDetals>
        </Card2>
      </Info>
    </Container>
  );
}

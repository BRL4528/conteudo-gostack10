import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
`;

export const Left = styled.View`
  flex-direction: row;
`;

export const TextHome = styled.Text`
  font-size: 13px;
  color: #999;
  text-align: left;
  margin-left: 15px;
`;

export const TextName = styled.Text`
  font-size: 25px;
  color: #fff;
  font-weight: bold;
  text-align: left;
  margin-left: 15px;
`;

export const Avatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 32px;
  margin-left: 5px;
`;

export const Card = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 35px;
  margin-left: 10px;
`;

export const SubCard = styled.View`
  flex-direction: row;
  margin-left: 90px;
`;

export const ButtonPending = styled.TouchableOpacity``;

export const TextPeding = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

export const ButtonDelivered = styled.TouchableOpacity`
  margin-left: 20px;
`;

export const TextDelivered = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;

import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 15px;
  padding: 5px;
  border-radius: 4px;
  background: #fff;

  display: flex;
  flex-direction: column;

  justify-content: space-between;
`;

export const Left = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const NameDelivery = styled.Text`
  color: #1e0037;
  font-weight: bold;
  font-size: 17px;
`;

export const Situation = styled.View`
  flex-direction: row;
  margin-top: 17px;
`;

export const Card1 = styled.View`
  max-width: 80px;
  align-items: center;
  margin-left: 28px;
`;

export const TextCard1 = styled.Text`
  font-size: 13px;
  color: #999;
  text-align: center;
  margin-top: 5px;
`;

export const Line = styled.View`
  position: absolute;
  background: #eee;
  margin-top: 21px;
  margin-left: 65px;
  width: 182px;
  height: 3px;
`;

export const Info = styled.View`
  flex-direction: row;
  background: #eee;
  height: 50px;
  margin-top: 5px;
`;

export const Card2 = styled.View`
  margin-left: 15px;
`;

export const TextTitle = styled.Text`
  font-size: 13px;
  color: #999;
  text-align: left;
  margin-top: 5px;
`;

export const TextSub = styled.Text`
  color: #1e0037;
  font-weight: bold;
  font-size: 15px;
`;

export const ButtonDetals = styled.TouchableOpacity``;

export const TextDetal = styled.Text`
  margin-top: 22px;
  margin-left: 10px;
  color: #3a0176;
  font-weight: bold;
  font-size: 15px;
`;

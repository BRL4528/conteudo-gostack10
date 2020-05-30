import React from 'react';
import PropTypes from 'prop-types';
import { Browser } from './styles';

// Estou rescebendo as informações da pagina user, e implementando as informações no URI
export default function Repository({ navigation }) {
  const repository = navigation.getParam('repository');

  return <Browser source={{ uri: repository.html_url }} />;
}

// Fazendo a validação de minhas propriedades, para utilizar o Navigation e getParam.
// eslint-disable-next-line react/static-property-placement
Repository.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
Repository.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('repository').name,
});

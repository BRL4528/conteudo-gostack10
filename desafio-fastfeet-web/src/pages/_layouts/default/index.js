import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Content } from './styles';
import Header from '../../../components/Header';

// eslint-disable-next-line react/prop-types
export default function OptionsCreate({ children }) {
  return (
    <Wrapper>
      <Header />
      <Content>{children}</Content>
    </Wrapper>
  );
}
OptionsCreate.prototype = {
  children: PropTypes.element.isRequired,
};

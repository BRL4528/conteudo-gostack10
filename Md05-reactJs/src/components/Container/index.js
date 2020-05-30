import styled from 'styled-components';

// Para o icon ficar centralizado com o Texto do h1 eu uso =>   display: flex; e flex-direction: row; e  align-items: center;

const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;
export default Container;

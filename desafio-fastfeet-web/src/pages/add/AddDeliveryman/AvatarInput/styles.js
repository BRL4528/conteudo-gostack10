import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  height: 120px;
  width: 120px;
  padding: 15px;
  margin-bottom: 30px;
  text-align: center;
  border-radius: 50%;
  border: 2px solid #eee;
  border-style: dashed;

  label {
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
    img {
      height: 120px;
      width: 120px;
      margin-left: -17px;
      margin-top: -17px;
      border-radius: 50%;
      border: 4px solid rgba(255, 255, 255, 0.3);
      background: #eee;
    }
    input {
      display: none;
    }

    p {
      color: #999;
    }
  }
`;

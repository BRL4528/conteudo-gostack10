import styled from 'styled-components';

export const SubmitButtonBack = styled.button.attrs((props) => ({
  type: 'submit',
  disabled: props.loading,
}))`
  position: absolute;
  background: #7159c1;
  height: 35px;
  border: 0;
  padding: 0 15px;
  margin-left: 380px;
  margin-top: -90px;
  border-radius: 4px;
  display: flex;
  justify-content: left;
  align-items: center;
  color: #fff;
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
  div {
    margin: 0 5px;
  }
`;

export const SubmitButtonSave = styled.button.attrs((props) => ({
  type: 'submit',
  disabled: props.loading,
}))`
  position: absolute;
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  height: 35px;
  margin-left: 492px;
  margin-top: -90px;
  border-radius: 4px;
  display: flex;
  justify-content: left;
  align-items: center;
  color: #fff;
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
  div {
    margin: 0 5px;
  }
`;

export const Container = styled.div`
  max-width: 600px;
  margin: 100px auto;
  background: #fff;
  border-radius: 4px;
  padding: 15px;
  h1 {
    position: absolute;
    margin-top: -60px;
    margin-left: -15px;
    font-size: 23px;
  }
  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: #fff;
      border: 1px solid #9999;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #333;
      margin: 0 0 10px;
      &::placeholder {
        color: #999;
      }
    }
    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }
    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 10px 0 20px;
    }
  }
`;

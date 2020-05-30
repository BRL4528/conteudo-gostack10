import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    margin-top: 20px;
    margin-left: 10px;
    font-size: 20px;
  }
`;
export const Content = styled.div`
  width: 100%;
  max-width: 850px;
`;

export const Form = styled.div`
  height: 35px;
  margin-top: 30px;
  margin-left: 10px;
  display: flex;
  justify-content: space-between;

  .search {
    border: none;
    border-radius: 4px;
    background: #fff;
    padding: 5px;
    display: flex;
    align-items: center;
  }

  input {
    border: none;
    padding: 5px;
    border-radius: 4px;
    font-size: 12px;
    color: #343434;
    margin-left: 5px;
  }
`;

export const SubmitButtonBack = styled.button.attrs((props) => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 610px;
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
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 30px;
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

export const Box = styled.div`
  width: 100%;
  height: 200px;
  margin-top: 25px;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: left;
  background: #fff;

  div {
    margin: 15px;
  }

  select {
    width: 37%;
    border: 1px solid #eee;
    background: #fff;
    padding: 10px;
    margin: 0 10px;
    border-radius: 4px;
    font-size: 12px;
  }

  input {
    width: 100%;
    border: 1px solid #eee;
    padding: 10px;
    margin-top: 10px;
    border-radius: 4px;
    font-size: 12px;
    color: #343434;
  }
`;

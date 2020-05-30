import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    margin-top: 30px;
    margin-left: 10px;
    font-size: 20px;
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 800px;
`;

export const Form = styled.form`
  height: 35px;
  margin-top: 30px;
  margin-left: 10px;
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
  }

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
    border-radius: 4px;
    padding: 5px;
    font-size: 12px;
    color: #343434;
    margin-left: -2px;
  }
`;
const rotate = keyframes`
from {
transform: rotate(0deg)
}
to {
  transform: rotate(360deg)
}
`;

export const SubmitButton = styled.button.attrs((props) => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  border-radius: 4px;
  display: flex;
  justify-content: left;
  align-items: center;
  color: #fff;
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;
export const Title = styled.div`
  margin-top: 30px;

  strong {
    padding: 5px;
    margin: 27px;
  }
`;

export const List = styled.ul`
  margin-top: 35px;
  border-top: 1px solid #eee;
  list-style: none;
  color: #333;
  font-size: 13px;

  thead {
    padding: 15px 10px;
    border-radius: 4px;

    th {
      padding: 5px 20px;
      text-align: initial;

      > span {
        margin-left: 120px;
      }
    }
  }

  tbody {
    margin-top: -15px;
    background: #fff;
    padding: 5px 10px;
    border-radius: 4px;
    text-align: initial;

    td {
      width: 250px;
      padding: 15px 10px;
      border-bottom: 10px solid #eee;

      > button {
        margin-left: 140px;
        border: none;
        background: none;
        :hover {
          background: #eee;
        }
      }
    }
  }
`;

export const Window = styled.div`
  position: absolute;
  margin-left: 97px;
  margin-top: -13px;
  display: ${(props) => (props.id === props.test ? 'block' : 'none')};
`;

export const NoProblem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 25px;
  color: #999;
`;

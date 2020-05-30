import styled from 'styled-components';

export const Action = styled.div`
  position: absolute;
  margin-top: 25px;
  margin-left: -25px;
  width: 150px;
  height: ${(props) => (props.visible ? '120px' : '80px')};
  background: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 15px 5px;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 10px);
    top: -10px;

    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #eee9e9;
  }
  p {
    display: flex;
    align-items: center;
    padding: 5px;
    font-size: 12px;

    & + p {
      border-top: 1px solid #eee;
    }

    svg {
      margin: 0 5px;
      cursor: pointer;
    }
    :hover {
      background: #eee;
    }

    button {
      font-size: 12px;
      border: none;
      background: none;
    }
  }
`;

export const Visible = styled.div`
  position: absolute;
  margin-top: -800px;
  margin-left: -1022px;
  width: 100%;
  height: 500%;
  background: rgb(9, 9, 9, 0.6);
  display: ${(props) => (props.id === props.test ? 'block' : 'none')};
`;

export const View = styled.div`
  position: absolute;
  margin-left: -35%;
  margin-top: -5%;
  width: 350px;
  height: 180px;
  padding: 20px;
  border-radius: 4px;
  background: #fff;
  border: 1px solid #999;
  text-align: initial;
  display: ${(props) => (props.id === props.test ? 'block' : 'none')};

  div {
    display: flex;
    flex-direction: row;
  }

  p {
    margin: 0 5px;
    color: #999;
  }

  strong {
    margin: 0 5px 5px 5px;
  }
`;

export const BoxProblem = styled.div`
  margin-left: -420px;
`;

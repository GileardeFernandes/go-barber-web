import styled from 'styled-components';

export const Container = styled.div`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;
  display: flex;
  color: #666360;
  & + div {
    margin-top: 8px;
  }
  input {
    flex: 1;
    border: 0;
    background: transparent;
    color: #fff;
    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

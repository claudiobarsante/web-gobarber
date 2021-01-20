import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip/index';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}
// para aparecer o ícone dentro do input, na realidade tenho q jogar o css p o
// container e o input ficar dentro do container com o ícone
export const Container = styled.div<ContainerProps>`
  width: 340px;
  height: 56px;
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;
  color: #666360;

  display: flex;
  align-items: center;

  //aqui através dos props está acontecendo o seguinte: 1-sempre q o container receber o foco
  //a borda vai ficar laranja. 2- qdo sair se o input estiver preenchido o ícone fica em laranaj

  ${props =>
    props.isFocused &&
    css`
      border-color: #ff9000;
      color: #ff9000;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}
    ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }
  svg {
    margin-right: 16px;
  }
`;

// Aqui vai estilizar o tooltip
// atenção, ajustar no componente p ele poder receber classes-é assim q o styled component funciona
export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }
  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;

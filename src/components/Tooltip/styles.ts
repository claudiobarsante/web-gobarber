import styled from 'styled-components';

export const Container = styled.div`
  position: relative; //assim todo position absolute q está dentro desse container vai ser relativo
  //ao container e não ao restante da tela
  span {
    width: 160px;
    background: #ff9000;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    //para o elemento ficar escondido
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;
    //
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    color: #312e38;
    //isso aqui é úm hack p aparecer um flexinha no tooltip
    &::before {
      content: '';
      border-style: solid;
      border-color: #ff9000 transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%; //para centralizar junto com o debaixo
      transform: translateX(-50%);
    }
  }
  //só vai aparecer qdo passar o mouse por cima
  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;

/* eslint-disable react/prop-types */
import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

// qdo a interface não vai sobrescrever nada, posso transformar em um type
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

// se vier props outro type de botão o q está aqui vai ser sobrescrito
// pelo children está sendo passado o nome q está no botão e rest o resto das propriedades
// "react/props-types":"off" adiconar no eslint p não dar bug no children
//
const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Button;

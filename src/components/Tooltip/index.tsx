import React from 'react';
import { Container } from './styles';

interface TooltipProps {
  title: string;
  className?: string; // p esse componente poder ser estilizado pelo styled component
}
const Tooltip: React.FC<TooltipProps> = ({ title, className, children }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;

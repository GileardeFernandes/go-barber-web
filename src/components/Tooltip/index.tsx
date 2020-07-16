import React from 'react';
import { Container } from './style';

interface TooltipProp {
  title: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProp> = ({ className, children, title }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;

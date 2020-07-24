import React from 'react';
import { useTransition } from 'react-spring';
import { Container } from './style';
import { ToastMessage } from '../../Hooks/Toast';
import Toast from './Toast';

interface ToastProps {
  message: ToastMessage[];
}

const ToastContainer: React.FC<ToastProps> = ({ message }) => {
  const messageWithTransition = useTransition(
    message,
    messages => messages.id,
    {
      from: { right: '-120%' },
      enter: { right: '0%' },
      leave: { right: '-120%' },
    },
  );

  return (
    <Container>
      {messageWithTransition.map(({ item, key, props }) => (
        <Toast key={key} message={item} style={props} />
      ))}
    </Container>
  );
};

export default ToastContainer;

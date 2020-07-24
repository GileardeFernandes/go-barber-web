import React from 'react';

import { Container } from './style';
import { ToastMessage } from '../../Hooks/Toast';
import Toast from './Toast';

interface ToastProps {
  message: ToastMessage[];
}

const ToastContainer: React.FC<ToastProps> = ({ message }) => {
  return (
    <Container>
      {message.map(item => (
        <Toast key={item.id} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;

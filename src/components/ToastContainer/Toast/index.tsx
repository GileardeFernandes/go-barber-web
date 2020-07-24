import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiXCircle,
  FiCheckCircle,
  FiInfo,
} from 'react-icons/fi';
import { Container } from './style';
import { ToastMessage, useToast } from '../../../Hooks/Toast';

interface ToastProps {
  message: ToastMessage;
}

const icons = {
  success: <FiCheckCircle size={24} />,
  error: <FiAlertCircle size={24} />,
  info: <FiInfo size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const time = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearInterval(time);
    };
  }, [removeToast, message.id]);
  return (
    <Container type={message.type} hasDescription>
      {icons[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;

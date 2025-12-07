import { useState, useEffect, useCallback } from 'react';
import {
  ToastContainer,
  Toast,
  ToastIcon,
  ToastMessage,
  ConfettiContainer,
  Confetti,
} from './toast.styles';

let toastId = 0;

const ToastNotification = () => {
  const [toasts, setToasts] = useState([]);
  const [confetti, setConfetti] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = toastId++;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const triggerConfetti = useCallback(() => {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: Date.now() + i,
      color: colors[Math.floor(Math.random() * colors.length)],
      left: Math.random() * 100,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 0.5,
    }));

    setConfetti(newConfetti);

    setTimeout(() => {
      setConfetti([]);
    }, 4000);
  }, []);

  useEffect(() => {
    // Make functions globally accessible
    window.showToast = addToast;
    window.triggerConfetti = triggerConfetti;

    return () => {
      delete window.showToast;
      delete window.triggerConfetti;
    };
  }, [addToast, triggerConfetti]);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'info':
        return 'ℹ️';
      default:
        return '✨';
    }
  };

  return (
    <>
      <ToastContainer>
        {toasts.map((toast) => (
          <Toast key={toast.id} type={toast.type}>
            <ToastIcon>{getIcon(toast.type)}</ToastIcon>
            <ToastMessage>{toast.message}</ToastMessage>
          </Toast>
        ))}
      </ToastContainer>

      {confetti.length > 0 && (
        <ConfettiContainer>
          {confetti.map((c) => (
            <Confetti
              key={c.id}
              color={c.color}
              left={c.left}
              duration={c.duration}
              delay={c.delay}
            />
          ))}
        </ConfettiContainer>
      )}
    </>
  );
};

export default ToastNotification;

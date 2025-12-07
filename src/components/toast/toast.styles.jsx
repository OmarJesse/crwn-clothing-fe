import styled, { keyframes } from 'styled-components';

const confettiFall = keyframes`
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
`;

const toast = keyframes`
  0% {
    transform: translateX(400px);
    opacity: 0;
  }
  10% {
    transform: translateX(0);
    opacity: 1;
  }
  90% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(400px);
    opacity: 0;
  }
`;

export const ToastContainer = styled.div`
  position: fixed;
  top: 110px;
  right: 2rem;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  pointer-events: none;

  @media (max-width: 768px) {
    top: 90px;
    right: 1rem;
    left: 1rem;
  }
`;

export const Toast = styled.div`
  background: ${({ type }) => {
    switch (type) {
      case 'success':
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      case 'error':
        return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
      case 'info':
        return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
      default:
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  }};
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 300px;
  animation: ${toast} 3s ease-in-out forwards;
  pointer-events: auto;

  @media (max-width: 768px) {
    min-width: 0;
    width: 100%;
  }
`;

export const ToastIcon = styled.span`
  font-size: 1.5rem;
`;

export const ToastMessage = styled.p`
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  flex: 1;
`;

export const ConfettiContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
`;

export const Confetti = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: ${({ color }) => color};
  top: -10px;
  left: ${({ left }) => left}%;
  animation: ${confettiFall} ${({ duration }) => duration}s linear forwards;
  animation-delay: ${({ delay }) => delay}s;
  opacity: 0;
`;

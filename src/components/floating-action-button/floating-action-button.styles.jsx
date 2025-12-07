import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7);
  }
  50% {
    box-shadow: 0 0 0 20px rgba(102, 126, 234, 0);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const FABContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;

  @media (max-width: 768px) {
    bottom: 1.5rem;
    right: 1.5rem;
  }
`;

export const FABButton = styled.button`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 1.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: ${pulse} 2s infinite;

  &:hover {
    transform: scale(1.1) rotate(${({ isOpen }) => isOpen ? '90deg' : '0deg'});
    box-shadow: 0 12px 48px rgba(102, 126, 234, 0.6);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 56px;
    height: 56px;
    font-size: 1.5rem;
  }
`;

export const FABMenu = styled.div`
  position: absolute;
  bottom: 80px;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FABMenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 3rem;
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  animation: ${slideUp} 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation-delay: ${({ delay }) => delay}s;
  animation-fill-mode: both;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

  &:hover {
    background: rgba(102, 126, 234, 0.2);
    border-color: rgba(102, 126, 234, 0.6);
    transform: translateX(-8px) scale(1.05);
    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1.25rem;
    font-size: 0.875rem;
  }
`;

export const FABIcon = styled.span`
  font-size: 1.25rem;
`;

export const FABLabel = styled.span`
  font-weight: 600;
`;

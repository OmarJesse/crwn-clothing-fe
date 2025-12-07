import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% {
    box-shadow: 0 8px 32px rgba(16, 185, 129, 0.4);
  }
  50% {
    box-shadow: 0 8px 48px rgba(16, 185, 129, 0.6), 0 0 0 8px rgba(16, 185, 129, 0.1);
  }
`;

const bounceIn = keyframes`
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.2) rotate(180deg);
  }
  100% {
    transform: scale(1) rotate(360deg);
    opacity: 1;
  }
`;

export const FABButton = styled.button`
  position: fixed;
  bottom: 100px;
  right: 2rem;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  font-size: 2.5rem;
  font-weight: 300;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(16, 185, 129, 0.4);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 999;
  animation: ${bounceIn} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    transform: scale(1.1) rotate(90deg);
    box-shadow: 0 12px 48px rgba(16, 185, 129, 0.6);
    animation: ${pulse} 1.5s infinite;
  }

  &:active {
    transform: scale(0.95) rotate(90deg);
  }

  &::before {
    content: attr(data-tooltip);
    position: absolute;
    right: 75px;
    background: rgba(15, 23, 42, 0.95);
    color: white;
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    font-size: 0.875rem;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    white-space: nowrap;
    opacity: 0;
    transform: translateX(10px) scale(0.9);
    transition: all 0.3s ease;
    pointer-events: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  &::after {
    content: '';
    position: absolute;
    right: 65px;
    width: 0;
    height: 0;
    border-left: 8px solid rgba(15, 23, 42, 0.95);
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    opacity: 0;
    transform: translateX(10px);
    transition: all 0.3s ease;
    pointer-events: none;
  }

  &:hover::before,
  &:hover::after {
    opacity: 1;
    transform: translateX(0) scale(1);
  }

  @media (max-width: 768px) {
    bottom: 80px;
    right: 1.5rem;
    width: 56px;
    height: 56px;
    font-size: 2rem;

    &::before {
      right: 65px;
      font-size: 0.75rem;
      padding: 0.5rem 0.75rem;
    }

    &::after {
      right: 55px;
    }
  }
`;

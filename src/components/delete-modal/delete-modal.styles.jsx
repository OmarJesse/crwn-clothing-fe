import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const shake = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: ${fadeIn} 0.3s ease;
  padding: 1rem;
`;

export const ModalContainer = styled.div`
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.98), rgba(15, 23, 42, 0.98));
  border-radius: 1.5rem;
  padding: 2rem;
  max-width: 450px;
  width: 100%;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: ${slideUp} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const ModalIcon = styled.div`
  font-size: 4rem;
  animation: ${shake} 0.5s ease;
`;

export const ModalTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  text-align: center;
`;

export const ModalMessage = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

export const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
`;

export const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 0.75rem;
  object-fit: cover;
`;

export const ProductName = styled.span`
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  flex: 1;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

export const CancelButton = styled.button`
  flex: 1;
  padding: 0.875rem 1.5rem;
  border-radius: 0.75rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ConfirmButton = styled.button`
  flex: 1;
  padding: 0.875rem 1.5rem;
  border-radius: 0.75rem;
  border: none;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(245, 87, 108, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(245, 87, 108, 0.6);
  }

  &:active {
    transform: translateY(0);
  }
`;

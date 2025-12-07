import styled from "styled-components";

import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "../button/button.styles";

export const CartDropDownContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 450px;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  
  /* Dark sidebar design */
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  border-left: 1px solid rgba(102, 126, 234, 0.2);
  box-shadow: -10px 0 60px rgba(0, 0, 0, 0.5);
  
  z-index: 2000;
  
  transform: translateX(${({ isOpen }) => isOpen ? '0' : '100%'});
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  ${BaseButton},${GoogleSignInButton},${InvertedButton} {
    margin-top: auto;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 400px;
  }
`;

export const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  h2 {
    font-family: 'Poppins', sans-serif;
    font-size: 1.75rem;
    font-weight: 700;
    color: white;
    margin: 0;
  }
`;

export const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
  }
`;

export const EmptyMessage = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 1.125rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  margin: auto;
  text-align: center;
`;

export const CartItems = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  padding-right: 0.5rem;
  margin-bottom: 1.5rem;
  
  /* Custom Scrollbar for dark theme */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 10px;
  }
`;

export const CartOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 1999;
  opacity: ${({ isOpen }) => isOpen ? 1 : 0};
  visibility: ${({ isOpen }) => isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;


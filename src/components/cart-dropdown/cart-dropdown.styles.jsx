import styled from "styled-components";

import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "../button/button.styles";
import {
  surface,
  textPrimary,
  textSecondary,
  textMuted,
  borderSubtle,
  borderBase,
  primary,
  overlay,
  alpha,
} from "../../styles/style-helpers";

export const CartDropDownContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 450px;
  display: flex;
  flex-direction: column;
  padding: 2rem;

  background: ${({ theme }) => surface(theme)};
  color: ${({ theme }) => textPrimary(theme)};
  border-left: 1px solid ${({ theme }) => borderBase(theme)};
  box-shadow: -10px 0 60px ${({ theme }) => alpha("#0f172a", 0.32)};

  z-index: 2000;

  transform: translateX(${({ isOpen }) => (isOpen ? "0" : "100%")});
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
  border-bottom: 1px solid ${({ theme }) => borderSubtle(theme)};

  h2 {
    font-family: 'Poppins', sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: ${({ theme }) => textPrimary(theme)};
    margin: 0;
  }
`;

export const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => borderSubtle(theme)};
  border: none;
  border-radius: 0.5rem;
  color: ${({ theme }) => textPrimary(theme)};
  font-size: 1.5rem;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: ${({ theme }) => borderBase(theme)};
    transform: rotate(90deg);
  }
`;

export const EmptyMessage = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 1.05rem;
  font-weight: 500;
  color: ${({ theme }) => textMuted(theme)};
  margin: auto;
  text-align: center;
`;

export const CartItems = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  overflow-y: auto;
  padding-right: 0.5rem;
  margin-bottom: 1.5rem;

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => borderSubtle(theme)};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => primary(theme)};
    border-radius: 10px;
  }
`;

export const CartOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => overlay(theme)};
  backdrop-filter: blur(4px);
  z-index: 1999;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.3s;
`;

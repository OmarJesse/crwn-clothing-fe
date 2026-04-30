import styled from "styled-components";
import { SpinnerContainer } from "../spinner/spinner.styles";

export const BaseButton = styled.button`
  min-width: 160px;
  width: auto;
  height: 44px;
  letter-spacing: 0.01em;
  padding: 0 1.2rem;
  font-size: 0.88rem;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  text-transform: none;
  border: none;
  border-radius: 0.7rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  background: #0f172a;
  color: white;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.18);

  &:hover {
    background: #1e293b;
    transform: translateY(-1px);
    box-shadow: 0 12px 20px rgba(15, 23, 42, 0.22);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 6px 10px rgba(15, 23, 42, 0.18);
  }

  &:disabled {
    background: #e2e8f0;
    color: #94a3b8;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  /* Ensure text is above the gradient overlay */
  span {
    position: relative;
    z-index: 1;
  }
`;

export const GoogleSignInButton = styled(BaseButton)`
  background: #2563eb;
  box-shadow: 0 8px 18px rgba(37, 99, 235, 0.28);

  &:hover {
    background: #1d4ed8;
    box-shadow: 0 12px 24px rgba(37, 99, 235, 0.3);
  }

  &:active {
    box-shadow: 0 6px 12px rgba(37, 99, 235, 0.24);
  }
`;

export const InvertedButton = styled(BaseButton)`
  background: white;
  color: #0f172a;
  border: 1px solid #cbd5e1;
  box-shadow: 0 6px 14px rgba(15, 23, 42, 0.08);

  &:hover {
    color: #0f172a;
    background: #f8fafc;
    border-color: #94a3b8;
    box-shadow: 0 10px 18px rgba(15, 23, 42, 0.1);
  }

  &:active {
    box-shadow: 0 6px 12px rgba(15, 23, 42, 0.08);
  }

  &:disabled {
    background: white;
    color: #94a3b8;
    border-color: #e2e8f0;
  }
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

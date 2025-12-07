import styled from "styled-components";
import { SpinnerContainer } from "../spinner/spinner.styles";

export const BaseButton = styled.button`
  min-width: 180px;
  width: auto;
  height: 56px;
  letter-spacing: 0.05em;
  padding: 0 2.5rem;
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  /* Primary gradient background */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
    
    &::before {
      opacity: 1;
    }
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
  }
  
  &:disabled {
    background: #E5E7EB;
    color: #9CA3AF;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
    
    &::before {
      display: none;
    }
  }

  /* Ensure text is above the gradient overlay */
  span {
    position: relative;
    z-index: 1;
  }
`;

export const GoogleSignInButton = styled(BaseButton)`
  background: linear-gradient(135deg, #4285f4 0%, #357ae8 100%);
  box-shadow: 0 4px 15px rgba(66, 133, 244, 0.3);

  &::before {
    background: linear-gradient(135deg, #357ae8 0%, #2a63c8 100%);
  }

  &:hover {
    box-shadow: 0 8px 25px rgba(66, 133, 244, 0.4);
  }
  
  &:active {
    box-shadow: 0 4px 15px rgba(66, 133, 244, 0.3);
  }
`;

export const InvertedButton = styled(BaseButton)`
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  &::before {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  &:hover {
    color: white;
    border-color: transparent;
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
    
    &::before {
      opacity: 1;
    }
  }
  
  &:active {
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.2);
  }
  
  &:disabled {
    background: white;
    color: #9CA3AF;
    border-color: #E5E7EB;
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

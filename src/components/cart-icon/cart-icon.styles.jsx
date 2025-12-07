import styled, { keyframes } from "styled-components";
import { ReactComponent as ShoppingSvg } from "../../assets/shopping-bag.svg";

const wiggle = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
`;

const pop = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

export const CartIconContainer = styled.div`
  width: 52px;
  height: 52px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  border-radius: 0.75rem;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  &:hover {
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
    
    svg {
      animation: ${wiggle} 0.5s ease;
    }
  }
  
  &:active {
    transform: translateY(0) scale(0.95);
  }
`;

export const ShoppingIcon = styled(ShoppingSvg)`
  width: 28px;
  height: 28px;
  
  path {
    fill: #6366F1;
  }
`;

export const ItemCount = styled.span`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 0.35rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.625rem;
  animation: ${pop} 0.3s ease;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
`;

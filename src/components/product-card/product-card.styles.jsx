import styled from "styled-components";

export const ProductCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 420px;
  align-items: center;
  position: relative;
  border-radius: 1.25rem;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* Gradient border effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 1.25rem;
    padding: 2px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.9);
    width: 80%;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    z-index: 3;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(99, 102, 241, 0.2);

    &::before {
      opacity: 1;
    }

    button {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
      pointer-events: all;
    }
  }

  &:active {
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    height: 380px;
  }
`;

export const CardImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 320px;
  overflow: hidden;
  border-radius: 1.25rem 1.25rem 0 0;

  img, svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  ${ProductCardContainer}:hover & {
    img, svg {
      transform: scale(1.05);
      filter: brightness(0.85);
    }
  }

  @media (max-width: 768px) {
    height: 280px;
  }
`;

export const QuickViewButton = styled.button`
  position: absolute !important;
  bottom: 1rem !important;
  left: 50% !important;
  transform: translateX(-50%) translateY(10px) !important;
  width: auto !important;
  padding: 0.75rem 1.5rem;
  border-radius: 3rem;
  border: none;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  color: #6366F1;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  z-index: 10;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

  ${ProductCardContainer}:hover & {
    opacity: 1 !important;
    transform: translateX(-50%) translateY(0) !important;
    pointer-events: all !important;
  }

  &:hover {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    transform: translateX(-50%) translateY(0) scale(1.05) !important;
  }
`;

export const Footer = styled.div`
  width: 100%;
  padding: 1rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-radius: 0 0 1.25rem 1.25rem;
`;

export const Name = styled.span`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  color: #111827;
  margin-bottom: 0;
  flex: 1;
  margin-right: 1rem;
  line-height: 1.4;
`;

export const Price = styled.span`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  color: #6366F1;
  white-space: nowrap;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  border-radius: 0.75rem;
`;

export const AdminActionBar = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 0.5rem;
  z-index: 10;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

  ${ProductCardContainer}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AdminButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: ${({ variant }) => {
    if (variant === 'delete') return 'linear-gradient(135deg, #f093fb, #f5576c)';
    if (variant === 'edit') return 'linear-gradient(135deg, #667eea, #764ba2)';
    return 'linear-gradient(135deg, #4facfe, #00f2fe)';
  }};
  color: white;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px ${({ variant }) => {
    if (variant === 'delete') return 'rgba(245, 87, 108, 0.4)';
    if (variant === 'edit') return 'rgba(102, 126, 234, 0.4)';
    return 'rgba(79, 172, 254, 0.4)';
  }};
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: scale(1.15) ${({ variant }) => variant === 'delete' ? 'rotate(90deg)' : 'translateY(-2px)'};
    box-shadow: 0 6px 20px ${({ variant }) => {
      if (variant === 'delete') return 'rgba(245, 87, 108, 0.6)';
      if (variant === 'edit') return 'rgba(102, 126, 234, 0.6)';
      return 'rgba(79, 172, 254, 0.6)';
    }};
  }

  &:active {
    transform: scale(0.95);
  }

  &::before {
    content: attr(data-tooltip);
    position: absolute;
    bottom: -35px;
    left: 50%;
    transform: translateX(-50%) scale(0);
    background: rgba(15, 23, 42, 0.95);
    color: white;
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
    font-size: 0.75rem;
    font-family: 'Inter', sans-serif;
    white-space: nowrap;
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  &:hover::before {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
`;


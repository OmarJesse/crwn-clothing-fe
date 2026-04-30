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
    transform: translateY(50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const QuickViewOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: ${fadeIn} 0.3s ease;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const QuickViewModal = styled.div`
  position: relative;
  background: rgba(15, 23, 42, 0.98);
  border-radius: 2rem;
  border: 1px solid rgba(102, 126, 234, 0.3);
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.5);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1000px;
  width: 100%;
  padding: 2.5rem;
  animation: ${slideUp} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    max-height: 90vh;
    overflow-y: auto;
    padding: 2rem;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: rgba(245, 87, 108, 0.8);
    transform: rotate(90deg);
  }
`;

export const ProductBadge = styled.div`
  position: absolute;
  top: 2.5rem;
  left: 2.5rem;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  z-index: 10;
  background: ${({ type }) => 
    type === 'new' 
      ? 'linear-gradient(135deg, #667eea, #764ba2)' 
      : 'linear-gradient(135deg, #f093fb, #f5576c)'};
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

  @media (max-width: 968px) {
    top: 2rem;
    left: 2rem;
  }
`;

export const ProductImageSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 1.5rem;
  transition: transform 0.5s ease;
  transform: ${({ isZoomed }) => isZoomed ? 'scale(1.5)' : 'scale(1)'};
  transform-origin: center;

  @media (max-width: 968px) {
    height: 350px;
  }
`;

export const ZoomButton = styled.button`
  position: absolute;
  bottom: 5rem;
  right: 1rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.8);
    transform: scale(1.1);
  }

  @media (max-width: 968px) {
    bottom: 4rem;
  }
`;

export const ImageThumbnails = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.75rem;
  cursor: pointer;
  border: 2px solid ${({ isSelected }) => 
    isSelected ? 'rgba(102, 126, 234, 0.8)' : 'rgba(255, 255, 255, 0.1)'};
  opacity: ${({ isSelected }) => isSelected ? '1' : '0.6'};
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
    border-color: rgba(102, 126, 234, 0.6);
  }
`;

export const ProductDetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem 0;
`;

export const ProductName = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 968px) {
    font-size: 1.75rem;
  }
`;

export const ProductPrice = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const ProductDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
`;

export const RecommendationPanel = styled.div`
  border: 1px solid rgba(16, 185, 129, 0.25);
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(59, 130, 246, 0.12));
  border-radius: 1rem;
  padding: 1rem;
  display: grid;
  gap: 0.7rem;
`;

export const RecommendationTitle = styled.h4`
  margin: 0;
  color: #d1fae5;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
`;

export const RecommendationStats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const RecommendationChip = styled.span`
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.16);
  color: #e5e7eb;
`;

export const FitHint = styled.span`
  color: #d1d5db;
  font-size: 0.82rem;
`;

export const SizeSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  label {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    color: white;
  }

  > div {
    display: flex;
    gap: 0.75rem;
  }
`;

export const SizeOption = styled.button`
  min-width: 48px;
  height: 48px;
  padding: 0 0.7rem;
  border-radius: 0.75rem;
  border: 2px solid ${({ isSelected }) => 
    isSelected ? 'rgba(102, 126, 234, 0.8)' : 'rgba(255, 255, 255, 0.2)'};
  background: ${({ isSelected }) => 
    isSelected ? 'rgba(102, 126, 234, 0.2)' : 'transparent'};
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(102, 126, 234, 0.8);
    background: rgba(102, 126, 234, 0.2);
    transform: scale(1.1);
  }
`;

export const QuantitySelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  label {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    color: white;
  }

  > div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

export const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(102, 126, 234, 0.8);
    background: rgba(102, 126, 234, 0.2);
    transform: scale(1.1);
  }
`;

export const QuantityDisplay = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  min-width: 40px;
  text-align: center;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export const AddToCartButton = styled.button`
  flex: 1;
  padding: 1rem 2rem;
  border-radius: 3rem;
  border: none;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 48px rgba(102, 126, 234, 0.6);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const WishlistButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(240, 147, 251, 0.8);
    background: rgba(240, 147, 251, 0.2);
    transform: scale(1.1);
  }
`;

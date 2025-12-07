import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

export const FilterPanelOverlay = styled.div`
  position: fixed;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 999;

  @media (max-width: 968px) {
    top: 75px;
  }
`;

export const FilterPanel = styled.div`
  position: fixed;
  top: 90px;
  left: 0;
  bottom: 0;
  width: 350px;
  background: rgba(15, 23, 42, 0.98);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(102, 126, 234, 0.3);
  box-shadow: 10px 0 40px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  padding: 2rem;
  overflow-y: auto;
  animation: ${slideIn} 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 10px;
  }

  @media (max-width: 968px) {
    top: 75px;
    width: 300px;
    padding: 1.5rem;
  }
`;

export const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const FilterTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  margin: 0;
`;

export const CloseButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(245, 87, 108, 0.8);
    transform: rotate(90deg);
  }
`;

export const FilterSection = styled.div`
  margin-bottom: 2rem;
`;

export const FilterLabel = styled.label`
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
`;

export const PriceRange = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  span {
    color: rgba(255, 255, 255, 0.5);
    font-family: 'Inter', sans-serif;
    font-weight: 600;
  }
`;

export const PriceInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: rgba(102, 126, 234, 0.8);
    background: rgba(255, 255, 255, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

export const ColorOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
`;

export const ColorOption = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 3px solid ${({ isSelected }) => 
    isSelected ? 'white' : 'rgba(255, 255, 255, 0.2)'};
  background: ${({ color }) => color};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  ${({ color }) => color === '#FFFFFF' && `
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
  `}

  &:hover {
    transform: scale(1.1);
    border-color: white;
  }

  ${({ isSelected }) => isSelected && `
    &::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: ${({ color }) => color === '#FFFFFF' || color === '#F59E0B' ? '#000' : '#fff'};
      font-size: 1.25rem;
      font-weight: 700;
    }
  `}
`;

export const SizeOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

export const SizeOption = styled.button`
  padding: 0.75rem 1.25rem;
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
    transform: scale(1.05);
  }
`;

export const FilterActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export const ApplyButton = styled.button`
  flex: 1;
  padding: 1rem;
  border-radius: 3rem;
  border: none;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.6);
  }
`;

export const ResetButton = styled.button`
  padding: 1rem 1.5rem;
  border-radius: 3rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(245, 87, 108, 0.8);
    background: rgba(245, 87, 108, 0.2);
  }
`;

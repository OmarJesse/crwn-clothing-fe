import styled from 'styled-components';

export const BurgerMenuContainer = styled.div`
  width: 32px;
  height: 32px;
  display: none;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
  z-index: 2000;
  padding: 4px;
  
  @media (max-width: 968px) {
    display: flex;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

export const BurgerLine = styled.div`
  width: 100%;
  height: 3px;
  background: ${({ isOpen }) => isOpen 
    ? 'white' 
    : 'linear-gradient(90deg, #667eea, #764ba2)'};
  border-radius: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;

  ${({ isOpen, position }) => {
    if (isOpen && position === 'top') {
      return `
        transform: rotate(45deg) translateY(10px);
      `;
    }
    if (isOpen && position === 'middle') {
      return `
        opacity: 0;
        transform: translateX(-20px);
      `;
    }
    if (isOpen && position === 'bottom') {
      return `
        transform: rotate(-45deg) translateY(-10px);
      `;
    }
    return '';
  }}
`;

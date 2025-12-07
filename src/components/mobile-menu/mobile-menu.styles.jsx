import styled from 'styled-components';

export const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1500;
  opacity: ${({ isOpen }) => isOpen ? 1 : 0};
  visibility: ${({ isOpen }) => isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const MobileMenuContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 85%;
  max-width: 400px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  z-index: 1600;
  transform: translateX(${({ isOpen }) => isOpen ? '0' : '100%'});
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
`;

export const MobileMenuContent = styled.div`
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const MobileMenuHeader = styled.div`
  margin-bottom: 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  
  h2 {
    font-family: 'Poppins', sans-serif;
    font-size: 2rem;
    color: white;
    margin: 0;
    font-weight: 700;
  }
`;

export const MobileMenuLinks = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const MobileNavLink = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  padding: 1.25rem 1rem;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateX(8px);
    padding-left: 1.5rem;
  }
  
  &:active {
    transform: translateX(4px);
  }
`;

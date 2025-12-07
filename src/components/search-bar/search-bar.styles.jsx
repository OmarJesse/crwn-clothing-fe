import styled, { keyframes } from 'styled-components';

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const SearchOverlay = styled.div`
  position: fixed;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  z-index: 999;
  
  @media (max-width: 968px) {
    top: 75px;
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  z-index: 1000;

  @media (max-width: 968px) {
    max-width: 100%;
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: ${({ isOpen }) => 
    isOpen ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)'};
  backdrop-filter: blur(10px);
  border-radius: 3rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid ${({ isOpen }) => 
    isOpen ? 'rgba(102, 126, 234, 0.5)' : 'rgba(255, 255, 255, 0.2)'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ isOpen }) => 
    isOpen ? '0 10px 40px rgba(102, 126, 234, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.2)'};

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(102, 126, 234, 0.4);
  }

  @media (max-width: 968px) {
    padding: 0.6rem 1.25rem;
  }
`;

export const SearchIcon = styled.span`
  font-size: 1.25rem;
  margin-right: 0.75rem;
  filter: grayscale(0.3);
`;

export const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: white;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  font-weight: 500;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

export const ClearButton = styled.button`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: 0.5rem;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
  }
`;

export const SearchResults = styled.div`
  position: absolute;
  top: calc(100% + 0.75rem);
  left: 0;
  right: 0;
  background: rgba(15, 23, 42, 0.98);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  border: 1px solid rgba(102, 126, 234, 0.3);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  max-height: 400px;
  overflow-y: auto;
  animation: ${slideDown} 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 1001;

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

export const SearchResultItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(102, 126, 234, 0.15);
    padding-left: 1.75rem;
  }
`;

export const SearchResultImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 0.75rem;
  margin-right: 1rem;
`;

export const SearchResultInfo = styled.div`
  flex: 1;

  h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    margin: 0 0 0.25rem;
  }
`;

export const SearchResultPrice = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #f093fb;
`;

export const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;

  span {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-family: 'Poppins', sans-serif;
    font-size: 1.125rem;
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
  }
`;

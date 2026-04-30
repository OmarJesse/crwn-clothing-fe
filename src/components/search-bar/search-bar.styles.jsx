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
  inset: 0;
  background: rgba(15, 23, 42, 0.12);
  backdrop-filter: blur(8px);
  z-index: 999;
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: none;
  z-index: 1000;
  margin: 0 auto;

  @media (max-width: 968px) {
    max-width: 100%;
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: ${({ isOpen }) => 
    isOpen ? 'rgba(255, 255, 255, 1)' : 'rgba(248, 250, 252, 0.98)'};
  backdrop-filter: blur(12px);
  border-radius: 0.95rem;
  padding: 0.95rem 1.2rem;
  border: 2px solid ${({ isOpen }) => 
    isOpen ? 'rgba(99, 102, 241, 0.45)' : 'rgba(148, 163, 184, 0.28)'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ isOpen }) => 
    isOpen ? '0 10px 24px rgba(99, 102, 241, 0.14)' : '0 8px 18px rgba(15, 23, 42, 0.08)'};

  &:hover {
    background: rgba(255, 255, 255, 1);
    border-color: rgba(99, 102, 241, 0.35);
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
  color: #0f172a;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  font-weight: 500;

  &::placeholder {
    color: #64748b;
  }
`;

export const ClearButton = styled.button`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.08);
  border: none;
  border-radius: 50%;
  color: #334155;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: 0.5rem;

  &:hover {
    background: rgba(15, 23, 42, 0.14);
    transform: rotate(90deg);
  }
`;

export const SearchResults = styled.div`
  position: relative;
  width: 100%;
  margin-top: 0.75rem;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-radius: 1.25rem;
  border: 1px solid rgba(148, 163, 184, 0.24);
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.14);
  animation: ${slideDown} 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 1700;

  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(15, 23, 42, 0.06);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #64748b, #334155);
    border-radius: 10px;
  }
`;

export const SearchResultItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(148, 163, 184, 0.16);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(99, 102, 241, 0.08);
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
    color: #0f172a;
    margin: 0 0 0.25rem;
  }
`;

export const SearchResultPrice = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #4338ca;
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
    color: #475569;
    margin: 0;
  }
`;

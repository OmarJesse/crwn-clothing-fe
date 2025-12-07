import styled from 'styled-components';

export const SidebarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 90px;
  width: 280px;
  height: calc(100vh - 90px);
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98));
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem 0;
  overflow-y: auto;
  z-index: 100;
  transition: all 0.3s ease;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 3px;
  }

  @media (max-width: 968px) {
    top: 75px;
    height: calc(100vh - 75px);
    width: 260px;
  }

  @media (max-width: 768px) {
    transform: translateX(-100%);
    
    &.open {
      transform: translateX(0);
    }
  }
`;

export const CollapsedSidebar = styled.div`
  position: fixed;
  left: 0;
  top: 90px;
  width: 60px;
  height: calc(100vh - 90px);
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98));
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: flex-start;
  padding-top: 1rem;
  z-index: 100;

  @media (max-width: 968px) {
    top: 75px;
    height: calc(100vh - 75px);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ToggleButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: linear-gradient(135deg, #667eea, #764ba2);
    transform: scale(1.1);
  }

  ${CollapsedSidebar} & {
    position: static;
    margin: 0 auto;
  }
`;

export const SidebarHeader = styled.div`
  padding: 0 1.5rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1.5rem;
`;

export const SidebarTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
`;

export const SidebarSection = styled.div`
  margin-bottom: 2rem;
  padding: 0 1.5rem;
`;

export const SectionTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 1rem;
`;

export const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
    border-color: rgba(102, 126, 234, 0.4);
    transform: translateX(5px);
  }
`;

export const CategoryIcon = styled.span`
  font-size: 1.5rem;
  line-height: 1;
`;

export const CategoryName = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: white;
  flex: 1;
  text-transform: capitalize;
`;

export const CategoryCount = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.5);
  padding: 0.25rem 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
`;

export const QuickLink = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;

  span {
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.8);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);

    span {
      color: white;
    }
  }
`;

export const QuickLinkIcon = styled.span`
  font-size: 1.25rem;
  line-height: 1;
`;

import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const CategoryPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
  padding: 3rem 2rem;
  background: rgba(15, 23, 42, 0.4);
  border-radius: 2rem;
  border: 1px solid rgba(102, 126, 234, 0.1);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(40px);
  animation: ${({ isVisible }) => isVisible ? fadeInUp : 'none'} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;

  &:hover {
    background: rgba(15, 23, 42, 0.6);
    border-color: rgba(102, 126, 234, 0.3);
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    margin-bottom: 3rem;
  }
`;

export const CategoryPreviewTitle = styled(Link)`
  font-family: 'Poppins', sans-serif;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 2.5rem;
  cursor: pointer;
  display: inline-block;
  position: relative;
  color: white;
  transition: all 0.3s ease;
  width: fit-content;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &::after {
    content: '';
    position: absolute;
    bottom: -0.75rem;
    left: 0;
    width: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #f093fb);
    border-radius: 2px;
    transition: width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  &::before {
    content: '→';
    margin-left: 1rem;
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
    display: inline-block;
  }

  &:hover {
    color: #f093fb;
    
    &::after {
      width: 100%;
    }

    &::before {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

export const Preview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;


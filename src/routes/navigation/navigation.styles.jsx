import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavigationContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 90px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  padding: 0 4rem;
  gap: 2rem;
  
  /* Dark glassmorphism */
  background: rgba(17, 24, 39, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #667eea, #764ba2, #f093fb, transparent);
    animation: shimmer 3s linear infinite;
  }

  @keyframes shimmer {
    0% { opacity: 0.3; }
    50% { opacity: 1; }
    100% { opacity: 0.3; }
  }

  @media (max-width: 968px) {
    grid-template-columns: auto 1fr auto;
    padding: 0 2rem;
    height: 75px;
  }

  @media (max-width: 600px) {
    padding: 0 1.5rem;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const CenterSection = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;

  @media (max-width: 968px) {
    max-width: 100%;
  }
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.5rem;
`;

export const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    transform: rotate(-5deg) scale(1.1);
  }

  svg {
    width: 55px;
    height: 55px;
    filter: drop-shadow(0 0 20px rgba(102, 126, 234, 0.6));
    
    path {
      fill: url(#logo-gradient);
    }
  }

  /* Add gradient to SVG */
  svg defs {
    display: block;
  }

  @media (max-width: 968px) {
    svg {
      width: 45px;
      height: 45px;
    }
  }
`;

export const BrandName = styled(Link)`
  font-family: 'Poppins', sans-serif;
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  background: linear-gradient(135deg, #667eea 0%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s ease;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }

  &:hover {
    letter-spacing: 0.15em;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 968px) {
    gap: 1rem;
  }
`;

export const NavLink = styled(Link)`
  position: relative;
  padding: 0.75rem 0;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  color: white;
  text-transform: capitalize;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;

  /* Animated underline */
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #667eea, #f093fb);
    border-radius: 2px;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  &:hover {
    color: #f093fb;
    
    &::before {
      transform: translateX(-50%) scaleX(1);
    }
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 968px) {
    font-size: 0.9rem;
  }
`;



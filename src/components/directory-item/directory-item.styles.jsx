import styled from "styled-components";
const shouldForwardProp = (prop) => prop !== "imageUrl";

export const BackgroundImage = styled.div.withConfig({
  shouldForwardProp,
})`
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  transition: transform 0.8s cubic-bezier(0.25, 0.45, 0.45, 0.95);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.6), rgba(30, 41, 59, 0.4));
    opacity: 1;
    transition: opacity 0.4s ease;
  }
`;

export const Body = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  text-align: left;
  z-index: 2;
  
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

  h2 {
    font-family: 'Poppins', sans-serif;
    font-weight: 800;
    font-size: clamp(2rem, 3vw, 3.5rem);
    margin: 0 0 0.5rem;
    color: white;
    letter-spacing: 0.02em;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    transform: translateY(0);
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  p {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    opacity: 0.9;
    transform: translateY(0);
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  &::after {
    content: '→';
    position: absolute;
    bottom: 2.5rem;
    right: 2rem;
    font-size: 2rem;
    color: white;
    opacity: 0;
    transform: translateX(-20px);
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
`;

export const DirectoryItemContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 1.5rem;
  cursor: pointer;
  
  /* Dark overlay with gradient border */
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.3),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  
  /* Animated gradient border */
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
    border-radius: 1.5rem;
    opacity: 0;
    z-index: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    & ${BackgroundImage} {
      transform: scale(1.1);
      
      &::before {
        opacity: 0.3;
      }
    }
    
    & ${Body} {
      padding-bottom: 3rem;
      
      h2 {
        transform: translateY(-8px);
      }
      
      p {
        opacity: 1;
        transform: translateY(-4px);
      }

      &::after {
        opacity: 1;
        transform: translateX(0);
      }
    }

    &::before {
      opacity: 1;
    }
  }

  &:active ${Body} {
    padding-bottom: 2.75rem;
  }

  @media (max-width: 768px) {
    & ${Body} {
      padding: 2rem 1.5rem;
      
      h2 {
        font-size: 2rem;
      }
      
      &::after {
        bottom: 2rem;
        right: 1.5rem;
      }
    }
  }
`;



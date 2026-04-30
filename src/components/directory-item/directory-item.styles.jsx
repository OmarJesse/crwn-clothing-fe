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
    background: linear-gradient(165deg, rgba(15, 23, 42, 0.35), rgba(15, 23, 42, 0.08));
    opacity: 1;
    transition: opacity 0.4s ease;
  }
`;

export const Body = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.6rem 1.3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  text-align: left;
  z-index: 2;
  
  background: linear-gradient(to top, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.02));
  
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

  h2 {
    font-family: 'Poppins', sans-serif;
    font-weight: 800;
    font-size: clamp(1.55rem, 3vw, 2.6rem);
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
    font-size: 0.76rem;
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
  border-radius: 1.1rem;
  cursor: pointer;

  border: 1px solid rgba(148, 163, 184, 0.24);
  box-shadow: 0 12px 22px rgba(15, 23, 42, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.55), rgba(14, 165, 233, 0.45));
    border-radius: 1.1rem;
    opacity: 0;
    z-index: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    & ${BackgroundImage} {
      transform: scale(1.06);
      
      &::before {
        opacity: 0.3;
      }
    }
    
    & ${Body} {
      padding-bottom: 2.2rem;
      
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
    padding-bottom: 2.05rem;
  }

  @media (max-width: 768px) {
    & ${Body} {
      padding: 1.35rem 1.1rem;
      
      h2 {
        font-size: 1.6rem;
      }
      
      &::after {
        bottom: 1.25rem;
        right: 1rem;
      }
    }
  }
`;



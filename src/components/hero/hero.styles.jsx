import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(5deg);
  }
  66% {
    transform: translateY(10px) rotate(-5deg);
  }
`;

const gradientShift = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`;

export const HeroContainer = styled.div`
  position: relative;
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-top: 90px;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  background-size: 200% 200%;
  animation: ${gradientShift} 15s ease infinite;

  @media (max-width: 968px) {
    margin-top: 75px;
    min-height: 75vh;
  }
`;

export const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(240, 147, 251, 0.1) 0%, transparent 50%);
  pointer-events: none;
`;

export const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.3;
  pointer-events: none;
`;

export const FloatingShape = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(139, 92, 246, 0.1));
  filter: blur(80px);
  animation: ${float} 8s ease-in-out infinite;
  pointer-events: none;
  
  ${({ position }) => {
    switch (position) {
      case 'top-left':
        return `top: -150px; left: -150px; animation-delay: 0s;`;
      case 'top-right':
        return `top: -100px; right: -100px; animation-delay: 2s;`;
      case 'bottom-left':
        return `bottom: -150px; left: 10%; animation-delay: 4s;`;
      case 'bottom-right':
        return `bottom: -100px; right: 10%; animation-delay: 6s;`;
      default:
        return '';
    }
  }}

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1200px;
  padding: 4rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

export const HeroTitle = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 800;
  line-height: 1.1;
  color: white;
  margin: 0;
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
  
  .gradient-text {
    background: linear-gradient(135deg, #667eea 0%, #f093fb 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
    animation: ${gradientShift} 8s ease infinite;
    background-size: 200% 200%;
  }
`;

export const HeroSubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  font-weight: 400;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  max-width: 700px;
  margin: 0;
`;

export const HeroButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
    max-width: 400px;
  }
`;

export const HeroButton = styled.button`
  padding: 1.25rem 3rem;
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 3rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 15px 60px rgba(102, 126, 234, 0.6);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-2px) scale(1.02);
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const HeroSecondaryButton = styled(HeroButton)`
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: none;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 10px 40px rgba(255, 255, 255, 0.2);
  }
`;

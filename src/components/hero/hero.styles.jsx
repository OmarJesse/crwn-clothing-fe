import styled, { keyframes } from "styled-components";
import {
  surface,
  elevated,
  textPrimary,
  textSecondary,
  textInverse,
  borderSubtle,
  borderBase,
  primary,
  secondary,
  primaryDark,
  primaryGradient,
  alpha,
} from "../../styles/style-helpers";

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(5deg); }
  66% { transform: translateY(10px) rotate(-5deg); }
`;

const gradientShift = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
`;

export const HeroContainer = styled.div`
  position: relative;
  min-height: 84vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 2rem;
  border: 1px solid ${({ theme }) => borderSubtle(theme)};
  background:
    radial-gradient(circle at 20% 30%, ${({ theme }) => primary(theme)}1f 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, ${({ theme }) => secondary(theme)}1a 0%, transparent 50%),
    ${({ theme }) => surface(theme)};
  background-size: 200% 200%;
  animation: ${gradientShift} 15s ease infinite;
  box-shadow: 0 18px 40px ${({ theme }) => alpha("#0f172a", 0.1)};

  @media (max-width: 968px) {
    min-height: 78vh;
  }
`;

export const HeroBackground = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 30%, ${({ theme }) => primary(theme)}1a 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, ${({ theme }) => secondary(theme)}14 0%, transparent 50%);
  pointer-events: none;
`;

export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(${({ theme }) => textSecondary(theme)}14 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.35;
`;

export const FloatingShape = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${({ theme }) => primary(theme)}1a, ${({ theme }) => secondary(theme)}1a);
  filter: blur(80px);
  animation: ${float} 8s ease-in-out infinite;
  pointer-events: none;

  ${({ position }) => {
    switch (position) {
      case "top-left":
        return "top: -150px; left: -150px; animation-delay: 0s;";
      case "top-right":
        return "top: -100px; right: -100px; animation-delay: 2s;";
      case "bottom-left":
        return "bottom: -150px; left: 10%; animation-delay: 4s;";
      case "bottom-right":
        return "bottom: -100px; right: 10%; animation-delay: 6s;";
      default:
        return "";
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
  padding: clamp(3rem, 7vw, 6rem) 2rem;
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
  color: ${({ theme }) => textPrimary(theme)};
  margin: 0;

  .gradient-text {
    background: ${({ theme }) => primaryGradient(theme)};
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
  font-size: clamp(1.05rem, 2vw, 1.3rem);
  font-weight: 400;
  line-height: 1.6;
  color: ${({ theme }) => textSecondary(theme)};
  max-width: 700px;
  margin: 0;
`;

export const HeroButtons = styled.div`
  display: flex;
  gap: 1.25rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
    max-width: 400px;
  }
`;

export const HeroButton = styled.button`
  padding: 1.05rem 2.25rem;
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => textInverse(theme)};
  background: ${({ theme }) => primaryGradient(theme)};
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
  box-shadow: ${({ theme }) => theme?.shadows?.colored || "0 14px 30px rgba(99,102,241,0.3)"};
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: ${({ theme }) => theme?.shadows?.coloredHover || "0 18px 36px rgba(99,102,241,0.4)"};
  }

  &:active {
    transform: translateY(-1px) scale(1.01);
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const HeroSecondaryButton = styled(HeroButton)`
  background: ${({ theme }) => surface(theme)};
  color: ${({ theme }) => textPrimary(theme)};
  border: 1px solid ${({ theme }) => borderBase(theme)};
  box-shadow: none;
  backdrop-filter: blur(6px);

  &:hover {
    background: ${({ theme }) => elevated(theme)};
    border-color: ${({ theme }) => primary(theme)}80;
    box-shadow: 0 10px 22px ${({ theme }) => alpha("#0f172a", 0.12)};
  }
`;

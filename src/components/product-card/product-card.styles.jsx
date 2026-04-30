import styled from "styled-components";
import {
  surface,
  elevated,
  textPrimary,
  textSecondary,
  borderSubtle,
  borderBase,
  primary,
  primaryDark,
  textInverse,
  alpha,
} from "../../styles/style-helpers";

export const ProductCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 430px;
  height: auto;
  align-items: center;
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  background: ${({ theme }) => surface(theme)};
  color: ${({ theme }) => textPrimary(theme)};
  border: 1px solid ${({ theme }) => borderSubtle(theme)};
  box-shadow: 0 10px 20px ${({ theme }) => alpha("#0f172a", 0.08)};
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease, border-color 0.4s ease;

  .add-to-cart-button {
    position: static;
    width: calc(100% - 2rem);
    margin: 0 1rem 1rem;
    transform: none;
    opacity: 1;
    pointer-events: all;
    z-index: 2;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => primary(theme)}55;
    box-shadow: 0 18px 30px ${({ theme }) => alpha("#0f172a", 0.16)};
  }

  @media (max-width: 768px) {
    min-height: 380px;
  }
`;

export const CardImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 320px;
  overflow: hidden;
  border-radius: 1rem 1rem 0 0;
  background: ${({ theme }) => elevated(theme)};

  img, svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  ${ProductCardContainer}:hover & {
    img, svg {
      transform: scale(1.05);
      filter: brightness(0.92);
    }
  }

  @media (max-width: 768px) {
    height: 280px;
  }
`;

export const SizeBadge = styled.span`
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.45rem 0.75rem;
  border-radius: 999px;
  background: ${({ theme }) => surface(theme)};
  color: ${({ theme }) => textPrimary(theme)};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  z-index: 4;
  border: 1px solid ${({ theme }) => borderBase(theme)};
  box-shadow: 0 8px 18px ${({ theme }) => alpha("#0f172a", 0.18)};
`;

export const RecommendationMeta = styled.div`
  position: absolute;
  left: 1rem;
  right: 1rem;
  bottom: 0.9rem;
  display: flex;
  gap: 0.45rem;
  align-items: center;
  flex-wrap: wrap;
  z-index: 4;
`;

export const RecommendationChip = styled.span`
  padding: 0.32rem 0.55rem;
  border-radius: 999px;
  font-size: 0.68rem;
  line-height: 1;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: ${({ theme, tone }) =>
    tone === "accent"
      ? primaryDark(theme)
      : tone === "info"
      ? theme?.colors?.semantic?.info || "#0369a1"
      : textSecondary(theme)};
  background: ${({ theme, tone }) =>
    tone === "accent"
      ? `${primary(theme)}1f`
      : tone === "info"
      ? `${theme?.colors?.semantic?.info || "#0369a1"}1f`
      : `${surface(theme)}e6`};
  border: 1px solid ${({ theme }) => borderSubtle(theme)};
  backdrop-filter: blur(8px);
`;

export const QuickViewButton = styled.button`
  position: absolute !important;
  bottom: 1rem !important;
  left: 50% !important;
  transform: translateX(-50%) translateY(10px) !important;
  width: auto !important;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  border: none;
  background: ${({ theme }) => primaryDark(theme)};
  color: ${({ theme }) => textInverse(theme)};
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  z-index: 10;
  box-shadow: 0 10px 20px ${({ theme }) => alpha("#0f172a", 0.24)};

  ${ProductCardContainer}:hover & {
    opacity: 1 !important;
    transform: translateX(-50%) translateY(0) !important;
    pointer-events: all !important;
  }

  &:hover {
    background: ${({ theme }) => primary(theme)};
    transform: translateX(-50%) translateY(0) scale(1.05) !important;
  }
`;

export const Footer = styled.div`
  width: 100%;
  padding: 1rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => surface(theme)};
  border-radius: 0 0 1rem 1rem;
`;

export const Name = styled.span`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  color: ${({ theme }) => textPrimary(theme)};
  margin-bottom: 0;
  flex: 1;
  margin-right: 1rem;
  line-height: 1.4;
`;

export const Price = styled.span`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  color: ${({ theme }) => textPrimary(theme)};
  white-space: nowrap;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => elevated(theme)};
  border-radius: 0.65rem;
  border: 1px solid ${({ theme }) => borderSubtle(theme)};
`;

export const AdminActionBar = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 0.5rem;
  z-index: 10;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

  ${ProductCardContainer}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AdminButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  border: none;
  background: ${({ theme, variant }) => {
    if (variant === "delete") return `${theme?.colors?.semantic?.error || "#EF4444"}26`;
    if (variant === "edit") return `${primary(theme)}26`;
    return elevated(theme);
  }};
  color: ${({ theme, variant }) => {
    if (variant === "delete") return theme?.colors?.semantic?.error || "#EF4444";
    if (variant === "edit") return primaryDark(theme);
    return textSecondary(theme);
  }};
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 14px ${({ theme }) => alpha("#0f172a", 0.14)};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;

  &:hover {
    transform: scale(1.15)
      ${({ variant }) => (variant === "delete" ? "rotate(90deg)" : "translateY(-2px)")};
    box-shadow: 0 12px 20px ${({ theme }) => alpha("#0f172a", 0.2)};
  }

  &::before {
    content: attr(data-tooltip);
    position: absolute;
    bottom: -35px;
    left: 50%;
    transform: translateX(-50%) scale(0);
    background: ${({ theme }) => textPrimary(theme)};
    color: ${({ theme }) => textInverse(theme)};
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
    font-size: 0.75rem;
    font-family: 'Inter', sans-serif;
    white-space: nowrap;
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;
    box-shadow: 0 4px 12px ${({ theme }) => alpha("#0f172a", 0.3)};
  }

  &:hover::before {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
`;

import styled, { css } from "styled-components";
import {
  surface,
  elevated,
  textPrimary,
  textSecondary,
  borderSubtle,
  borderBase,
  errorColor,
  primary,
  alpha,
} from "../../styles/style-helpers";

const sharedStyle = css`
  width: 23%;
`;

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 92px 1.5fr 1fr 1fr 1fr 50px;
  gap: 1rem;
  align-items: center;
  min-height: 92px;
  padding: 1rem 0;
  font-size: 1rem;
  color: ${({ theme }) => textPrimary(theme)};
  border-bottom: 1px solid ${({ theme }) => borderSubtle(theme)};
  transition: background 0.3s ease, padding 0.3s ease;

  &:hover {
    background: ${({ theme }) => elevated(theme)};
    border-radius: 0.75rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  @media (max-width: 900px) {
    grid-template-columns: 92px 1fr;
    gap: 0.8rem 1rem;
    align-items: start;
  }
`;

export const ImageContainer = styled.div`
  width: 92px;

  img {
    width: 100%;
    height: 92px;
    border-radius: 0.75rem;
    object-fit: cover;
    box-shadow: 0 4px 12px ${({ theme }) => alpha("#0f172a", 0.1)};
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

export const Name = styled.span`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  color: ${({ theme }) => textPrimary(theme)};

  @media (max-width: 900px) {
    grid-column: 2 / 3;
  }
`;

export const Size = styled.span`
  font-weight: 700;
  color: ${({ theme }) => textSecondary(theme)};
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: ${({ theme }) => elevated(theme)};
  border: 1px solid ${({ theme }) => borderSubtle(theme)};

  @media (max-width: 900px) {
    grid-column: 2 / 3;
  }
`;

export const Quentity = styled.span`
  display: flex;
  align-items: center;
  font-weight: 500;
  color: ${({ theme }) => textSecondary(theme)};

  @media (max-width: 900px) {
    grid-column: 2 / 3;
    justify-content: flex-start;
  }
`;

export const Price = styled.span`
  font-weight: 600;
  color: ${({ theme }) => textPrimary(theme)};

  @media (max-width: 900px) {
    grid-column: 2 / 3;
  }
`;

export const Value = styled.span`
  margin: 0 1rem;
  font-weight: 600;
  color: ${({ theme }) => textPrimary(theme)};
`;

export const Arrow = styled.div`
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => elevated(theme)};
  border: 1px solid ${({ theme }) => borderSubtle(theme)};
  border-radius: 0.5rem;
  transition: background 0.2s ease, transform 0.2s ease;
  font-size: 1.1rem;
  color: ${({ theme }) => textSecondary(theme)};

  &:hover {
    background: ${({ theme }) => primary(theme)}14;
    border-color: ${({ theme }) => primary(theme)}40;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const RemoveButton = styled.div`
  padding-left: 0.5rem;
  cursor: pointer;
  color: ${({ theme }) => errorColor(theme)};
  font-weight: 600;
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 900px) {
    grid-column: 2 / 3;
    justify-self: end;
    padding-left: 0;
  }
`;

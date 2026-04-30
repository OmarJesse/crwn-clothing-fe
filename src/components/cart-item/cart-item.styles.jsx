import styled from "styled-components";
import {
  elevated,
  textPrimary,
  textSecondary,
  borderSubtle,
  primary,
} from "../../styles/style-helpers";

export const CartItemContainer = styled.div`
  width: 100%;
  display: flex;
  height: 100px;
  padding: 0.85rem;
  background: ${({ theme }) => elevated(theme)};
  color: ${({ theme }) => textPrimary(theme)};
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => borderSubtle(theme)};
  transition: border-color 0.3s ease, transform 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => primary(theme)}40;
    transform: translateX(-3px);
  }

  img {
    width: 30%;
    border-radius: 0.5rem;
    object-fit: cover;
  }
`;

export const ItemDetails = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0.5rem 0.85rem;
  gap: 0.4rem;
`;

export const Name = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ theme }) => textPrimary(theme)};
  margin: 0;
`;

export const PriceInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: ${({ theme }) => textSecondary(theme)};

  span {
    font-weight: 600;
    color: ${({ theme }) => textPrimary(theme)};
  }
`;

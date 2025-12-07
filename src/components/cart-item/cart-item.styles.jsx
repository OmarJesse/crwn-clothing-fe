import styled, { css } from "styled-components";

export const CartItemContainer = styled.div`
  width: 100%;
  display: flex;
  height: 100px;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(-4px);
    border-color: rgba(102, 126, 234, 0.3);
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
  padding: 0.5rem 1rem;
  gap: 0.5rem;
`;

export const Name = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin: 0;
`;

export const PriceInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  
  span {
    font-weight: 600;
    color: #f093fb;
  }
`;


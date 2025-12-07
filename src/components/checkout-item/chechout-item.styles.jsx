import styled, { css } from "styled-components";

const sharedStyle = css`
  width: 23%;
`;

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 120px;
  padding: 1.5rem 0;
  font-size: 1.125rem;
  align-items: center;
  border-bottom: 1px solid rgba(99, 102, 241, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(99, 102, 241, 0.02);
    border-radius: 0.75rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 1.5rem;

  img {
    width: 100%;
    height: 100%;
    border-radius: 0.75rem;
    object-fit: cover;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

export const Name = styled.span`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  color: #111827;
  ${sharedStyle}
`;

export const Quentity = styled.span`
  display: flex;
  align-items: center;
  ${sharedStyle}
  text-align: center;
  font-weight: 500;
  color: #374151;
`;

export const Price = styled.span`
  font-weight: 600;
  color: #6366F1;
  ${sharedStyle}
`;

export const Value = styled.span`
  margin: 0 1rem;
  font-weight: 600;
  color: #111827;
  ${sharedStyle}
`;

export const Arrow = styled.div`
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(99, 102, 241, 0.1);
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  font-size: 1.25rem;
  color: #6366F1;

  &:hover {
    background: rgba(99, 102, 241, 0.2);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const RemoveButton = styled.div`
  padding-left: 1rem;
  cursor: pointer;
  color: #EF4444;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    color: #DC2626;
    transform: scale(1.1);
  }
`;

import styled from "styled-components";
import {
  surface,
  textPrimary,
  borderSubtle,
  alpha,
} from "../../styles/style-helpers";

export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 480px;
  padding: 2.25rem;
  background: ${({ theme }) => surface(theme)};
  color: ${({ theme }) => textPrimary(theme)};
  border-radius: 1.75rem;
  border: 1px solid ${({ theme }) => borderSubtle(theme)};
  box-shadow: 0 16px 50px ${({ theme }) => alpha("#0f172a", 0.12)};

  h2 {
    font-family: 'Poppins', sans-serif;
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
    color: ${({ theme }) => textPrimary(theme)};
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

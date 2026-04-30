import styled from "styled-components";
import {
  surface,
  textPrimary,
  borderSubtle,
  primary,
  secondary,
  alpha,
} from "../../styles/style-helpers";

export const AuthenticationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 2rem;
  max-width: 1500px;
  width: min(94%, 1500px);
  margin: 0 auto 3rem;
  padding: clamp(1.25rem, 4vw, 2.5rem);
  background:
    radial-gradient(circle at top, ${({ theme }) => primary(theme)}1a, transparent 36%),
    radial-gradient(circle at bottom, ${({ theme }) => secondary(theme)}14, transparent 32%),
    ${({ theme }) => surface(theme)};
  color: ${({ theme }) => textPrimary(theme)};
  backdrop-filter: blur(20px);
  border-radius: 2rem;
  border: 1px solid ${({ theme }) => borderSubtle(theme)};
  box-shadow: 0 20px 40px ${({ theme }) => alpha("#0f172a", 0.1)};

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  @media (max-width: 768px) {
    width: 96%;
    padding: 1.25rem;
  }
`;

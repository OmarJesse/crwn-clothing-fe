import styled from "styled-components";
import {
  surface,
  elevated,
  textPrimary,
  textSecondary,
  textMuted,
  borderBase,
  borderSubtle,
  primary,
  primaryDark,
  primaryGradient,
  successColor,
  errorColor,
  alpha,
} from "../../styles/style-helpers";

export const AuthFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 480px;
  padding: clamp(1.25rem, 4vw, 2.5rem);
  background: ${({ theme }) => surface(theme)};
  color: ${({ theme }) => textPrimary(theme)};
  border-radius: 1.5rem;
  border: 1px solid ${({ theme }) => borderSubtle(theme)};
  box-shadow: 0 16px 50px ${({ theme }) => alpha("#0f172a", 0.1)};
`;

export const AuthFormHeader = styled.header`
  margin-bottom: 1.25rem;

  h2 {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    font-size: clamp(1.5rem, 3vw, 1.85rem);
    font-weight: 700;
    color: ${({ theme }) => textPrimary(theme)};
  }

  p {
    margin: 0.35rem 0 0;
    color: ${({ theme }) => textSecondary(theme)};
    font-size: 0.92rem;
  }
`;

export const AuthField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin: 0.85rem 0;
`;

export const AuthLabel = styled.label`
  font-size: 0.78rem;
  font-weight: 600;
  color: ${({ theme }) => textSecondary(theme)};
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const AuthInput = styled.input`
  appearance: none;
  width: 100%;
  padding: 0.85rem 1rem;
  min-height: 2.85rem;
  background: ${({ theme }) => elevated(theme)};
  color: ${({ theme }) => textPrimary(theme)};
  border: 1.5px solid ${({ theme }) => borderBase(theme)};
  border-radius: 0.75rem;
  font: inherit;
  font-size: 0.95rem;
  transition: border-color 150ms ease, box-shadow 150ms ease;

  &::placeholder {
    color: ${({ theme }) => textMuted(theme)};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => primary(theme)};
    box-shadow: 0 0 0 4px ${({ theme }) => primary(theme)}1f;
  }

  &:invalid:not(:placeholder-shown) {
    border-color: ${({ theme }) => errorColor(theme)};
  }
`;

export const PasswordWrapper = styled.div`
  position: relative;

  ${AuthInput} {
    padding-right: 4.25rem;
  }
`;

export const PasswordToggle = styled.button`
  appearance: none;
  position: absolute;
  top: 50%;
  right: 0.6rem;
  transform: translateY(-50%);
  padding: 0.35rem 0.7rem;
  background: transparent;
  border: 0;
  color: ${({ theme }) => primaryDark(theme)};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 0.45rem;

  &:hover {
    background: ${({ theme }) => primary(theme)}14;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => primary(theme)};
    outline-offset: 2px;
  }
`;

export const AuthErrorNote = styled.div`
  margin: 0.4rem 0 0.85rem;
  padding: 0.7rem 0.95rem;
  border-radius: 0.75rem;
  background: ${({ theme }) => errorColor(theme)}1a;
  border: 1px solid ${({ theme }) => errorColor(theme)}40;
  color: ${({ theme }) => errorColor(theme)};
  font-size: 0.88rem;
  line-height: 1.45;
`;

export const AuthSubmit = styled.button`
  appearance: none;
  margin-top: 0.5rem;
  width: 100%;
  min-height: 3rem;
  padding: 0.85rem 1.25rem;
  background: ${({ theme }) => primaryGradient(theme)};
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  border: 0;
  border-radius: 0.85rem;
  cursor: pointer;
  box-shadow: 0 14px 30px ${({ theme }) => primary(theme)}33;
  transition: transform 150ms ease, box-shadow 150ms ease, opacity 150ms ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 18px 36px ${({ theme }) => primary(theme)}40;
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

export const AuthHelperRow = styled.div`
  margin-top: 1rem;
  text-align: center;
  font-size: 0.88rem;
  color: ${({ theme }) => textSecondary(theme)};

  a {
    color: ${({ theme }) => primaryDark(theme)};
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const PasswordStrengthBar = styled.div`
  height: 0.35rem;
  background: ${({ theme }) => borderSubtle(theme)};
  border-radius: 999px;
  overflow: hidden;
  margin-top: 0.45rem;

  &::after {
    content: "";
    display: block;
    height: 100%;
    width: ${({ $strength }) => `${$strength * 25}%`};
    background: ${({ theme, $strength }) =>
      $strength >= 3
        ? successColor(theme)
        : $strength >= 2
        ? primary(theme)
        : errorColor(theme)};
    transition: width 200ms ease, background 200ms ease;
  }
`;

export const PasswordHint = styled.small`
  color: ${({ theme }) => textMuted(theme)};
  font-size: 0.78rem;
`;

// Back-compat alias so the old import path keeps working.
export const SignInContainer = AuthFormContainer;
export const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

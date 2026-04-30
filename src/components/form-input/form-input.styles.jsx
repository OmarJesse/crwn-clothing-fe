import styled, { css } from "styled-components";
import {
  surface,
  textPrimary,
  textMuted,
  borderBase,
  primary,
  alpha,
} from "../../styles/style-helpers";

const shrinkLabelStyles = css`
  top: -1.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => primary(theme)};
  letter-spacing: 0.05em;
`;

export const FormInputLabel = styled.label`
  color: ${({ theme }) => textMuted(theme)};
  font-size: 1rem;
  font-weight: 500;
  position: absolute;
  pointer-events: none;
  left: 1rem;
  top: 1rem;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  background: ${({ theme }) => surface(theme)};
  padding: 0 0.25rem;

  ${({ shrink }) => shrink && shrinkLabelStyles};
`;

export const Input = styled.input`
  background: ${({ theme }) => surface(theme)};
  color: ${({ theme }) => textPrimary(theme)};
  font-size: 1rem;
  font-weight: 500;
  padding: 1rem 1.25rem;
  display: block;
  width: 100%;
  border: 1.5px solid ${({ theme }) => borderBase(theme)};
  border-radius: 0.9rem;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  margin: 0;
  box-shadow: inset 0 1px 2px ${({ theme }) => alpha("#0f172a", 0.03)};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => primary(theme)};
    box-shadow: 0 0 0 4px ${({ theme }) => primary(theme)}26;
  }

  &:focus ~ ${FormInputLabel} {
    ${shrinkLabelStyles};
  }

  &::placeholder {
    color: transparent;
  }

  &:not(:placeholder-shown) ~ ${FormInputLabel} {
    ${shrinkLabelStyles};
  }
`;

export const Group = styled.div`
  position: relative;
  margin: 1.5rem 0;

  input[type="password"] {
    letter-spacing: 0.2em;
  }
`;

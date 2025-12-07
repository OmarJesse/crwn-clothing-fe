import styled, { css } from "styled-components";

const subColor = "#9CA3AF";
const mainColor = "#6366F1";
const errorColor = "#EF4444";

const shrinkLabelStyles = css`
  top: -1.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${mainColor};
  letter-spacing: 0.05em;
`;

export const FormInputLabel = styled.label`
  color: ${subColor};
  font-size: 1rem;
  font-weight: 500;
  position: absolute;
  pointer-events: none;
  left: 1rem;
  top: 1rem;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  background: white;
  padding: 0 0.25rem;

  ${({ shrink }) => shrink && shrinkLabelStyles};
`;

export const Input = styled.input`
  background: white;
  color: #111827;
  font-size: 1rem;
  font-weight: 500;
  padding: 1rem 1.25rem;
  display: block;
  width: 100%;
  border: 2px solid #E5E7EB;
  border-radius: 0.75rem;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  margin: 0;

  &:focus {
    outline: none;
    border-color: ${mainColor};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
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
  margin: 1.75rem 0;

  input[type="password"] {
    letter-spacing: 0.2em;
  }
`;

import styled from "styled-components";
import Button from "../button/button.component";

export const PaymentFormContainer = styled.div`
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem;
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  margin: 2rem auto;
  max-width: 600px;
`;

export const FormContainer = styled.form`
  width: 100%;
  min-width: 400px;
  padding: 1.5rem;
  background: rgba(99, 102, 241, 0.03);
  border-radius: 1rem;
  border: 1px solid rgba(99, 102, 241, 0.1);

  @media (max-width: 600px) {
    min-width: 300px;
  }
`;

export const PaymentButton = styled(Button)`
  margin-left: auto;
  margin-top: 2rem;
  min-width: 200px;
`;

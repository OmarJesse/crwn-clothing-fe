import styled from "styled-components";

export const ProductFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 2rem;
  max-width: 700px;
  margin: 0 auto;
  margin-bottom: 3rem;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 2rem;
  border: 1px solid rgba(102, 126, 234, 0.3);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);

  h2 {
    font-family: 'Poppins', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: white;
    margin-bottom: 2rem;
    text-align: center;
    background: linear-gradient(135deg, #667eea, #f093fb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 968px) {
    padding: 2rem 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  width: 100%;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const FormTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #667eea, #f093fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: 1rem 1.25rem;
  margin: 1rem 0;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;

  option {
    background: #0f172a;
    color: white;
  }

  &:focus {
    outline: none;
    border-color: rgba(102, 126, 234, 0.8);
    background: rgba(255, 255, 255, 0.15);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

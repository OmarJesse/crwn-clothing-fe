import styled from "styled-components";

export const CheckoutContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem auto;
  padding: 2.5rem;
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    width: 95%;
    padding: 1.5rem;
    margin: 1.5rem auto;
  }
`;

export const CheckoutHeader = styled.div`
  width: 100%;
  padding: 1.25rem 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid transparent;
  background: linear-gradient(white, white) padding-box,
              linear-gradient(90deg, #667eea, #764ba2) border-box;
  border-image: linear-gradient(90deg, #667eea, #764ba2) 1;
  margin-bottom: 2rem;
`;

export const HeaderBlock = styled.div`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #374151;
  width: 23%;
  
  &:last-child {
    width: 8%;
    text-align: center;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

export const Total = styled.div`
  margin-top: 2.5rem;
  margin-left: auto;
  padding: 1.5rem 2.5rem;
  font-family: 'Poppins', sans-serif;
  font-size: 2.25rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.15);

  @media (max-width: 768px) {
    font-size: 1.75rem;
    padding: 1rem 1.5rem;
  }
`;

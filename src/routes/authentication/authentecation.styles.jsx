import styled from "styled-components";

export const AuthenticationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 3rem;
  max-width: 1400px;
  width: 90%;
  margin: 0 auto;
  margin-top: 130px;
  margin-bottom: 3rem;
  padding: 3rem;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(20px);
  border-radius: 2rem;
  border: 1px solid rgba(102, 126, 234, 0.2);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    margin-top: 105px;
  }

  @media (max-width: 768px) {
    width: 95%;
    padding: 2rem 1.5rem;
    margin-top: 105px;
  }
`;

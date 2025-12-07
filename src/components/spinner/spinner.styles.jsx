import styled from "styled-components";

export const SpinnerOverlay = styled.div`
  height: 60vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SpinnerContainer = styled.div`
  display: inline-block;
  width: 60px;
  height: 60px;
  border: 4px solid rgba(99, 102, 241, 0.1);
  border-radius: 50%;
  border-top-color: #6366F1;
  border-right-color: #8B5CF6;
  animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.2);
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

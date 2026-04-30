import styled from "styled-components";

export const CategoriesContainer = styled.div`
  max-width: none;
  width: 100%;
  margin: 0 auto;
  padding: 2.25rem 0 3.5rem;
  
  /* Modern asymmetric masonry grid */
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 180px;
  gap: 1rem;
  
  /* Create varied sizes for items */
  & > *:nth-child(1) {
    grid-column: span 7;
    grid-row: span 3;
  }
  
  & > *:nth-child(2) {
    grid-column: span 5;
    grid-row: span 2;
  }
  
  & > *:nth-child(3) {
    grid-column: span 5;
    grid-row: span 2;
  }
  
  & > *:nth-child(4) {
    grid-column: span 6;
    grid-row: span 2;
  }
  
  & > *:nth-child(5) {
    grid-column: span 6;
    grid-row: span 2;
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: 170px;
    
    & > *:nth-child(1) {
      grid-column: span 6;
      grid-row: span 2;
    }
    
    & > *:nth-child(2) {
      grid-column: span 3;
      grid-row: span 2;
    }
    
    & > *:nth-child(3) {
      grid-column: span 3;
      grid-row: span 2;
    }
    
    & > *:nth-child(4) {
      grid-column: span 6;
      grid-row: span 2;
    }
    
    & > *:nth-child(5) {
      grid-column: span 6;
      grid-row: span 2;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-auto-rows: 230px;
    gap: 1.25rem;
    padding: 2rem 0.2rem 2.8rem;
    
    & > * {
      grid-column: span 1 !important;
      grid-row: span 1 !important;
    }
  }
`;


import styled from "styled-components";

export const CategoriesContainer = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 4rem 2rem 6rem;
  
  /* Modern asymmetric masonry grid */
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 200px;
  gap: 1.5rem;
  
  /* Create varied sizes for items */
  & > *:nth-child(1) {
    grid-column: span 8;
    grid-row: span 3;
  }
  
  & > *:nth-child(2) {
    grid-column: span 4;
    grid-row: span 2;
  }
  
  & > *:nth-child(3) {
    grid-column: span 4;
    grid-row: span 2;
  }
  
  & > *:nth-child(4) {
    grid-column: span 5;
    grid-row: span 3;
  }
  
  & > *:nth-child(5) {
    grid-column: span 7;
    grid-row: span 3;
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: 180px;
    
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
    grid-auto-rows: 250px;
    gap: 1.25rem;
    padding: 3rem 1.5rem;
    
    & > * {
      grid-column: span 1 !important;
      grid-row: span 1 !important;
    }
  }
`;


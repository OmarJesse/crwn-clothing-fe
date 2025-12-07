import styled from "styled-components";

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2.5rem;
  padding: 3rem 2rem;
  max-width: 1600px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 2rem;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 2rem 1rem;
  }
`;

export const CategoryTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 3rem;
  text-align: center;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  padding: 2rem 0;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 5px;
    background: linear-gradient(90deg, #667eea, #f093fb);
    border-radius: 3px;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
`;


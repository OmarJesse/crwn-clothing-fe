import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

export const SkeletonCard = styled.div`
  width: 100%;
  height: 420px;
  border-radius: 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    background-size: 1000px 100%;
    animation: ${shimmer} 2s infinite;
  }
`;

export const SkeletonImage = styled.div`
  width: 100%;
  height: 320px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 1.25rem 1.25rem 0 0;
`;

export const SkeletonText = styled.div`
  height: 20px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 0.5rem;
  margin: 1rem 1.25rem;
  width: ${({ width }) => width || '80%'};
`;

export const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

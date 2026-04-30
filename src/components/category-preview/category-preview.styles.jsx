import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const surface = (t) => t?.colors?.semantic?.background?.surface || "#ffffff";
const elevated = (t) => t?.colors?.semantic?.background?.elevated || "#ffffff";
const textPrimary = (t) => t?.colors?.semantic?.text?.primary || "#0f172a";
const textSecondary = (t) => t?.colors?.semantic?.text?.secondary || "#475569";
const borderSubtle = (t) => t?.colors?.semantic?.border?.subtle || "rgba(148,163,184,0.18)";
const primary = (t) => t?.colors?.primary?.main || "#6366F1";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const CategoryPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  padding: 1.5rem 1.2rem;
  background: ${({ theme }) => surface(theme)};
  color: ${({ theme }) => textPrimary(theme)};
  border-radius: 1.2rem;
  border: 1px solid ${({ theme }) => borderSubtle(theme)};
  position: relative;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;
  transform: translateY(40px);
  animation: ${({ isVisible }) => (isVisible ? fadeInUp : "none")} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;

  &:hover {
    border-color: ${({ theme }) => primary(theme)}40;
    transform: translateY(-2px);
    box-shadow: 0 18px 36px ${({ theme }) => textPrimary(theme)}14;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 1.2rem;
    pointer-events: none;
    background: radial-gradient(circle at top right, ${({ theme }) => primary(theme)}1a, transparent 35%);
    opacity: 0.85;
  }

  @media (max-width: 768px) {
    padding: 1.15rem;
    margin-bottom: 1.5rem;
  }
`;

export const CategoryPreviewTitle = styled(Link)`
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 2.5rem;
  cursor: pointer;
  display: inline-block;
  position: relative;
  color: ${({ theme }) => textPrimary(theme)};
  transition: all 0.3s ease;
  width: fit-content;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-decoration: none;

  &::after {
    content: '';
    position: absolute;
    bottom: -0.75rem;
    left: 0;
    width: 0;
    height: 4px;
    background: ${({ theme }) => theme?.colors?.primary?.gradientAlt || "linear-gradient(90deg,#6366F1,#8B5CF6)"};
    border-radius: 2px;
    transition: width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  &::before {
    content: '→';
    margin-left: 1rem;
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
    display: inline-block;
  }

  &:hover {
    color: ${({ theme }) => primary(theme)};

    &::after { width: 100%; }
    &::before { opacity: 1; transform: translateX(0); }
  }

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

export const Preview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;

  @media (max-width: 1200px) { grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); }
  @media (max-width: 900px) { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.5rem; }
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

export const CategoryMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  gap: 1rem;
  position: relative;
  z-index: 1;
  flex-wrap: wrap;
`;

export const CategoryCountPill = styled.span`
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  font-size: 0.78rem;
  letter-spacing: 0.02em;
  color: ${({ theme }) => textSecondary(theme)};
  background: ${({ theme }) => elevated(theme)};
  border: 1px solid ${({ theme }) => borderSubtle(theme)};
`;

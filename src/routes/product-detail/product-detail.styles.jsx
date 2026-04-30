import styled from "styled-components";

const surface = (t) => t?.colors?.semantic?.background?.surface || "#ffffff";
const elevated = (t) => t?.colors?.semantic?.background?.elevated || "#ffffff";
const textPrimary = (t) => t?.colors?.semantic?.text?.primary || "#0f172a";
const textSecondary = (t) => t?.colors?.semantic?.text?.secondary || "#475569";
const borderSubtle = (t) => t?.colors?.semantic?.border?.subtle || "rgba(148,163,184,0.18)";
const borderBase = (t) => t?.colors?.semantic?.border?.base || "rgba(148,163,184,0.32)";
const primary = (t) => t?.colors?.primary?.main || "#6366F1";
const primaryDark = (t) => t?.colors?.primary?.dark || "#4F46E5";
const successColor = (t) => t?.colors?.semantic?.success || "#10B981";
const warningColor = (t) => t?.colors?.semantic?.warning || "#F59E0B";

export const Page = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(1rem, 3vw, 2.5rem);
  color: ${({ theme }) => textPrimary(theme)};
`;

export const Crumbs = styled.nav`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  font-size: 0.85rem;
  color: ${({ theme }) => textSecondary(theme)};
  margin-bottom: 1.25rem;

  a {
    color: ${({ theme }) => primaryDark(theme)};
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const Gallery = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  background: ${({ theme }) => elevated(theme)};
  border: 1px solid ${({ theme }) => borderSubtle(theme)};
  aspect-ratio: 4 / 5;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  color: ${({ theme }) => textPrimary(theme)};
`;

export const Price = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => textPrimary(theme)};
`;

export const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => textSecondary(theme)};
  line-height: 1.6;
`;

export const Pills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

export const Pill = styled.span`
  padding: 0.32rem 0.7rem;
  border-radius: 999px;
  background: ${({ theme, $tone }) =>
    $tone === "success"
      ? `${successColor(theme)}1f`
      : $tone === "warn"
      ? `${warningColor(theme)}1f`
      : `${primary(theme)}14`};
  color: ${({ theme, $tone }) =>
    $tone === "success"
      ? successColor(theme)
      : $tone === "warn"
      ? warningColor(theme)
      : primaryDark(theme)};
  font-size: 0.78rem;
  font-weight: 600;
  border: 1px solid
    ${({ theme, $tone }) =>
      $tone === "success"
        ? `${successColor(theme)}33`
        : $tone === "warn"
        ? `${warningColor(theme)}33`
        : `${primary(theme)}26`};
`;

export const SizeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const SizeButton = styled.button`
  appearance: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0.55rem 0.95rem;
  border: 1px solid
    ${({ theme, $selected, $recommended }) =>
      $selected
        ? primary(theme)
        : $recommended
        ? `${successColor(theme)}80`
        : borderBase(theme)};
  background: ${({ theme, $selected }) =>
    $selected ? `${primary(theme)}12` : surface(theme)};
  color: ${({ theme }) => textPrimary(theme)};
  font-weight: 600;
  cursor: pointer;
  position: relative;
  transition: transform 150ms ease, border-color 150ms ease;

  &:hover {
    transform: translateY(-1px);
    border-color: ${({ theme }) => primary(theme)};
  }

  &::after {
    content: ${({ $recommended }) => ($recommended ? '"★"' : '""')};
    position: absolute;
    top: -6px;
    right: -6px;
    font-size: 0.7rem;
    color: ${({ theme }) => successColor(theme)};
  }
`;

export const Section = styled.section`
  display: grid;
  gap: 0.5rem;
  padding: clamp(0.85rem, 2vw, 1.25rem);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => elevated(theme)};
  border: 1px solid ${({ theme }) => borderSubtle(theme)};

  h3 {
    margin: 0;
    font-size: 1rem;
    color: ${({ theme }) => textPrimary(theme)};
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;

  th, td {
    padding: 0.55rem 0.7rem;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => borderSubtle(theme)};
  }
  th {
    color: ${({ theme }) => textSecondary(theme)};
    font-weight: 600;
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  tr.highlighted td {
    background: ${({ theme }) => `${primary(theme)}0d`};
    font-weight: 600;
  }
`;

export const DeltaList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.45rem;

  li {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.55rem 0.75rem;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    background: ${({ theme }) => surface(theme)};
    border: 1px solid ${({ theme }) => borderSubtle(theme)};
  }

  span.label {
    color: ${({ theme }) => textSecondary(theme)};
  }
  span.delta {
    font-weight: 600;
  }
`;

export const PrimaryCTA = styled.button`
  appearance: none;
  border: 0;
  padding: 0.95rem 1.4rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme?.colors?.primary?.gradientAlt || "linear-gradient(135deg, #6366F1, #8B5CF6)"};
  color: white;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme?.shadows?.colored || "0 14px 30px rgba(99,102,241,0.3)"};
  transition: transform 150ms ease, box-shadow 150ms ease;

  &:hover { transform: translateY(-1px); }
`;

export const Swatch = styled.span`
  width: 1.4rem;
  height: 1.4rem;
  display: inline-block;
  border-radius: 50%;
  background: ${({ $hex }) => $hex || "#cccccc"};
  border: 2px solid white;
  box-shadow: 0 0 0 1px ${({ theme }) => borderBase(theme)};
`;

export const SwatchRow = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  flex-wrap: wrap;
`;

export const ErrorState = styled.div`
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => textSecondary(theme)};
`;

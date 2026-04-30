import styled from "styled-components";

const surface = (t) => t?.colors?.semantic?.background?.surface || "#ffffff";
const elevated = (t) => t?.colors?.semantic?.background?.elevated || "#ffffff";
const textPrimary = (t) => t?.colors?.semantic?.text?.primary || "#0f172a";
const textSecondary = (t) => t?.colors?.semantic?.text?.secondary || "#475569";
const borderSubtle = (t) => t?.colors?.semantic?.border?.subtle || "rgba(148,163,184,0.18)";
const borderBase = (t) => t?.colors?.semantic?.border?.base || "rgba(148,163,184,0.32)";
const successColor = (t) => t?.colors?.semantic?.success || "#10B981";

export const CheckoutContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto 3rem;
  padding: clamp(1rem, 3vw, 2.5rem);
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(280px, 1fr);
  gap: 2rem;
  color: ${({ theme }) => textPrimary(theme)};

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

export const ItemsColumn = styled.div`
  background: ${({ theme }) => surface(theme)};
  border-radius: 1.35rem;
  border: 1px solid ${({ theme }) => borderSubtle(theme)};
  box-shadow: 0 18px 38px ${({ theme }) => textPrimary(theme)}14;
  padding: clamp(1rem, 2.5vw, 2rem);
  min-width: 0;
`;

export const SummaryColumn = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: sticky;
  top: 1.25rem;
  align-self: start;

  @media (max-width: 968px) {
    position: static;
  }
`;

export const SummaryCard = styled.section`
  background: ${({ theme }) => surface(theme)};
  border-radius: 1.35rem;
  border: 1px solid ${({ theme }) => borderSubtle(theme)};
  box-shadow: 0 18px 38px ${({ theme }) => textPrimary(theme)}14;
  padding: clamp(1rem, 2.5vw, 1.5rem);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const CheckoutTitle = styled.h2`
  margin: 0 0 0.4rem;
  font-family: 'Poppins', sans-serif;
  font-size: clamp(1.5rem, 2.4vw, 2rem);
  color: ${({ theme }) => textPrimary(theme)};
`;

export const CheckoutSubtitle = styled.p`
  margin: 0 0 1.5rem;
  color: ${({ theme }) => textSecondary(theme)};
  font-size: 0.95rem;
`;

export const CheckoutHeader = styled.div`
  width: 100%;
  padding: 0.75rem 0 1.25rem;
  display: grid;
  grid-template-columns: 92px 1.5fr 1fr 1fr 1fr 50px;
  gap: 1rem;
  border-bottom: 1px solid ${({ theme }) => borderSubtle(theme)};
  margin-bottom: 1rem;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const HeaderBlock = styled.div`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => textSecondary(theme)};
`;

export const SummaryHeader = styled.h3`
  margin: 0;
  font-size: 1.05rem;
  font-family: 'Poppins', sans-serif;
  color: ${({ theme }) => textPrimary(theme)};
`;

export const SummaryLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  color: ${({ theme }) => textSecondary(theme)};
  font-size: 0.92rem;

  span:last-child {
    font-weight: 600;
    color: ${({ theme }) => textPrimary(theme)};
  }

  & + & {
    margin-top: 0.45rem;
  }
`;

export const Divider = styled.hr`
  border: 0;
  border-top: 1px solid ${({ theme }) => borderSubtle(theme)};
  margin: 0.5rem 0;
`;

export const Total = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.6rem;
  margin-top: 0.4rem;
  font-family: 'Poppins', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => textPrimary(theme)};

  span:first-child {
    font-size: 0.85rem;
    font-weight: 600;
    color: ${({ theme }) => textSecondary(theme)};
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
`;

export const FitStatusWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: flex-end;
`;

export const FitStatusChip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.55rem;
  border-radius: 999px;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: ${({ theme, tone }) =>
    tone === "accent"
      ? theme?.colors?.primary?.dark || "#4F46E5"
      : tone === "success"
      ? successColor(theme)
      : textSecondary(theme)};
  background: ${({ theme, tone }) =>
    tone === "accent"
      ? `${theme?.colors?.primary?.main || "#6366F1"}14`
      : tone === "success"
      ? `${successColor(theme)}14`
      : elevated(theme)};
  border: 1px solid ${({ theme, tone }) =>
    tone === "accent"
      ? `${theme?.colors?.primary?.main || "#6366F1"}33`
      : tone === "success"
      ? `${successColor(theme)}33`
      : borderBase(theme)};
`;

export const EmptyState = styled.div`
  padding: 3rem 1rem;
  text-align: center;
  color: ${({ theme }) => textSecondary(theme)};
  font-size: 0.95rem;
`;

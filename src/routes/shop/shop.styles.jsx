import styled from "styled-components";

const surface = (t) => t?.colors?.semantic?.background?.surface || "#ffffff";
const elevated = (t) => t?.colors?.semantic?.background?.elevated || "#ffffff";
const textPrimary = (t) => t?.colors?.semantic?.text?.primary || "#0f172a";
const textSecondary = (t) => t?.colors?.semantic?.text?.secondary || "#475569";
const textMuted = (t) => t?.colors?.semantic?.text?.muted || "#94a3b8";
const borderSubtle = (t) => t?.colors?.semantic?.border?.subtle || "rgba(148,163,184,0.18)";
const borderBase = (t) => t?.colors?.semantic?.border?.base || "rgba(148,163,184,0.32)";
const primary = (t) => t?.colors?.primary?.main || "#6366F1";
const primaryDark = (t) => t?.colors?.primary?.dark || "#4F46E5";
const successColor = (t) => t?.colors?.semantic?.success || "#10B981";

export const Page = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: clamp(1rem, 2.5vw, 2rem);
  color: ${({ theme }) => textPrimary(theme)};
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1.25rem;

  h1 {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    color: ${({ theme }) => textPrimary(theme)};
  }

  p {
    margin: 0;
    color: ${({ theme }) => textSecondary(theme)};
    font-size: 0.95rem;
  }
`;

export const Toolbar = styled.section`
  position: sticky;
  top: 0.75rem;
  z-index: 30;
  display: grid;
  grid-template-columns: minmax(220px, 1fr) auto auto auto;
  gap: 0.65rem;
  align-items: center;
  padding: 0.7rem 0.85rem;
  border-radius: 1rem;
  background: ${({ theme }) => surface(theme)}e6;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid ${({ theme }) => borderSubtle(theme)};
  box-shadow: 0 12px 28px ${({ theme }) => textPrimary(theme)}14;
  margin-bottom: 1rem;

  @media (max-width: 720px) {
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }
`;

export const SearchField = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 0.85rem;
  border-radius: 999px;
  background: ${({ theme }) => elevated(theme)};
  border: 1px solid ${({ theme }) => borderBase(theme)};

  span.icon {
    font-size: 0.95rem;
    color: ${({ theme }) => textMuted(theme)};
  }

  input {
    flex: 1;
    border: 0;
    outline: none;
    background: transparent;
    color: ${({ theme }) => textPrimary(theme)};
    font: inherit;

    &::placeholder {
      color: ${({ theme }) => textMuted(theme)};
    }
  }

  @media (max-width: 720px) {
    grid-column: 1 / -1;
  }
`;

export const Select = styled.select`
  appearance: none;
  padding: 0.6rem 2.2rem 0.6rem 0.95rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => borderBase(theme)};
  background:
    ${({ theme }) => elevated(theme)}
    url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path d='M1 1l4 4 4-4' stroke='%2394a3b8' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>")
    no-repeat right 0.85rem center;
  color: ${({ theme }) => textPrimary(theme)};
  font: inherit;
  font-weight: 600;
  cursor: pointer;
`;

export const ToggleButton = styled.button`
  appearance: none;
  padding: 0.55rem 0.95rem;
  border-radius: 999px;
  border: 1px solid
    ${({ theme, $active }) => ($active ? primary(theme) : borderBase(theme))};
  background: ${({ theme, $active }) =>
    $active ? `${primary(theme)}14` : elevated(theme)};
  color: ${({ theme, $active }) => ($active ? primaryDark(theme) : textPrimary(theme))};
  font-weight: 600;
  font-size: 0.88rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: transform 150ms ease, border-color 150ms ease, background 150ms ease;

  &:hover { transform: translateY(-1px); }
`;

export const FilterDrawerButton = styled(ToggleButton)`
  @media (min-width: 961px) { display: none; }
`;

export const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
  align-items: center;
`;

export const Chip = styled.button`
  appearance: none;
  padding: 0.32rem 0.7rem;
  border-radius: 999px;
  border: 1px solid ${({ theme, $active }) => ($active ? primary(theme) : borderBase(theme))};
  background: ${({ theme, $active }) =>
    $active ? `${primary(theme)}14` : elevated(theme)};
  color: ${({ theme, $active }) => ($active ? primaryDark(theme) : textSecondary(theme))};
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  transition: transform 150ms ease, border-color 150ms ease, background 150ms ease;

  &:hover {
    border-color: ${({ theme }) => primary(theme)};
    transform: translateY(-1px);
  }

  small { color: ${({ theme }) => textMuted(theme)}; font-weight: 500; }
`;

export const ActiveChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.55rem 0.3rem 0.75rem;
  border-radius: 999px;
  background: ${({ theme }) => primary(theme)}14;
  color: ${({ theme }) => primaryDark(theme)};
  border: 1px solid ${({ theme }) => primary(theme)}33;
  font-size: 0.78rem;
  font-weight: 600;

  button {
    appearance: none;
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
    padding: 0;
  }
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 1.25rem;
  align-items: start;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export const Sidebar = styled.aside`
  position: sticky;
  top: 5.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.1rem;
  border-radius: 1.1rem;
  background: ${({ theme }) => surface(theme)};
  border: 1px solid ${({ theme }) => borderSubtle(theme)};

  @media (max-width: 960px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(380px, 92vw);
    z-index: 1700;
    overflow-y: auto;
    border-radius: 1.5rem 0 0 1.5rem;
    border: 1px solid ${({ theme }) => borderBase(theme)};
    border-right: 0;
    box-shadow: -22px 0 60px ${({ theme }) => textPrimary(theme)}33;
    transform: translateX(${({ $open }) => ($open ? "0" : "100%")});
    transition: transform 320ms cubic-bezier(0.4, 0, 0.2, 1);
    padding: 1.25rem 1.25rem 5.5rem;
    display: flex;
  }
`;

export const SidebarHeader = styled.div`
  display: none;

  @media (max-width: 960px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.85rem;
    margin-bottom: 0.25rem;
    border-bottom: 1px solid ${({ theme }) => borderSubtle(theme)};
    position: sticky;
    top: 0;
    background: ${({ theme }) => surface(theme)};
    z-index: 2;

    h2 {
      margin: 0;
      font-size: 1.05rem;
      font-family: 'Poppins', sans-serif;
      color: ${({ theme }) => textPrimary(theme)};
    }
  }
`;

export const SidebarClose = styled.button`
  appearance: none;
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => borderBase(theme)};
  background: ${({ theme }) => elevated(theme)};
  color: ${({ theme }) => textPrimary(theme)};
  border-radius: 999px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background 150ms ease, transform 150ms ease;

  &:hover {
    background: ${({ theme }) => primary(theme)}14;
    transform: rotate(90deg);
  }
`;

export const SidebarFooter = styled.div`
  display: none;

  @media (max-width: 960px) {
    display: flex;
    gap: 0.6rem;
    padding: 0.85rem 1.25rem;
    position: fixed;
    bottom: 0;
    right: 0;
    width: min(380px, 92vw);
    background: ${({ theme }) => surface(theme)};
    border-top: 1px solid ${({ theme }) => borderSubtle(theme)};
    transform: translateX(${({ $open }) => ($open ? "0" : "100%")});
    transition: transform 320ms cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1701;

    button {
      flex: 1;
    }
  }
`;

export const SidebarBackdrop = styled.div`
  display: none;
  @media (max-width: 960px) {
    display: block;
    position: fixed;
    inset: 0;
    background: ${({ theme }) => theme?.colors?.semantic?.background?.overlay || "rgba(15,23,42,0.5)"};
    backdrop-filter: blur(8px);
    z-index: 1600;
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
    transition: opacity 320ms cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

export const Section = styled.div`
  display: grid;
  gap: 0.55rem;

  h3 {
    margin: 0;
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({ theme }) => textSecondary(theme)};
  }
`;

export const SizeButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

export const SizeButton = styled.button`
  appearance: none;
  min-width: 2.5rem;
  padding: 0.45rem 0.7rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme, $active }) => ($active ? primary(theme) : borderBase(theme))};
  background: ${({ theme, $active }) => ($active ? `${primary(theme)}14` : elevated(theme))};
  color: ${({ theme, $active }) => ($active ? primaryDark(theme) : textPrimary(theme))};
  font-weight: 600;
  cursor: pointer;
  transition: border-color 150ms ease, transform 150ms ease;

  &:hover { transform: translateY(-1px); border-color: ${({ theme }) => primary(theme)}; }
`;

export const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input {
    width: 100%;
    min-width: 0;
    padding: 0.5rem 0.6rem;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    border: 1px solid ${({ theme }) => borderBase(theme)};
    background: ${({ theme }) => elevated(theme)};
    color: ${({ theme }) => textPrimary(theme)};
    font: inherit;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => primary(theme)};
      box-shadow: 0 0 0 3px ${({ theme }) => primary(theme)}26;
    }
  }

  span { color: ${({ theme }) => textMuted(theme)}; }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr));
  gap: 1.1rem;
`;

export const Empty = styled.div`
  padding: 3rem 1.5rem;
  text-align: center;
  border-radius: 1.1rem;
  border: 1px dashed ${({ theme }) => borderBase(theme)};
  background: ${({ theme }) => elevated(theme)};
  color: ${({ theme }) => textSecondary(theme)};
  display: grid;
  gap: 0.4rem;
  justify-items: center;

  strong {
    font-size: 1.05rem;
    color: ${({ theme }) => textPrimary(theme)};
  }

  button {
    appearance: none;
    margin-top: 0.5rem;
    padding: 0.55rem 1rem;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    border: 0;
    background: ${({ theme }) => theme?.colors?.primary?.gradientAlt || primary(theme)};
    color: white;
    font-weight: 600;
    cursor: pointer;
  }
`;

export const SmallButton = styled.button`
  appearance: none;
  align-self: flex-start;
  padding: 0.35rem 0.7rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => borderBase(theme)};
  background: ${({ theme }) => elevated(theme)};
  color: ${({ theme }) => textSecondary(theme)};
  font-size: 0.78rem;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => primary(theme)};
    color: ${({ theme }) => primaryDark(theme)};
  }
`;

export const ResultsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
  color: ${({ theme }) => textSecondary(theme)};
  font-size: 0.88rem;

  strong { color: ${({ theme }) => textPrimary(theme)}; }
  span.match { color: ${({ theme }) => successColor(theme)}; font-weight: 600; }
`;

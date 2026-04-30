import styled from "styled-components";

const bg = (t) => t?.colors?.semantic?.background?.primary || "#f8fafc";
const surface = (t) => t?.colors?.semantic?.background?.surface || "#ffffff";
const elevated = (t) => t?.colors?.semantic?.background?.elevated || "#ffffff";
const textPrimary = (t) => t?.colors?.semantic?.text?.primary || "#0f172a";
const textSecondary = (t) => t?.colors?.semantic?.text?.secondary || "#475569";
const textMuted = (t) => t?.colors?.semantic?.text?.muted || "#94a3b8";
const borderSubtle = (t) => t?.colors?.semantic?.border?.subtle || "rgba(148,163,184,0.18)";
const borderBase = (t) => t?.colors?.semantic?.border?.base || "rgba(148,163,184,0.32)";
const errorColor = (t) => t?.colors?.semantic?.error || "#ef4444";
const successColor = (t) => t?.colors?.semantic?.success || "#10b981";
const infoColor = (t) => t?.colors?.semantic?.info || "#3b82f6";
const primary = (t) => t?.colors?.primary?.main || "#6366f1";
const primaryDark = (t) => t?.colors?.primary?.dark || "#4f46e5";
const primaryGradient = (t) => t?.colors?.primary?.gradientAlt || "linear-gradient(135deg, #6366F1, #8B5CF6)";

export const Page = styled.div`
  min-height: 100vh;
  padding: clamp(1.25rem, 4vw, 3rem);
  background:
    radial-gradient(1200px 600px at 0% -10%, ${({ theme }) => primary(theme)}29, transparent 55%),
    radial-gradient(900px 600px at 100% 110%, ${({ theme }) => theme?.colors?.secondary?.main || "#ec4899"}1f, transparent 55%),
    ${({ theme }) => bg(theme)};
  color: ${({ theme }) => textPrimary(theme)};
`;

export const Card = styled.section`
  max-width: 980px;
  margin: 0 auto;
  border-radius: ${({ theme }) => theme.borderRadius["2xl"]};
  padding: clamp(1.25rem, 4vw, 2rem);
  background: ${({ theme }) => surface(theme)};
  color: ${({ theme }) => textPrimary(theme)};
  box-shadow: 0 24px 56px rgba(15, 23, 42, 0.12);
  border: 1px solid ${({ theme }) => borderSubtle(theme)};
  backdrop-filter: blur(14px);
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;

  h1 {
    margin: 0.6rem 0 0.25rem;
    font-size: clamp(1.4rem, 2.4vw, 1.9rem);
    color: ${({ theme }) => textPrimary(theme)};
  }

  p {
    margin: 0;
    color: ${({ theme }) => textSecondary(theme)};
    max-width: 520px;
  }
`;

export const Pill = styled.span`
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  background: ${({ theme }) => primary(theme)}1a;
  color: ${({ theme }) => primaryDark(theme)};
  border: 1px solid ${({ theme }) => primary(theme)}33;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.01em;
`;

export const Stepper = styled.ol`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  list-style: none;
  margin: 0 0 1.5rem;
  padding: 0;
`;

export const StepDot = styled.li`
  height: 0.5rem;
  border-radius: 999px;
  background: ${({ theme, $active, $done }) =>
    $done
      ? `linear-gradient(135deg, ${theme?.colors?.accent?.main || "#10B981"}, ${theme?.colors?.accent?.light || "#34D399"})`
      : $active
      ? primaryGradient(theme)
      : borderBase(theme)};
  transition: background 250ms ease;
`;

export const Panel = styled.div`
  padding: clamp(1rem, 2.5vw, 1.5rem);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background: ${({ theme }) => elevated(theme)};
  border: 1px solid ${({ theme }) => borderSubtle(theme)};
  color: ${({ theme }) => textPrimary(theme)};

  h2 {
    margin: 0 0 0.5rem;
    font-size: 1.15rem;
    color: ${({ theme }) => textPrimary(theme)};
  }

  p {
    color: ${({ theme }) => textSecondary(theme)};
    margin: 0 0 1rem;
    line-height: 1.55;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 1rem;
`;

export const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.85rem;
  margin-top: 1rem;
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.85rem;
  color: ${({ theme }) => textSecondary(theme)};
  font-weight: 500;

  input,
  select {
    padding: 0.65rem 0.75rem;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    border: 1px solid ${({ theme }) => borderBase(theme)};
    background: ${({ theme }) => surface(theme)};
    color: ${({ theme }) => textPrimary(theme)};
    font: inherit;
    transition: border 150ms ease, box-shadow 150ms ease;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => primary(theme)};
      box-shadow: 0 0 0 3px ${({ theme }) => primary(theme)}26;
    }
  }
`;

export const ActionRow = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 1.5rem;
`;

export const InlineNote = styled.p`
  margin: 0.65rem 0 0;
  padding: 0.6rem 0.85rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme, $tone }) =>
    $tone === "error"
      ? `${errorColor(theme)}14`
      : $tone === "success"
      ? `${successColor(theme)}14`
      : `${infoColor(theme)}14`};
  color: ${({ theme, $tone }) =>
    $tone === "error"
      ? errorColor(theme)
      : $tone === "success"
      ? successColor(theme)
      : infoColor(theme)};
  border: 1px solid
    ${({ theme, $tone }) =>
      $tone === "error"
        ? `${errorColor(theme)}33`
        : $tone === "success"
        ? `${successColor(theme)}33`
        : `${infoColor(theme)}26`};
  font-size: 0.85rem;
  line-height: 1.45;
`;

export const PrimaryAction = styled.button`
  appearance: none;
  border: 0;
  padding: 0.85rem 1.4rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-weight: 600;
  cursor: pointer;
  background: ${({ theme }) => primaryGradient(theme)};
  color: ${({ theme }) => theme?.colors?.semantic?.text?.inverse || "white"};
  box-shadow: ${({ theme }) => theme?.shadows?.colored || "0 14px 30px rgba(99, 102, 241, 0.3)"};
  transition: transform 150ms ease, box-shadow 150ms ease, opacity 150ms ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme?.shadows?.coloredHover || "0 18px 36px rgba(99, 102, 241, 0.36)"};
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export const GhostAction = styled.button`
  appearance: none;
  padding: 0.8rem 1.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => surface(theme)};
  color: ${({ theme }) => textPrimary(theme)};
  border: 1px solid ${({ theme }) => borderBase(theme)};
  font-weight: 600;
  cursor: pointer;
  transition: background 150ms ease, border 150ms ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => primary(theme)}0d;
    border-color: ${({ theme }) => primary(theme)}66;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Stage = styled.div`
  position: relative;
  width: 100%;
  max-width: 540px;
  margin: 1rem auto 0;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  background: #0f172a;
  aspect-ratio: 3 / 4;

  video,
  img,
  canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  canvas {
    pointer-events: none;
    z-index: 2;
  }

  canvas[data-mirrored="true"] {
    transform: scaleX(-1);
  }
`;

export const StagePill = styled.div`
  position: absolute;
  top: 0.7rem;
  left: 0.7rem;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.32rem 0.7rem;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.65);
  color: white;
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  backdrop-filter: blur(8px);

  span.dot {
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 999px;
    background: ${({ $live }) => ($live ? "#34d399" : "#94a3b8")};
    box-shadow: ${({ $live }) =>
      $live ? "0 0 0 3px rgba(52,211,153,0.25)" : "0 0 0 3px rgba(148,163,184,0.25)"};
    animation: ${({ $live }) => ($live ? "pulse 1.4s ease-in-out infinite" : "none")};
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }
`;

export const PermissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.85rem;
  margin-top: 1rem;
`;

export const PermissionCard = styled.button`
  text-align: left;
  padding: 1.1rem;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => borderBase(theme)};
  background: ${({ theme }) => surface(theme)};
  color: ${({ theme }) => textPrimary(theme)};
  cursor: pointer;
  transition: transform 150ms ease, border-color 150ms ease, box-shadow 150ms ease;

  strong {
    display: block;
    margin-bottom: 0.25rem;
    font-size: 0.95rem;
  }

  span {
    color: ${({ theme }) => textSecondary(theme)};
    font-size: 0.85rem;
    line-height: 1.45;
  }

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => primary(theme)}80;
    box-shadow: 0 14px 28px rgba(15, 23, 42, 0.08);
  }
`;

export const InferenceTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.85rem;
`;

export const Tag = styled.span`
  padding: 0.3rem 0.65rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ theme, $tone }) =>
    $tone === "ok"
      ? `${successColor(theme)}1f`
      : $tone === "warn"
      ? `${theme?.colors?.semantic?.warning || "#eab308"}1f`
      : `${primary(theme)}1f`};
  color: ${({ theme, $tone }) =>
    $tone === "ok"
      ? successColor(theme)
      : $tone === "warn"
      ? theme?.colors?.semantic?.warning || "#854d0e"
      : primaryDark(theme)};
`;

export const SummaryGrid = styled.dl`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.6rem;
  margin: 0;

  div {
    display: flex;
    justify-content: space-between;
    padding: 0.7rem 0.95rem;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    background: ${({ theme }) => surface(theme)};
    border: 1px solid ${({ theme }) => borderSubtle(theme)};
  }

  dt {
    color: ${({ theme }) => textSecondary(theme)};
    font-size: 0.85rem;
  }

  dd {
    margin: 0;
    font-weight: 600;
    color: ${({ theme }) => textPrimary(theme)};
  }
`;

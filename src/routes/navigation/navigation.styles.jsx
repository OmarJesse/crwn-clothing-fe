import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const surface = (t) => t?.colors?.semantic?.background?.surface || "#ffffff";
const elevated = (t) => t?.colors?.semantic?.background?.elevated || "#ffffff";
const textPrimary = (t) => t?.colors?.semantic?.text?.primary || "#0f172a";
const textSecondary = (t) => t?.colors?.semantic?.text?.secondary || "#475569";
const textMuted = (t) => t?.colors?.semantic?.text?.muted || "#94a3b8";
const borderSubtle = (t) => t?.colors?.semantic?.border?.subtle || "rgba(148,163,184,0.18)";
const borderBase = (t) => t?.colors?.semantic?.border?.base || "rgba(148,163,184,0.32)";
const primary = (t) => t?.colors?.primary?.main || "#6366F1";
const primaryDark = (t) => t?.colors?.primary?.dark || "#4F46E5";
const overlay = (t) => t?.colors?.semantic?.background?.overlay || "rgba(15,23,42,0.4)";

const floatGlow = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.55; }
  50% { transform: translate3d(0, -14px, 0) scale(1.08); opacity: 0.85; }
`;

export const AppSurface = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at top left, ${({ theme }) => primary(theme)}28, transparent 32%),
    radial-gradient(circle at top right, ${({ theme }) => theme?.colors?.secondary?.main || "#ec4899"}1f, transparent 28%),
    ${({ theme }) => theme?.colors?.semantic?.background?.primary || "#f8fafc"};
  color: ${({ theme }) => textPrimary(theme)};

  &::before,
  &::after {
    content: "";
    position: fixed;
    width: 32rem;
    height: 32rem;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
  }

  &::before {
    top: -10rem;
    left: -8rem;
    background: ${({ theme }) => primary(theme)}26;
    animation: ${floatGlow} 16s ease-in-out infinite;
  }

  &::after {
    right: -10rem;
    bottom: -12rem;
    background: ${({ theme }) => theme?.colors?.accent?.main || "#10B981"}1f;
    animation: ${floatGlow} 18s ease-in-out infinite reverse;
  }
`;

export const AppBackdrop = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image: radial-gradient(${({ theme }) => textMuted(theme)}33 1px, transparent 1px);
  background-size: 24px 24px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent 92%);
  opacity: 0.32;
`;

export const DockPanel = styled.main`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding: clamp(1rem, 2vw, 1.5rem);
  padding-bottom: 8.5rem;
`;

export const AppDock = styled.div`
  position: fixed;
  left: 50%;
  bottom: 1rem;
  transform: translateX(-50%);
  width: min(1100px, calc(100vw - 1.25rem));
  z-index: 1300;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

export const DockSurface = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  align-items: center;
  padding: 0.85rem 1rem;
  border-radius: 1.5rem;
  border: 1px solid ${({ theme }) => borderBase(theme)};
  background: ${({ theme }) => surface(theme)}d9;
  backdrop-filter: blur(20px) saturate(140%);
  -webkit-backdrop-filter: blur(20px) saturate(140%);
  box-shadow: 0 22px 44px ${({ theme }) => textPrimary(theme)}1f;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
  }
`;

export const DockBrand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  color: ${({ theme }) => textPrimary(theme)};
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;

  span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 3rem;
    height: 3rem;
    padding: 0 0.9rem;
    border-radius: 999px;
    background: ${({ theme }) => theme?.colors?.primary?.gradientAlt || "linear-gradient(135deg,#6366F1,#8B5CF6)"};
    box-shadow: ${({ theme }) => theme?.shadows?.colored || "0 10px 24px rgba(99,102,241,0.3)"};
    color: white;
  }
`;

export const DockTag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.45rem 0.75rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => textSecondary(theme)};
  background: ${({ theme }) => primary(theme)}14;
  border: 1px solid ${({ theme }) => primary(theme)}26;
`;

export const DockGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
`;

export const DockActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.65rem;

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const dockControl = ({ theme }) => `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.8rem;
  padding: 0.75rem 1rem;
  border-radius: 999px;
  border: 1px solid ${borderBase(theme)};
  background: ${elevated(theme)};
  color: ${textPrimary(theme)};
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-size: 0.92rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
  cursor: pointer;

  &:hover {
    background: ${primary(theme)}14;
    border-color: ${primary(theme)}66;
    transform: translateY(-1px);
  }
`;

export const DockLink = styled(Link)`
  ${(props) => dockControl(props)}
`;

export const DockButton = styled.button`
  ${(props) => dockControl(props)}
`;

export const DockIconLink = styled(Link)`
  ${(props) => dockControl(props)}
  padding: 0.75rem;
  min-width: 2.8rem;
  position: relative;
  font-size: 1.05rem;
`;

export const DockIconBadge = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 999px;
  background: ${({ theme }) => theme?.colors?.semantic?.success || "#10B981"};
  box-shadow: 0 0 0 2px ${({ theme }) => surface(theme)};
`;

export const ThemeToggle = styled(DockButton)`
  font-weight: 700;
  min-width: 6.6rem;
`;

export const DockHint = styled.p`
  margin: 0;
  text-align: center;
  color: ${({ theme }) => textSecondary(theme)};
  font-size: 0.82rem;
  letter-spacing: 0.01em;
`;

export const DockTitle = styled.h2`
  margin: 0.2rem 0 0;
  font-family: 'Poppins', sans-serif;
  font-size: clamp(1.2rem, 2vw, 1.7rem);
  color: ${({ theme }) => textPrimary(theme)};
`;

export const SearchModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1600;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: ${({ theme }) => overlay(theme)};
  backdrop-filter: blur(18px);
`;

export const SearchModalCard = styled.div`
  width: min(980px, 96vw);
  max-height: min(85vh, 900px);
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  border-radius: 1.75rem;
  border: 1px solid ${({ theme }) => borderBase(theme)};
  background: ${({ theme }) => surface(theme)};
  color: ${({ theme }) => textPrimary(theme)};
  box-shadow: 0 24px 60px ${({ theme }) => textPrimary(theme)}26;
  overflow: hidden;
`;

export const SearchModalBody = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background: ${({ theme }) => textMuted(theme)};
  }
`;

export const SearchModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const SearchModalLabel = styled.span`
  display: inline-flex;
  align-items: center;
  margin-bottom: 0.4rem;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: ${({ theme }) => primary(theme)}14;
  color: ${({ theme }) => primaryDark(theme)};
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const SearchModalClose = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 999px;
  background: ${({ theme }) => borderSubtle(theme)};
  color: ${({ theme }) => textPrimary(theme)};
  font-size: 1.6rem;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: ${({ theme }) => borderBase(theme)};
    transform: rotate(90deg);
  }
`;

export const ProfilePopover = styled.div`
  position: absolute;
  bottom: calc(100% + 0.6rem);
  right: 0;
  min-width: 240px;
  padding: 0.85rem 1rem;
  border-radius: 1rem;
  background: ${({ theme }) => surface(theme)};
  color: ${({ theme }) => textPrimary(theme)};
  border: 1px solid ${({ theme }) => borderBase(theme)};
  box-shadow: 0 18px 38px ${({ theme }) => textPrimary(theme)}1f;
  display: grid;
  gap: 0.45rem;
  z-index: 1400;

  strong {
    font-size: 0.85rem;
    color: ${({ theme }) => textPrimary(theme)};
  }

  small {
    color: ${({ theme }) => textSecondary(theme)};
    font-size: 0.78rem;
  }

  a, button {
    appearance: none;
    border: 0;
    background: transparent;
    text-align: left;
    color: ${({ theme }) => primaryDark(theme)};
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
    padding: 0.25rem 0;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ProfileButton = styled.button`
  ${(props) => dockControl(props)}
  position: relative;
`;

export const ProfileChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;

  span.dot {
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 999px;
    background: ${({ theme }) => theme?.colors?.semantic?.success || "#10B981"};
    box-shadow: 0 0 0 2px ${({ theme }) => theme?.colors?.semantic?.success || "#10B981"}33;
  }
`;

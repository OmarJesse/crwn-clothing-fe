import styled from "styled-components";
import { motion } from "framer-motion";

export const Page = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 32px 20px 80px;
  color: var(--color-text);
`;

export const Header = styled.div`
  margin-bottom: 28px;
`;

export const Eyebrow = styled.div`
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-primary);
  font-weight: 700;
  margin-bottom: 8px;
`;

export const Title = styled.h1`
  font-size: clamp(28px, 4vw, 44px);
  line-height: 1.05;
  margin: 0 0 10px;
  font-weight: 800;
  letter-spacing: -0.02em;
`;

export const Subtitle = styled.p`
  margin: 0;
  max-width: 60ch;
  color: var(--color-text-secondary);
  font-size: 16px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
  margin-top: 24px;

  @media (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Card = styled(motion.div)`
  grid-column: span ${(p) => p.$span || 6};
  background: var(--color-surface);
  border: 1px solid color-mix(in srgb, var(--color-text) 10%, transparent);
  border-radius: 18px;
  padding: 22px;
  box-shadow: 0 10px 30px -18px color-mix(in srgb, var(--color-text) 40%, transparent);

  @media (max-width: 720px) {
    grid-column: span 2;
  }
`;

export const CardLabel = styled.div`
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  font-weight: 700;
  margin-bottom: 6px;
`;

export const BigStat = styled.div`
  font-size: clamp(34px, 6vw, 56px);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
  background: linear-gradient(120deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const StatCaption = styled.div`
  margin-top: 8px;
  color: var(--color-text-secondary);
  font-size: 14px;
`;

// ---- horizontal bar chart (shape distribution) ----
export const BarRow = styled.div`
  display: grid;
  grid-template-columns: 130px 1fr 44px;
  align-items: center;
  gap: 12px;
  margin: 10px 0;
  font-size: 14px;

  @media (max-width: 480px) {
    grid-template-columns: 96px 1fr 40px;
  }
`;

export const BarLabel = styled.span`
  color: var(--color-text);
  text-transform: capitalize;
  font-weight: ${(p) => (p.$active ? 800 : 500)};
`;

export const BarTrack = styled.div`
  height: 12px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-text) 8%, transparent);
  overflow: hidden;
`;

export const BarFill = styled(motion.div)`
  height: 100%;
  border-radius: 999px;
  background: ${(p) =>
    p.$active
      ? "linear-gradient(90deg, var(--color-primary), var(--color-accent))"
      : "color-mix(in srgb, var(--color-primary) 55%, var(--color-surface))"};
`;

export const BarValue = styled.span`
  text-align: right;
  color: var(--color-text-secondary);
  font-variant-numeric: tabular-nums;
  font-weight: ${(p) => (p.$active ? 800 : 500)};
`;

// ---- percentile gauges ----
export const GaugeWrap = styled.div`
  display: grid;
  gap: 16px;
`;

export const Gauge = styled.div`
  display: grid;
  gap: 6px;
`;

export const GaugeHead = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: var(--color-text);
`;

export const GaugeTrack = styled.div`
  position: relative;
  height: 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-text) 8%, transparent);
`;

export const GaugeFill = styled(motion.div)`
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
`;

export const GaugeKnob = styled(motion.div)`
  position: absolute;
  top: 50%;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-surface);
  border: 3px solid var(--color-primary);
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 8px -2px color-mix(in srgb, var(--color-text) 60%, transparent);
`;

export const Pill = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-primary) 16%, transparent);
  color: var(--color-primary);
  font-weight: 700;
  font-size: 13px;
  text-transform: capitalize;
`;

export const CtaRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 14px;
`;

export const CtaButton = styled.button`
  appearance: none;
  border: none;
  cursor: pointer;
  padding: 12px 22px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 15px;
  background: linear-gradient(120deg, var(--color-primary), var(--color-accent));
  color: #fff;
  transition: transform 0.15s ease, filter 0.15s ease;
  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.05);
  }
`;

export const Muted = styled.p`
  color: var(--color-text-secondary);
  font-size: 15px;
`;

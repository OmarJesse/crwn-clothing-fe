import styled from "styled-components";
import {
  Panel,
  ActionRow,
  PrimaryAction,
  GhostAction,
  InlineNote,
} from "../onboarding.styles";
import { STYLE_OPTIONS, PALETTE_OPTIONS } from "../preferences-options";
import {
  surface,
  elevated,
  textPrimary,
  textSecondary,
  textMuted,
  borderSubtle,
  borderBase,
  primary,
  primaryDark,
  alpha,
} from "../../../styles/style-helpers";

const Section = styled.section`
  margin-top: 1.25rem;

  h3 {
    margin: 0 0 0.25rem;
    font-size: 0.96rem;
    font-family: 'Poppins', sans-serif;
    color: ${({ theme }) => textPrimary(theme)};
  }

  small {
    color: ${({ theme }) => textSecondary(theme)};
    font-size: 0.85rem;
    display: block;
    margin-bottom: 0.85rem;
  }
`;

const TileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.7rem;

  @media (max-width: 720px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Tile = styled.button`
  appearance: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
  padding: 0.85rem 0.9rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1.5px solid
    ${({ theme, $selected }) => ($selected ? primary(theme) : borderBase(theme))};
  background: ${({ theme, $selected }) =>
    $selected ? `${primary(theme)}14` : surface(theme)};
  color: ${({ theme }) => textPrimary(theme)};
  cursor: pointer;
  text-align: left;
  position: relative;
  transition: transform 150ms ease, border-color 150ms ease, background 150ms ease;
  min-height: 92px;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => primary(theme)};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => primary(theme)}33;
  }

  strong {
    font-size: 0.92rem;
    font-weight: 700;
    color: ${({ theme }) => textPrimary(theme)};
  }

  span.desc {
    font-size: 0.74rem;
    color: ${({ theme }) => textMuted(theme)};
    line-height: 1.35;
  }

  span.icon {
    font-size: 1.4rem;
    line-height: 1;
  }
`;

const TileCheck = styled.span`
  position: absolute;
  top: 0.55rem;
  right: 0.55rem;
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 999px;
  background: ${({ theme }) => primary(theme)};
  color: white;
  font-size: 0.7rem;
  display: ${({ $selected }) => ($selected ? "inline-flex" : "none")};
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px ${({ theme }) => alpha("#0f172a", 0.18)};
`;

const SwatchRow = styled.span`
  display: inline-flex;
  gap: 3px;
  margin-bottom: 0.2rem;

  i {
    width: 0.95rem;
    height: 0.95rem;
    border-radius: 4px;
    display: inline-block;
    background: ${({ $hex }) => $hex || "#cccccc"};
    border: 1px solid rgba(15, 23, 42, 0.06);
  }
`;

const PreferencesStep = ({ wizard, onAdvance, onBack }) => {
  const { styles: selectedStyles, palettes: selectedPalettes } = wizard.state.preferences;

  const toggle = (group, id) => wizard.togglePreference(group, id);

  return (
    <Panel>
      <h2>Tell us your taste</h2>
      <p>
        Pick the styles and color palettes you gravitate toward. We'll boost
        matching products in every recommendation. (Optional — skip if you're
        unsure, you can edit later.)
      </p>

      <Section>
        <h3>Preferred styles</h3>
        <small>Pick any that feel like you · {selectedStyles.length} selected</small>
        <TileGrid>
          {STYLE_OPTIONS.map((style) => {
            const selected = selectedStyles.includes(style.id);
            return (
              <Tile
                key={style.id}
                type="button"
                $selected={selected}
                onClick={() => toggle("styles", style.id)}
                aria-pressed={selected}
              >
                <span className="icon">{style.emoji}</span>
                <strong>{style.label}</strong>
                <span className="desc">{style.description}</span>
                <TileCheck $selected={selected}>✓</TileCheck>
              </Tile>
            );
          })}
        </TileGrid>
      </Section>

      <Section>
        <h3>Color palettes</h3>
        <small>Pick the palettes you wear the most · {selectedPalettes.length} selected</small>
        <TileGrid>
          {PALETTE_OPTIONS.map((palette) => {
            const selected = selectedPalettes.includes(palette.id);
            return (
              <Tile
                key={palette.id}
                type="button"
                $selected={selected}
                onClick={() => toggle("palettes", palette.id)}
                aria-pressed={selected}
              >
                <SwatchRow>
                  {palette.swatches.map((hex) => (
                    <i key={hex} style={{ background: hex }} />
                  ))}
                </SwatchRow>
                <strong>{palette.label}</strong>
                <span className="desc">{palette.description}</span>
                <TileCheck $selected={selected}>✓</TileCheck>
              </Tile>
            );
          })}
        </TileGrid>
      </Section>

      <ActionRow>
        <GhostAction type="button" onClick={onBack}>Back</GhostAction>
        <PrimaryAction type="button" onClick={onAdvance}>
          {selectedStyles.length + selectedPalettes.length === 0
            ? "Skip — review profile"
            : "Continue to review"}
        </PrimaryAction>
      </ActionRow>
    </Panel>
  );
};

export default PreferencesStep;

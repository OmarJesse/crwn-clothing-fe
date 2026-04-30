import {
  Panel,
  FieldGrid,
  Field,
  ActionRow,
  PrimaryAction,
  GhostAction,
  InlineNote,
} from "../onboarding.styles";
import { computeBmi } from "../inference/measurements";

const FIELDS = [
  { key: "heightCm", label: "Height (cm)", placeholder: "175", min: 130, max: 220 },
  { key: "weightKg", label: "Weight (kg)", placeholder: "72", min: 35, max: 200 },
  { key: "shoulderCm", label: "Shoulder (cm)", placeholder: "46", min: 30, max: 70 },
  { key: "chestCm", label: "Chest (cm)", placeholder: "98", min: 70, max: 150 },
  { key: "waistCm", label: "Waist (cm)", placeholder: "82", min: 55, max: 140 },
  { key: "hipCm", label: "Hip (cm)", placeholder: "100", min: 70, max: 160 },
  { key: "inseamCm", label: "Inseam (cm)", placeholder: "80", min: 55, max: 100 },
];

const MeasurementsStep = ({ wizard, onAdvance, onBack }) => {
  const { measurements, inference } = wizard.state;
  const bmi = computeBmi(measurements.heightCm, measurements.weightKg);

  const handleChange = (event) => {
    const { name, value } = event.target;
    wizard.patchMeasurement(name, value, true);
  };

  const ready = measurements.heightCm && measurements.weightKg;

  return (
    <Panel>
      <h2>Confirm your measurements</h2>
      <p>
        We pre-filled what we could infer from your photo. Tweak anything that
        looks off — these directly drive your size recommendations.
      </p>

      {inference?.usedFallback ? (
        <InlineNote $tone="warn">
          Pose detection wasn't confident, so these are estimates. Take a moment to verify.
        </InlineNote>
      ) : null}
      {bmi ? <InlineNote $tone="success">BMI: {bmi}</InlineNote> : null}

      <FieldGrid>
        {FIELDS.map((field) => (
          <Field key={field.key}>
            <span>{field.label}</span>
            <input
              name={field.key}
              type="number"
              value={measurements[field.key] || ""}
              onChange={handleChange}
              placeholder={field.placeholder}
              min={field.min}
              max={field.max}
              step="0.1"
            />
          </Field>
        ))}
        <Field>
          <span>Preferred fit</span>
          <select name="preferredFit" value={measurements.preferredFit} onChange={handleChange}>
            <option value="slim">Slim</option>
            <option value="regular">Regular</option>
            <option value="oversized">Oversized</option>
          </select>
        </Field>
      </FieldGrid>

      <ActionRow>
        <GhostAction type="button" onClick={onBack}>
          Back to camera
        </GhostAction>
        <PrimaryAction type="button" onClick={onAdvance} disabled={!ready}>
          Review profile
        </PrimaryAction>
      </ActionRow>
    </Panel>
  );
};

export default MeasurementsStep;

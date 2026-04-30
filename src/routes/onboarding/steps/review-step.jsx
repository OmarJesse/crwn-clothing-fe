import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onboardingStart } from "../../../store/user/user.action";
import {
  Panel,
  ActionRow,
  PrimaryAction,
  GhostAction,
  SummaryGrid,
  InlineNote,
  Tag,
  InferenceTags,
} from "../onboarding.styles";
import { computeBmi, inferBodyShape } from "../inference/measurements";
import { STYLE_BY_ID, PALETTE_BY_ID } from "../preferences-options";

const ReviewStep = ({ wizard, onBack }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, currentUser, requiresOnboarding } = useSelector((state) => state.user);
  const submittedRef = useRef(false);

  useEffect(() => {
    if (submittedRef.current && !isLoading && !requiresOnboarding) {
      submittedRef.current = false;
      wizard.reset();
      navigate("/");
    }
  }, [isLoading, requiresOnboarding, wizard, navigate]);

  const { measurements, inference, preferences } = wizard.state;
  const bmi = computeBmi(measurements.heightCm, measurements.weightKg);
  const bodyShape = inferBodyShape(measurements);

  const handleSubmit = () => {
    submittedRef.current = true;

    const confidence =
      inference?.confidence && Number.isFinite(inference.confidence)
        ? Math.max(0, Math.min(1, inference.confidence))
        : null;

    const payload = {
      heightCm: Number(measurements.heightCm) || null,
      weightKg: Number(measurements.weightKg) || null,
      chestCm: Number(measurements.chestCm) || null,
      waistCm: Number(measurements.waistCm) || null,
      hipCm: Number(measurements.hipCm) || null,
      inseamCm: Number(measurements.inseamCm) || null,
      shoulderCm: Number(measurements.shoulderCm) || null,
      preferredFit: measurements.preferredFit,
      landmarkSummary: confidence !== null ? { confidence } : null,
      landmarkModel: inference?.pose ? "movenet-thunder" : inference?.face ? "facemesh" : null,
      preferredStyles: preferences.styles.length > 0 ? preferences.styles : null,
      preferredPalettes: preferences.palettes.length > 0 ? preferences.palettes : null,
    };

    dispatch(onboardingStart(payload));
  };

  const summaryItems = [
    ["Name", currentUser?.name || "—"],
    ["Height", measurements.heightCm ? `${measurements.heightCm} cm` : "—"],
    ["Weight", measurements.weightKg ? `${measurements.weightKg} kg` : "—"],
    ["BMI", bmi ?? "—"],
    ["Shoulder", measurements.shoulderCm ? `${measurements.shoulderCm} cm` : "—"],
    ["Chest", measurements.chestCm ? `${measurements.chestCm} cm` : "—"],
    ["Waist", measurements.waistCm ? `${measurements.waistCm} cm` : "—"],
    ["Hip", measurements.hipCm ? `${measurements.hipCm} cm` : "—"],
    ["Inseam", measurements.inseamCm ? `${measurements.inseamCm} cm` : "—"],
    ["Body shape", bodyShape || "—"],
    ["Preferred fit", measurements.preferredFit],
  ];

  const errorMessage = typeof error === "string" ? error : error?.message;

  return (
    <Panel>
      <h2>Review and save</h2>
      <p>
        Everything below will be used to recommend the right size on every product
        page. You can update any of this later from your profile.
      </p>

      <SummaryGrid>
        {summaryItems.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </SummaryGrid>

      {(preferences.styles.length > 0 || preferences.palettes.length > 0) && (
        <div style={{ marginTop: "1rem" }}>
          {preferences.styles.length > 0 && (
            <InferenceTags>
              <Tag>Styles</Tag>
              {preferences.styles.map((id) => (
                <Tag key={id} $tone="ok">
                  {STYLE_BY_ID[id]?.emoji} {STYLE_BY_ID[id]?.label || id}
                </Tag>
              ))}
            </InferenceTags>
          )}
          {preferences.palettes.length > 0 && (
            <InferenceTags>
              <Tag>Palettes</Tag>
              {preferences.palettes.map((id) => (
                <Tag key={id} $tone="ok">
                  {PALETTE_BY_ID[id]?.label || id}
                </Tag>
              ))}
            </InferenceTags>
          )}
        </div>
      )}

      {errorMessage ? <InlineNote $tone="error">{errorMessage}</InlineNote> : null}

      <ActionRow>
        <GhostAction type="button" onClick={onBack} disabled={isLoading}>
          Back
        </GhostAction>
        <PrimaryAction type="button" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Saving…" : "Save profile & start shopping"}
        </PrimaryAction>
      </ActionRow>
    </Panel>
  );
};

export default ReviewStep;

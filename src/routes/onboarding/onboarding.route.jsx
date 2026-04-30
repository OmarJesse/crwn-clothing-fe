import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { useWizardState, STEPS } from "./hooks/use-wizard-state";
import AccountStep from "./steps/account-step";
import CaptureStep from "./steps/capture-step";
import MeasurementsStep from "./steps/measurements-step";
import PreferencesStep from "./steps/preferences-step";
import ReviewStep from "./steps/review-step";
import {
  Page,
  Card,
  HeaderRow,
  Pill,
  Stepper,
  StepDot,
} from "./onboarding.styles";

const STEP_LABELS = {
  account: "Account",
  capture: "Camera",
  measurements: "Measurements",
  preferences: "Style",
  review: "Review",
};

const Onboarding = () => {
  const wizard = useWizardState();
  const { tokens, currentUser, bodyProfile } = useSelector((state) => state.user);
  const isAuthenticated = Boolean(tokens?.token);
  const isEditing = isAuthenticated && Boolean(bodyProfile);

  useEffect(() => {
    // Logged out (or session cleared): force the wizard back to step 1
    // so a stale capture/measurements state from a previous user can't show.
    if (!isAuthenticated) {
      if (wizard.state.step !== "account") wizard.goToStep("account");
      return;
    }

    if (wizard.state.step !== "account") return;

    if (bodyProfile) {
      wizard.applyInferredMeasurements({
        heightCm: bodyProfile.heightCm,
        weightKg: bodyProfile.weightKg,
        chestCm: bodyProfile.chestCm,
        waistCm: bodyProfile.waistCm,
        hipCm: bodyProfile.hipCm,
        inseamCm: bodyProfile.inseamCm,
        shoulderCm: bodyProfile.shoulderCm,
        preferredFit: bodyProfile.preferredFit,
      });
      if (Array.isArray(bodyProfile.preferredStyles) || Array.isArray(bodyProfile.preferredPalettes)) {
        wizard.setPreferences({
          styles: bodyProfile.preferredStyles || [],
          palettes: bodyProfile.preferredPalettes || [],
        });
      }
      wizard.goToStep("measurements");
    } else {
      wizard.goToStep("capture");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, bodyProfile?.id]);

  const stepIndex = useMemo(() => STEPS.indexOf(wizard.state.step), [wizard.state.step]);

  const renderStep = () => {
    switch (wizard.state.step) {
      case "account":
        return <AccountStep wizard={wizard} onAdvance={() => wizard.goToStep("capture")} />;
      case "capture":
        return (
          <CaptureStep
            wizard={wizard}
            onAdvance={() => wizard.goToStep("measurements")}
            onBack={() => (isAuthenticated ? null : wizard.goToStep("account"))}
          />
        );
      case "measurements":
        return (
          <MeasurementsStep
            wizard={wizard}
            onAdvance={() => wizard.goToStep("preferences")}
            onBack={() => wizard.goToStep("capture")}
          />
        );
      case "preferences":
        return (
          <PreferencesStep
            wizard={wizard}
            onAdvance={() => wizard.goToStep("review")}
            onBack={() => wizard.goToStep("measurements")}
          />
        );
      case "review":
        return <ReviewStep wizard={wizard} onBack={() => wizard.goToStep("preferences")} />;
      default:
        return null;
    }
  };

  return (
    <Page>
      <Card>
        <HeaderRow>
          <div>
            <Pill>Body Profile Setup</Pill>
            <h1>A better fit, in 4 quick steps</h1>
            <p>
              {currentUser?.name
                ? `Welcome ${currentUser.name}. Let's tune your sizes.`
                : "We'll learn your size once and recommend it everywhere."}
            </p>
          </div>
          <Pill>
            {isEditing ? "Editing · " : ""}Step {stepIndex + 1} / {STEPS.length} · {STEP_LABELS[wizard.state.step]}
          </Pill>
        </HeaderRow>

        <Stepper>
          {STEPS.map((s, i) => (
            <StepDot key={s} $active={i === stepIndex} $done={i < stepIndex} />
          ))}
        </Stepper>

        <AnimatePresence mode="wait">
          <motion.div
            key={wizard.state.step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </Card>
    </Page>
  );
};

export default Onboarding;

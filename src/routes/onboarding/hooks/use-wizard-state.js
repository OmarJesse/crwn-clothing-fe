import { useCallback, useEffect, useMemo, useReducer } from "react";

const STORAGE_KEY = "crwn:onboarding-wizard";

export const STEPS = ["account", "capture", "measurements", "preferences", "review"];

const INITIAL_STATE = {
  step: "account",
  account: { displayName: "", email: "", password: "", confirmPassword: "" },
  capture: { photoDataUrl: "", source: null, capturedAt: null },
  inference: null,
  measurements: {
    heightCm: "",
    weightKg: "",
    chestCm: "",
    waistCm: "",
    hipCm: "",
    inseamCm: "",
    shoulderCm: "",
    preferredFit: "regular",
  },
  preferences: {
    styles: [],
    palettes: [],
  },
  touchedFields: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "hydrate":
      return { ...INITIAL_STATE, ...action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "patchAccount":
      return { ...state, account: { ...state.account, ...action.payload } };
    case "setCapture":
      return { ...state, capture: { ...action.payload }, inference: null };
    case "setInference":
      return { ...state, inference: action.payload };
    case "patchMeasurement": {
      const { name, value, userEdited } = action.payload;
      const touched = userEdited && !state.touchedFields.includes(name)
        ? [...state.touchedFields, name]
        : state.touchedFields;
      return {
        ...state,
        measurements: { ...state.measurements, [name]: value },
        touchedFields: touched,
      };
    }
    case "applyInferredMeasurements": {
      const next = { ...state.measurements };
      Object.entries(action.payload || {}).forEach(([key, value]) => {
        if (state.touchedFields.includes(key)) return;
        if (value === null || value === undefined) return;
        next[key] = String(value);
      });
      return { ...state, measurements: next };
    }
    case "togglePreference": {
      const { group, value } = action.payload;
      const arr = state.preferences[group] || [];
      const next = arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value];
      return {
        ...state,
        preferences: { ...state.preferences, [group]: next },
      };
    }
    case "setPreferences":
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload },
      };
    case "reset":
      return INITIAL_STATE;
    default:
      return state;
  }
};

const loadInitial = () => {
  if (typeof window === "undefined") return INITIAL_STATE;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_STATE;
    const parsed = JSON.parse(raw);
    return { ...INITIAL_STATE, ...parsed, account: { ...INITIAL_STATE.account, ...(parsed.account || {}), password: "", confirmPassword: "" } };
  } catch {
    return INITIAL_STATE;
  }
};

export const useWizardState = () => {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitial);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const safe = { ...state, account: { ...state.account, password: "", confirmPassword: "" } };
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
    } catch {
      /* quota exceeded — non-fatal */
    }
  }, [state]);

  const goToStep = useCallback((next) => {
    if (STEPS.includes(next)) dispatch({ type: "setStep", payload: next });
  }, []);

  const goNext = useCallback(() => {
    const idx = STEPS.indexOf(state.step);
    if (idx >= 0 && idx < STEPS.length - 1) dispatch({ type: "setStep", payload: STEPS[idx + 1] });
  }, [state.step]);

  const goBack = useCallback(() => {
    const idx = STEPS.indexOf(state.step);
    if (idx > 0) dispatch({ type: "setStep", payload: STEPS[idx - 1] });
  }, [state.step]);

  const reset = useCallback(() => {
    dispatch({ type: "reset" });
    if (typeof window !== "undefined") window.sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  const helpers = useMemo(() => ({
    patchAccount: (payload) => dispatch({ type: "patchAccount", payload }),
    setCapture: (payload) => dispatch({ type: "setCapture", payload }),
    setInference: (payload) => dispatch({ type: "setInference", payload }),
    patchMeasurement: (name, value, userEdited = true) =>
      dispatch({ type: "patchMeasurement", payload: { name, value, userEdited } }),
    applyInferredMeasurements: (payload) =>
      dispatch({ type: "applyInferredMeasurements", payload }),
    togglePreference: (group, value) =>
      dispatch({ type: "togglePreference", payload: { group, value } }),
    setPreferences: (payload) =>
      dispatch({ type: "setPreferences", payload }),
    goToStep,
    goNext,
    goBack,
    reset,
  }), [goToStep, goNext, goBack, reset]);

  const stepIndex = STEPS.indexOf(state.step);
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  return { state, ...helpers, stepIndex, progress };
};

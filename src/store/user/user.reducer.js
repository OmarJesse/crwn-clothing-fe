import USER_ACTION_TYPES from "./user.types";

export const INITIAL_STATE = {
  currentUser: null,
  tokens: null,
  isLoading: false,
  error: null,
  shouldNavigateHome: false,
  requiresOnboarding: false,
  bodyProfile: null,
  styleProfile: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
    case USER_ACTION_TYPES.SIGN_UP_SUCCESS: {
      const completed = Boolean(payload.user?.onboardingCompletedAt);
      return {
        ...state,
        tokens: payload.tokens,
        currentUser: payload.user,
        bodyProfile: completed ? payload.user : null,
        requiresOnboarding: Boolean(payload.onboardingRequired || !completed),
        shouldNavigateHome: !Boolean(payload.onboardingRequired || !completed),
        error: null,
      };
    }

    case USER_ACTION_TYPES.ONBOARDING_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case USER_ACTION_TYPES.ONBOARDING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        requiresOnboarding: false,
        shouldNavigateHome: true,
        bodyProfile: payload,
        currentUser: {
          ...state.currentUser,
          ...payload,
        },
        error: null,
      };

    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        tokens: null,
        requiresOnboarding: false,
        bodyProfile: null,
        styleProfile: null,
        error: null,
      };
    case USER_ACTION_TYPES.SET_STYLE_PROFILE:
      return {
        ...state,
        styleProfile: payload,
      };
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
    case USER_ACTION_TYPES.SIGN_OUT_FAILED:
    case USER_ACTION_TYPES.SIGN_UP_FAILED:
    case USER_ACTION_TYPES.ONBOARDING_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case USER_ACTION_TYPES.SET_SHOULD_NAVIGATE_HOME:
      return {
        ...state,
        shouldNavigateHome: payload,
      };
    case USER_ACTION_TYPES.SET_REQUIRES_ONBOARDING:
      return {
        ...state,
        requiresOnboarding: payload,
      };
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      return state;
  }
};

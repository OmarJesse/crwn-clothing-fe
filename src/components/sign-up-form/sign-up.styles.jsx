// Back-compat re-export so any legacy imports of "sign-up.styles" keep working.
// The actual component now reuses the shared auth form styles defined alongside
// SignInForm so the two flows stay visually consistent.
export {
  AuthFormContainer as SignUpContainer,
  AuthFormHeader,
  AuthField,
  AuthInput,
  AuthLabel,
  AuthErrorNote,
  PasswordWrapper,
  PasswordToggle,
  AuthSubmit,
  AuthHelperRow,
  PasswordStrengthBar,
  PasswordHint,
} from "../sign-in-form/sign-in-form.styles.jsx";

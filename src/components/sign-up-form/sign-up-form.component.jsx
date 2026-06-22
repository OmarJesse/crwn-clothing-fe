import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpStart } from "../../store/user/user.action";
import {
  AuthFormContainer,
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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const computePasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 6) score += 1;
  if (password.length >= 10) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password) && /[^A-Za-z0-9]/.test(password)) score += 1;
  return score; // 0..4
};

const SignUpForm = () => {
  const [displayName, setDisplayName] = useState("");
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.user);
  const remoteError =
    typeof error === "string"
      ? error
      : error?.message || error?.error || error?.details;

  const strength = useMemo(() => computePasswordStrength(password), [password]);
  const strengthLabel = useMemo(() => {
    if (!password) return "";
    return ["Too short", "Weak", "OK", "Strong", "Very strong"][strength];
  }, [strength, password]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLocalError("");

    if (!displayName.trim()) {
      setLocalError("What should we call you? Add a display name.");
      return;
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      setLocalError("That doesn't look like a valid email address.");
      return;
    }
    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }
    dispatch(
      signUpStart(email.trim(), password, displayName.trim(), gender || null)
    );
  };

  const displayedError = localError || remoteError;

  return (
    <AuthFormContainer>
      <AuthFormHeader>
        <h2>New here?</h2>
        <p>Create your fit profile and we'll learn your size once.</p>
      </AuthFormHeader>

      <form onSubmit={handleSubmit} noValidate>
        <AuthField>
          <AuthLabel htmlFor="signup-name">Display name</AuthLabel>
          <AuthInput
            id="signup-name"
            type="text"
            autoComplete="name"
            placeholder="Alex"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        </AuthField>

        <AuthField>
          <AuthLabel htmlFor="signup-gender">Gender</AuthLabel>
          <AuthInput
            as="select"
            id="signup-gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </AuthInput>
        </AuthField>

        <AuthField>
          <AuthLabel htmlFor="signup-email">Email</AuthLabel>
          <AuthInput
            id="signup-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </AuthField>

        <AuthField>
          <AuthLabel htmlFor="signup-password">Password</AuthLabel>
          <PasswordWrapper>
            <AuthInput
              id="signup-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="6+ characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </PasswordToggle>
          </PasswordWrapper>
          {password ? (
            <>
              <PasswordStrengthBar $strength={strength} aria-hidden />
              <PasswordHint>{strengthLabel}</PasswordHint>
            </>
          ) : null}
        </AuthField>

        <AuthField>
          <AuthLabel htmlFor="signup-confirm">Confirm password</AuthLabel>
          <AuthInput
            id="signup-confirm"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Repeat password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
          />
        </AuthField>

        {displayedError ? (
          <AuthErrorNote role="alert">{displayedError}</AuthErrorNote>
        ) : null}

        <AuthSubmit type="submit" disabled={isLoading}>
          {isLoading ? "Creating account…" : "Create account"}
        </AuthSubmit>

        <AuthHelperRow>
          By signing up you accept our friendly fit-aware vibe.
        </AuthHelperRow>
      </form>
    </AuthFormContainer>
  );
};

export default SignUpForm;

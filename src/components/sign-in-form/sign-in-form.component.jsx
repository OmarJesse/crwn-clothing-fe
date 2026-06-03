import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInStart } from "../../store/user/user.action.js";
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
} from "./sign-in-form.styles.jsx";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.user);

  const remoteError =
    typeof error === "string"
      ? error
      : error?.message || error?.error || error?.details;

  const handleSubmit = (event) => {
    event.preventDefault();
    setLocalError("");
    if (!EMAIL_PATTERN.test(email.trim())) {
      setLocalError("That doesn't look like a valid email address.");
      return;
    }
    if (password.length < 6) {
      setLocalError("Password should be at least 6 characters.");
      return;
    }
    dispatch(signInStart(email.trim(), password));
  };

  const displayedError = localError || remoteError;

  return (
    <AuthFormContainer>
      <AuthFormHeader>
        <h2>Welcome back</h2>
        <p>Sign in with your email and password.</p>
      </AuthFormHeader>

      <form onSubmit={handleSubmit} noValidate>
        <AuthField>
          <AuthLabel htmlFor="signin-email">Email</AuthLabel>
          <AuthInput
            id="signin-email"
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
          <AuthLabel htmlFor="signin-password">Password</AuthLabel>
          <PasswordWrapper>
            <AuthInput
              id="signin-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
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
        </AuthField>

        {displayedError ? (
          <AuthErrorNote role="alert">{displayedError}</AuthErrorNote>
        ) : null}

        <AuthSubmit type="submit" disabled={isLoading}>
          {isLoading ? "Signing in…" : "Sign in"}
        </AuthSubmit>

        <AuthHelperRow>
          <span>New here?</span>{" "}
          <a href="/onboarding">Create your fit profile →</a>
        </AuthHelperRow>
      </form>
    </AuthFormContainer>
  );
};

export default SignInForm;

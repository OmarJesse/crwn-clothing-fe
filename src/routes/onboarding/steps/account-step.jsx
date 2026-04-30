import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpStart } from "../../../store/user/user.action";
import {
  Panel,
  Field,
  FieldGrid,
  ActionRow,
  PrimaryAction,
  GhostAction,
  InlineNote,
} from "../onboarding.styles";

const AccountStep = ({ wizard, onAdvance }) => {
  const dispatch = useDispatch();
  const { tokens, isLoading, error } = useSelector((state) => state.user);
  const [confirmError, setConfirmError] = useState("");
  const submittedRef = useRef(false);

  useEffect(() => {
    if (submittedRef.current && tokens?.token) {
      submittedRef.current = false;
      onAdvance();
    }
  }, [tokens?.token, onAdvance]);

  const handleField = (event) => {
    const { name, value } = event.target;
    wizard.patchAccount({ [name]: value });
    if (confirmError) setConfirmError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = wizard.state.account;

    if (!displayName.trim() || !email.trim() || !password) {
      setConfirmError("Please fill in your name, email, and password.");
      return;
    }
    if (password.length < 6) {
      setConfirmError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setConfirmError("Passwords do not match.");
      return;
    }

    submittedRef.current = true;
    dispatch(signUpStart(email.trim(), password, displayName.trim()));
  };

  const { displayName, email, password, confirmPassword } = wizard.state.account;
  const errorMessage =
    confirmError || (typeof error === "string" ? error : error?.message);

  return (
    <Panel as="form" onSubmit={handleSubmit}>
      <h2>Create your account</h2>
      <p>We use your email only to save your size profile. No spam, ever.</p>

      <FieldGrid>
        <Field>
          <span>Display name</span>
          <input
            name="displayName"
            value={displayName}
            onChange={handleField}
            placeholder="Alex"
            autoComplete="name"
            required
          />
        </Field>
        <Field>
          <span>Email</span>
          <input
            name="email"
            type="email"
            value={email}
            onChange={handleField}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </Field>
        <Field>
          <span>Password</span>
          <input
            name="password"
            type="password"
            value={password}
            onChange={handleField}
            placeholder="6+ characters"
            autoComplete="new-password"
            required
            minLength={6}
          />
        </Field>
        <Field>
          <span>Confirm password</span>
          <input
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleField}
            autoComplete="new-password"
            required
            minLength={6}
          />
        </Field>
      </FieldGrid>

      {errorMessage ? <InlineNote $tone="error">{errorMessage}</InlineNote> : null}

      <ActionRow>
        <GhostAction type="button" onClick={() => (window.location.href = "/auth")}>
          I already have an account
        </GhostAction>
        <PrimaryAction type="submit" disabled={isLoading}>
          {isLoading ? "Creating account…" : "Continue to camera"}
        </PrimaryAction>
      </ActionRow>
    </Panel>
  );
};

export default AccountStep;

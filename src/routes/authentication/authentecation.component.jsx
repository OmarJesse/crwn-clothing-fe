import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import { AuthenticationContainer } from "./authentecation.styles";
import styled from "styled-components";
import {
  surface,
  elevated,
  textPrimary,
  textSecondary,
  borderSubtle,
  borderBase,
  primary,
  secondary,
  alpha,
} from "../../styles/style-helpers";

const AuthHero = styled.div`
  flex: 1;
  min-width: 320px;
  max-width: 540px;
  padding: clamp(1.5rem, 4vw, 3rem);
  border-radius: 1.5rem;
  background:
    radial-gradient(circle at top left, ${({ theme }) => primary(theme)}1a, transparent 36%),
    radial-gradient(circle at bottom right, ${({ theme }) => secondary(theme)}14, transparent 32%),
    ${({ theme }) => surface(theme)};
  border: 1px solid ${({ theme }) => borderSubtle(theme)};
  color: ${({ theme }) => textPrimary(theme)};
  box-shadow: 0 16px 28px ${({ theme }) => alpha("#0f172a", 0.1)};

  h1 {
    margin: 0 0 1rem;
    font-size: clamp(2rem, 4vw, 3.4rem);
    line-height: 1.05;
    font-family: 'Poppins', sans-serif;
    color: ${({ theme }) => textPrimary(theme)};
  }

  p {
    margin: 0 0 1.25rem;
    color: ${({ theme }) => textSecondary(theme)};
    font-size: 1.02rem;
    line-height: 1.6;
  }
`;

const PillRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 1.25rem;
`;

const Pill = styled.span`
  padding: 0.45rem 0.75rem;
  border-radius: 999px;
  background: ${({ theme }) => elevated(theme)};
  border: 1px solid ${({ theme }) => borderBase(theme)};
  color: ${({ theme }) => textSecondary(theme)};
  font-size: 0.85rem;
`;

const Authentication = () => {
  return (
    <AuthenticationContainer>
      <AuthHero>
        <span>Fit-aware shopping</span>
        <h1>Sign in, measure once, shop with confidence.</h1>
        <p>
          Capture a quick profile and let the store recommend sizes that match your body instead of guessing on every product.
        </p>
        <PillRow>
          <Pill>Camera onboarding</Pill>
          <Pill>Body measurements</Pill>
          <Pill>Size recommendations</Pill>
          <Pill>Style match</Pill>
        </PillRow>
      </AuthHero>
      <SignInForm />
      <SignUpForm />
    </AuthenticationContainer>
  );
};

export default Authentication;

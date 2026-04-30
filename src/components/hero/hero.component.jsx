import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  HeroContainer,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  HeroButtons,
  HeroButton,
  HeroSecondaryButton,
  HeroBackground,
  HeroOverlay,
  FloatingShape,
} from './hero.styles';

const Hero = () => {
  const navigate = useNavigate();
  const hasFitProfile = useSelector(
    (state) => Boolean(state.user.bodyProfile?.onboardingCompletedAt)
  );

  return (
    <HeroContainer>
      <HeroBackground />
      <HeroOverlay />

      <FloatingShape position="top-left" />
      <FloatingShape position="top-right" />
      <FloatingShape position="bottom-left" />
      <FloatingShape position="bottom-right" />

      <HeroContent>
        <HeroTitle>
          Elevate Your Style
          <br />
          <span className="gradient-text">Define Your Look</span>
        </HeroTitle>

        <HeroSubtitle>
          {hasFitProfile
            ? "Welcome back. Browse the catalog with sizes and styles tuned to your fit profile."
            : "Capture your measurements once, get recommendations every time. Set up your fit profile to unlock personalized sizing and style picks."}
        </HeroSubtitle>

        <HeroButtons>
          <HeroButton onClick={() => navigate('/shop')}>
            Shop Now
          </HeroButton>
          <HeroSecondaryButton onClick={() => navigate('/onboarding')}>
            {hasFitProfile ? "Update fit profile" : "Set up fit profile"}
          </HeroSecondaryButton>
        </HeroButtons>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;

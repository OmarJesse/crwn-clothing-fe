import { useNavigate } from 'react-router-dom';
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
          Discover premium fashion that speaks to your unique personality.
          Curated collections for the modern trendsetter.
        </HeroSubtitle>
        
        <HeroButtons>
          <HeroButton onClick={() => navigate('/shop')}>
            Shop Now
          </HeroButton>
          <HeroSecondaryButton onClick={() => navigate('/shop')}>
            Explore Collections
          </HeroSecondaryButton>
        </HeroButtons>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;

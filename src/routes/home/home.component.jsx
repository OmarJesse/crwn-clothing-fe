import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Hero from "../../components/hero/hero.component";
import Directory from "../../components/directory/directory.component";
import Button from "../../components/button/button.component";
import { getCategories } from "../../store/network/category";
import { getRecommendedSize } from "../../utils/size-recommendation";
import { scoreProductStyle, scoreProductPreferences } from "../../utils/product-style-match";
import { getBucketLabel } from "../../utils/style-inference";
import {
  surface,
  elevated,
  textPrimary,
  textSecondary,
  borderSubtle,
  primary,
  primaryDark,
  alpha,
} from "../../styles/style-helpers";
import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  color: ${({ theme }) => textPrimary(theme)};
`;

const IntroStrip = styled.section`
  display: grid;
  gap: 0.85rem;
  max-width: 1200px;
  margin: 0 auto;
  width: min(100%, 1200px);
  padding: 1.15rem 1.25rem;
  border-radius: 1.25rem;
  border: 1px solid ${({ theme }) => borderSubtle(theme)};
  background: ${({ theme }) => surface(theme)};
  box-shadow: 0 12px 30px ${({ theme }) => alpha("#0f172a", 0.06)};

  h2 {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    font-size: clamp(1.2rem, 2vw, 1.7rem);
    color: ${({ theme }) => textPrimary(theme)};
  }

  p {
    margin: 0;
    max-width: 62ch;
    color: ${({ theme }) => textSecondary(theme)};
    line-height: 1.6;
  }
`;

const HomeGrid = styled.section`
  max-width: none;
  margin: 0 auto;
  width: 100%;
  display: grid;
  gap: 1rem;
`;

const RecommendationSection = styled.section`
  display: grid;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 1.5rem;
  background: ${({ theme }) => surface(theme)};
  border: 1px solid ${({ theme }) => borderSubtle(theme)};
  box-shadow: 0 18px 40px ${({ theme }) => alpha("#0f172a", 0.08)};
`;

const RecommendationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const RecommendationBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.36rem 0.7rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => primary(theme)}33;
  background: ${({ theme }) => primary(theme)}14;
  color: ${({ theme }) => primaryDark(theme)};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
`;

const RecommendationTitle = styled.h3`
  margin: 0.35rem 0 0;
  font-family: 'Poppins', sans-serif;
  font-size: clamp(1.35rem, 2vw, 2rem);
  color: ${({ theme }) => textPrimary(theme)};
`;

const RecommendationSubtitle = styled.p`
  margin: 0.35rem 0 0;
  color: ${({ theme }) => textSecondary(theme)};
  max-width: 70ch;
`;

const RecommendationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
`;

const RecommendationCard = styled.button`
  text-align: left;
  border: 1px solid ${({ theme }) => borderSubtle(theme)};
  border-radius: 1.25rem;
  overflow: hidden;
  background: ${({ theme }) => surface(theme)};
  color: ${({ theme }) => textPrimary(theme)};
  box-shadow: 0 10px 24px ${({ theme }) => alpha("#0f172a", 0.06)};
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: ${({ theme }) => primary(theme)}55;
    box-shadow: 0 18px 36px ${({ theme }) => alpha("#0f172a", 0.12)};
  }
`;

const RecommendationImage = styled.div`
  position: relative;
  padding-top: 72%;
  background: ${({ theme }) => elevated(theme)};

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RecommendationCardBody = styled.div`
  display: grid;
  gap: 0.45rem;
  padding: 1rem;

  h4 {
    margin: 0;
    color: ${({ theme }) => textPrimary(theme)};
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
  }

  p {
    margin: 0;
    color: ${({ theme }) => textSecondary(theme)};
    font-size: 0.9rem;
  }
`;

const RecommendationPills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const RecommendationPill = styled.span`
  padding: 0.28rem 0.55rem;
  border-radius: 999px;
  background: ${({ theme, tone }) =>
    tone === "accent" ? `${primary(theme)}14` : elevated(theme)};
  color: ${({ theme, tone }) =>
    tone === "accent" ? primaryDark(theme) : textSecondary(theme)};
  border: 1px solid ${({ theme, tone }) =>
    tone === "accent" ? `${primary(theme)}33` : borderSubtle(theme)};
  font-size: 0.74rem;
  font-weight: 700;
`;

const EmptyState = styled.div`
  padding: 1rem 0;
  color: ${({ theme }) => textSecondary(theme)};
`;

const Home = () => {
  const navigate = useNavigate();
  const bodyProfile = useSelector((state) => state.user.bodyProfile);
  const styleProfile = useSelector((state) => state.user.styleProfile);
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const recommendedProducts = useMemo(() => {
    const categories = data?.categories || [];
    const prefs = {
      preferredStyles: bodyProfile?.preferredStyles,
      preferredPalettes: bodyProfile?.preferredPalettes,
    };
    const flattened = categories.flatMap((category) =>
      (category.products || []).map((product) => ({
        ...product,
        categoryName: category.name,
        recommendation: getRecommendedSize(product, bodyProfile),
        styleMatch: scoreProductStyle(product, styleProfile),
        prefsMatch: scoreProductPreferences(product, prefs),
      }))
    );

    return flattened
      .map((product) => ({
        ...product,
        score:
          0.4 * (product.recommendation?.confidence || 0) +
          0.25 * (product.styleMatch?.score || 0) +
          0.25 * (product.prefsMatch?.score || 0) +
          (product.recommendation?.recommendedSize ? 0.1 : 0),
      }))
      .sort((left, right) => right.score - left.score)
      .slice(0, 4);
  }, [bodyProfile, styleProfile, data]);

  const hasRecommendations = Boolean(bodyProfile) && recommendedProducts.length > 0;
  const paletteLabel = styleProfile ? getBucketLabel(styleProfile.paletteBucket) : null;

  return (
    <HomeContainer>
      <IntroStrip>
        <h2>Modern shopping built around fit.</h2>
        <p>
          Clean surfaces, soft borders, and product recommendations tuned to your profile.
        </p>
      </IntroStrip>
      <HomeGrid>
        <RecommendationSection>
          <RecommendationHeader>
            <div>
              <RecommendationBadge>
                {bodyProfile ? "Picked for you" : "Set your profile"}
              </RecommendationBadge>
              <RecommendationTitle>
                {bodyProfile ? "Picked for you" : "Recommended products will appear here"}
              </RecommendationTitle>
              <RecommendationSubtitle>
                {bodyProfile
                  ? styleProfile
                    ? `Ranked by your size, fit, and your ${paletteLabel?.toLowerCase()} palette${
                        styleProfile.silhouette ? ` & ${styleProfile.silhouette} silhouette` : ""
                      }.`
                    : "Ranked by your measurements, preferred fit, and product size charts."
                  : "Complete onboarding to unlock personalized sizing and product ranking across the catalog."}
              </RecommendationSubtitle>
            </div>
            <Button type="button" onClick={() => navigate(bodyProfile ? "/shop" : "/onboarding")}>
              {bodyProfile ? "Browse all products" : "Start fit profile"}
            </Button>
          </RecommendationHeader>

          {hasRecommendations ? (
            <RecommendationGrid>
              {recommendedProducts.map((product) => {
                const recommendation = product.recommendation || {};

                return (
                  <RecommendationCard key={product.id} onClick={() => navigate(`/shop/${product.categoryName?.toLowerCase()}`)}>
                    <RecommendationImage>
                      <img src={product.imageUrl} alt={product.name} />
                    </RecommendationImage>
                    <RecommendationCardBody>
                      <RecommendationPills>
                        <RecommendationPill tone="accent">
                          Fit {recommendation.recommendedSize || "—"}
                        </RecommendationPill>
                        <RecommendationPill>{product.categoryName}</RecommendationPill>
                        {recommendation.confidence ? (
                          <RecommendationPill>{Math.round(recommendation.confidence * 100)}% size</RecommendationPill>
                        ) : null}
                        {product.styleMatch?.score ? (
                          <RecommendationPill>
                            {Math.round(product.styleMatch.score * 100)}% style
                          </RecommendationPill>
                        ) : null}
                      </RecommendationPills>
                      <h4>{product.name}</h4>
                      <p>${product.price}</p>
                    </RecommendationCardBody>
                  </RecommendationCard>
                );
              })}
            </RecommendationGrid>
          ) : (
            <EmptyState>
              No recommendations yet. Add your measurements to get a ranked product list.
            </EmptyState>
          )}
        </RecommendationSection>

        <Hero />
        <Directory />
      </HomeGrid>
    </HomeContainer>
  );
};

export default Home;

import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./category-preview.styles.jsx";
import ProductCard from "../product-card/product-card.component";
import { getRecommendedSize } from "../../utils/size-recommendation";
import {
  CategoryPreviewContainer,
  CategoryPreviewTitle,
  Preview,
  CategoryMeta,
  CategoryCountPill,
} from "./category-preview.styles";

const CategoryPreview = ({ category }) => {
  const { name, products } = category || {};
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const bodyProfile = useSelector((state) => state.user.bodyProfile);

  const fitMatchCount = useMemo(() => {
    if (!bodyProfile || !products) return 0;
    return products.filter((product) => {
      const rec = getRecommendedSize(product, bodyProfile);
      return Boolean(rec?.recommendedSize) && (rec.confidence ?? 0) > 0.55;
    }).length;
  }, [products, bodyProfile]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const observedNode = containerRef.current;
    if (observedNode) observer.observe(observedNode);
    return () => {
      if (observedNode) observer.unobserve(observedNode);
    };
  }, []);

  return (
    <CategoryPreviewContainer ref={containerRef} isVisible={isVisible}>
      <CategoryMeta>
        <h2>
          <CategoryPreviewTitle to={`/shop/${name}`}>
            {name?.toUpperCase()}
          </CategoryPreviewTitle>
        </h2>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          <CategoryCountPill>{products?.length || 0} items</CategoryCountPill>
          {bodyProfile && fitMatchCount > 0 ? (
            <CategoryCountPill style={{ background: "rgba(16, 185, 129, 0.12)", color: "#047857", borderColor: "rgba(16, 185, 129, 0.25)" }}>
              ✓ {fitMatchCount} fit your size
            </CategoryCountPill>
          ) : null}
        </div>
      </CategoryMeta>
      <Preview>
        {products?.slice(0, 4).map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;

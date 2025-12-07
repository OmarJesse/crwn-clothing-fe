import { useEffect, useRef, useState } from "react";
import "./category-preview.styles.jsx";
import ProductCard from "../product-card/product-card.component";
import {
  CategoryPreviewContainer,
  CategoryPreviewTitle,
  Preview,
} from "./category-preview.styles";

const CategoryPreview = ({ category }) => {
  const { name, id, products } = category || {};
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

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

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <CategoryPreviewContainer ref={containerRef} isVisible={isVisible}>
      <h2>
        <CategoryPreviewTitle to={`/shop/${name}`}>
          {name?.toUpperCase()}
        </CategoryPreviewTitle>
      </h2>
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

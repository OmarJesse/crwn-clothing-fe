import { useEffect, useState } from 'react';
import {
  QuickViewOverlay,
  QuickViewModal,
  CloseButton,
  ProductImageSection,
  ProductImage,
  ImageThumbnails,
  Thumbnail,
  ProductDetailsSection,
  ProductName,
  ProductPrice,
  ProductDescription,
  RecommendationPanel,
  RecommendationTitle,
  RecommendationStats,
  RecommendationChip,
  FitHint,
  SizeSelector,
  SizeOption,
  QuantitySelector,
  QuantityButton,
  QuantityDisplay,
  ActionButtons,
  AddToCartButton,
  WishlistButton,
  ProductBadge,
  ZoomButton,
} from './quick-view.styles';
import { getRecommendedSize } from '../../utils/size-recommendation.js';
import { useSelector } from 'react-redux';

const QuickView = ({ product, onClose, onAddToCart }) => {
  const { bodyProfile } = useSelector((state) => state.user);
  const recommendation = product?.recommendation?.recommendedSize
    ? product.recommendation
    : getRecommendedSize(product, bodyProfile);
  const recommendedSize = recommendation.recommendedSize;
  const reasonTags = recommendation.reasonTags || [];
  const [selectedSize, setSelectedSize] = useState(() => recommendedSize || 'M');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const images = [product.imageUrl]; // In real app, would have multiple images

  useEffect(() => {
    setSelectedSize(recommendedSize || 'M');
  }, [recommendedSize, product?.id]);

  const handleAddToCart = () => {
    onAddToCart?.(product, quantity, selectedSize);
    if (window.showToast && window.triggerConfetti) {
      window.showToast(`${product.name} added to cart! 🎉`, 'success');
      window.triggerConfetti();
    }
    setTimeout(() => onClose(), 1000);
  };

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  return (
    <QuickViewOverlay onClick={onClose}>
      <QuickViewModal onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>✕</CloseButton>
        
        {product.isNew && <ProductBadge type="new">New</ProductBadge>}
        {product.sale && <ProductBadge type="sale">Sale</ProductBadge>}

        <ProductImageSection>
          <ProductImage 
            src={product.imageUrl} 
            alt={product.name}
            isZoomed={isZoomed}
          />
          <ZoomButton onClick={() => setIsZoomed(!isZoomed)}>
            {isZoomed ? '🔍-' : '🔍+'}
          </ZoomButton>
          {images.length > 1 && (
            <ImageThumbnails>
              {images.map((img, index) => (
                <Thumbnail
                  key={index}
                  src={img}
                  alt={`View ${index + 1}`}
                  isSelected={selectedImage === index}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </ImageThumbnails>
          )}
        </ProductImageSection>

        <ProductDetailsSection>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>${product.price}</ProductPrice>
          
          <ProductDescription>
            Premium quality clothing item. Made with the finest materials for ultimate comfort and style.
          </ProductDescription>

          {recommendedSize && (
            <RecommendationPanel>
              <RecommendationTitle>Fit Profile Recommendation</RecommendationTitle>
              <RecommendationStats>
                <RecommendationChip>Recommended: {recommendedSize}</RecommendationChip>
                {recommendation?.confidence ? (
                  <RecommendationChip>Confidence: {Math.round(recommendation.confidence * 100)}%</RecommendationChip>
                ) : null}
                {(recommendation?.alternates || []).map((altSize) => (
                  <RecommendationChip key={altSize}>Alt: {altSize}</RecommendationChip>
                ))}
              </RecommendationStats>
              {recommendation.explanation ? <FitHint>{recommendation.explanation}</FitHint> : null}
              {reasonTags.length > 0 ? (
                <RecommendationStats>
                  {reasonTags.map((reason) => (
                    <RecommendationChip key={reason.code || reason.label} tone="accent">
                      {reason.label}
                    </RecommendationChip>
                  ))}
                </RecommendationStats>
              ) : null}
            </RecommendationPanel>
          )}

          <SizeSelector>
            <label>Size:</label>
            <div>
              {sizes.map((size) => (
                <SizeOption
                  key={size}
                  isSelected={selectedSize === size}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                  {size === recommendedSize ? ' *' : ''}
                </SizeOption>
              ))}
            </div>
          </SizeSelector>

          <QuantitySelector>
            <label>Quantity:</label>
            <div>
              <QuantityButton onClick={() => handleQuantityChange(-1)}>
                −
              </QuantityButton>
              <QuantityDisplay>{quantity}</QuantityDisplay>
              <QuantityButton onClick={() => handleQuantityChange(1)}>
                +
              </QuantityButton>
            </div>
          </QuantitySelector>

          <ActionButtons>
            <AddToCartButton onClick={handleAddToCart}>
              Add to Cart
            </AddToCartButton>
            <WishlistButton onClick={() => window.showToast?.('Added to wishlist ❤️', 'info')}>
              ❤️
            </WishlistButton>
          </ActionButtons>
        </ProductDetailsSection>
      </QuickViewModal>
    </QuickViewOverlay>
  );
};

export default QuickView;

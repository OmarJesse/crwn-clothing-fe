import { useState } from "react";
import {
  Name,
  Price,
  Footer,
  ProductCardContainer,
  QuickViewButton,
  CardImageWrapper,
  AdminActionBar,
  AdminButton,
  SizeBadge,
  RecommendationMeta,
  RecommendationChip,
} from "./product-card.styles.jsx";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import QuickView from "../quick-view/quick-view.component";
import DeleteModal from "../delete-modal/delete-modal.component";
import { addToCart } from "../../store/cart/cart.action.js";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector.js";
import { ReactComponent as DefaultProuctImage } from "../../assets/default-product-image.svg";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../store/network/category.js";
import { useMutation } from "@tanstack/react-query";
import queryClient from "../../queryClient.js";
import { getRecommendedSize } from "../../utils/size-recommendation.js";

const seedFor = (product) =>
  (product?.id || product?.name || "default")
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-");

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const [showQuickView, setShowQuickView] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [fallbackLevel, setFallbackLevel] = useState(0);
  const fallbackPicsum = `https://picsum.photos/seed/${seedFor(product)}/600/800`;
  const sourceUrl =
    fallbackLevel === 0 ? imageUrl : fallbackLevel === 1 ? fallbackPicsum : null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const { currentUser, bodyProfile } = useSelector((state) => state.user);
  const isAdmin = currentUser?.role === "admin";
  const recommendation = getRecommendedSize(product, bodyProfile);
  const reasonTags = recommendation.reasonTags || [];
  
  const addProductToCart = (quantity = 1, sizeOverride) => {
    dispatch(addToCart(cartItems, { ...product, size: sizeOverride || recommendation.recommendedSize }, quantity));
    if (window.showToast && window.triggerConfetti) {
      window.showToast(`${product.name} added to cart! 🎉`, 'success');
      window.triggerConfetti();
    }
  };

  const { mutateAsync } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      setShowDeleteModal(false);
      if (window.showToast) {
        window.showToast('Product deleted successfully! 🗑️', 'success');
      }
      if (window.triggerConfetti) {
        window.triggerConfetti();
      }
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
      if (window.showToast) {
        window.showToast('Failed to delete product. Please try again.', 'error');
      }
    }
  });

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    mutateAsync(product.id);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    navigate(`/product/${product.id}/edit`);
  };

  const goToDetail = () => {
    if (!isAdmin) navigate(`/product/${product.id}`);
  };

  const stopAndQuickView = (e) => {
    e.stopPropagation();
    setShowQuickView(true);
  };

  return (
    <>
      <ProductCardContainer>
        <CardImageWrapper
          onClick={goToDetail}
          style={!isAdmin ? { cursor: "pointer" } : undefined}
        >
          {recommendation.recommendedSize && !isAdmin && (
            <SizeBadge>Fit {recommendation.recommendedSize}</SizeBadge>
          )}
          {sourceUrl ? (
            <img
              key={sourceUrl}
              src={sourceUrl}
              alt={`${name}`}
              onError={() => setFallbackLevel((level) => level + 1)}
              loading="lazy"
            />
          ) : (
            <DefaultProuctImage alt={`${name}`} />
          )}
          {!isAdmin && (
            <QuickViewButton onClick={stopAndQuickView}>
              Quick View 👁️
            </QuickViewButton>
          )}
          {recommendation.recommendedSize && !isAdmin && (
            <RecommendationMeta>
              {typeof recommendation.confidence === "number" ? (
                <RecommendationChip tone="accent">
                  {Math.round(recommendation.confidence * 100)}% match
                </RecommendationChip>
              ) : null}
              {recommendation.explanation ? (
                <RecommendationChip>
                  {recommendation.explanation.length > 28
                    ? `${recommendation.explanation.slice(0, 28)}...`
                    : recommendation.explanation}
                </RecommendationChip>
              ) : null}
              {reasonTags.slice(0, 2).map((reason) => (
                <RecommendationChip key={reason.code || reason.label} tone="info">
                  {reason.label}
                </RecommendationChip>
              ))}
            </RecommendationMeta>
          )}
        </CardImageWrapper>
        <Footer
          onClick={!isAdmin ? goToDetail : undefined}
          style={!isAdmin ? { cursor: "pointer" } : undefined}
        >
          <Name>{name}</Name>
          <Price>${price}</Price>
        </Footer>
        
        {isAdmin && (
          <AdminActionBar>
            <AdminButton 
              variant="edit"
              data-tooltip="Edit Product"
              onClick={handleEditClick}
            >
              ✏️
            </AdminButton>
            <AdminButton 
              variant="delete"
              data-tooltip="Delete Product"
              onClick={handleDeleteClick}
            >
              ✕
            </AdminButton>
          </AdminActionBar>
        )}
        
        <Button
          className="add-to-cart-button"
          buttonType={BUTTON_TYPE_CLASSES.inverted}
          onClick={
            isAdmin
              ? () => navigate(`/product/${product?.id}/edit`)
              : () => addProductToCart()
          }
        >
          {isAdmin ? "Edit" : "Add to cart"}
        </Button>
      </ProductCardContainer>

      {showQuickView && (
        <QuickView
          product={product}
          onClose={() => setShowQuickView(false)}
          onAddToCart={(product, quantity, selectedSize) =>
            addProductToCart(quantity, selectedSize)
          }
        />
      )}

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        product={product}
      />
    </>
  );
};

export default ProductCard;

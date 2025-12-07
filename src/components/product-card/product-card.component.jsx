import { useState } from "react";
import {
  Name,
  Price,
  Footer,
  ProductCardContainer,
  QuickViewButton,
  CardImageWrapper,
  AdminActionBar,
  AdminButton
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

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const [showQuickView, setShowQuickView] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const { currentUser } = useSelector((state) => state.user);
  const isAdmin = currentUser?.role === "admin";
  
  const addProductToCart = () => {
    dispatch(addToCart(cartItems, product));
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

  return (
    <>
      <ProductCardContainer>
        <CardImageWrapper>
          {imageUrl ? (
            <img src={imageUrl} alt={`${name}`} />
          ) : (
            <DefaultProuctImage alt={`${name}`} />
          )}
          {!isAdmin && (
            <QuickViewButton onClick={() => setShowQuickView(true)}>
              Quick View 👁️
            </QuickViewButton>
          )}
        </CardImageWrapper>
        <Footer>
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
          buttonType={BUTTON_TYPE_CLASSES.inverted}
          onClick={
            isAdmin
              ? () => navigate(`/product/${product?.id}/edit`)
              : addProductToCart
          }
        >
          {isAdmin ? "Edit" : "Add to cart"}
        </Button>
      </ProductCardContainer>

      {showQuickView && (
        <QuickView
          product={product}
          onClose={() => setShowQuickView(false)}
          onAddToCart={(product) => addProductToCart()}
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

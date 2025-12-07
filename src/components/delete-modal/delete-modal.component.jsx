import React from 'react';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalIcon,
  ModalTitle,
  ModalMessage,
  ProductInfo,
  ProductImage,
  ProductName,
  ButtonGroup,
  ConfirmButton,
  CancelButton
} from './delete-modal.styles';

const DeleteModal = ({ isOpen, onClose, onConfirm, product }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalIcon>⚠️</ModalIcon>
          <ModalTitle>Delete Product?</ModalTitle>
        </ModalHeader>

        <ModalMessage>
          This action cannot be undone. The product will be permanently removed from your store.
        </ModalMessage>

        {product && (
          <ProductInfo>
            <ProductImage src={product.imageUrl} alt={product.name} />
            <ProductName>{product.name}</ProductName>
          </ProductInfo>
        )}

        <ButtonGroup>
          <CancelButton onClick={onClose}>
            Cancel
          </CancelButton>
          <ConfirmButton onClick={onConfirm}>
            Delete Product
          </ConfirmButton>
        </ButtonGroup>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default DeleteModal;

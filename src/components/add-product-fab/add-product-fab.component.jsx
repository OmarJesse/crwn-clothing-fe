import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FABButton, FABTooltip } from './add-product-fab.styles';

const AddProductFAB = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/product/add');
    if (window.showToast) {
      window.showToast('Create a new product ✨', 'info');
    }
  };

  return (
    <>
      <FABButton onClick={handleClick} data-tooltip="Add Product">
        +
      </FABButton>
    </>
  );
};

export default AddProductFAB;

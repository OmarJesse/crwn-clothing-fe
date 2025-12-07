import { CartItemContainer, Name, ItemDetails, PriceInfo } from "./cart-item.styles";

const CartItem = ({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <Name>{name}</Name>
        <PriceInfo>
          <span>Qty: {quantity}</span>
          <span>${price * quantity}</span>
        </PriceInfo>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;

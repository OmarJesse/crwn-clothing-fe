import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import {
  CartDropDownContainer,
  CartItems,
  EmptyMessage,
  CartHeader,
  CloseButton,
  CartOverlay,
} from "./cart-dropdown.styles";
import { selectCartItems, selectIsCartOpen } from "../../store/cart/cart.selector";
import { setIsOpen } from "../../store/cart/cart.action";

const CartDropDown = () => {
  const cartItems = useSelector(selectCartItems);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const closeCart = () => dispatch(setIsOpen(false));
  
  const goToCheckout = () => {
    navigate("/checkout");
    closeCart();
  };

  return (
    <>
      <CartOverlay isOpen={isCartOpen} onClick={closeCart} />
      <CartDropDownContainer isOpen={isCartOpen}>
        <CartHeader>
          <h2>Your Cart</h2>
          <CloseButton onClick={closeCart}>×</CloseButton>
        </CartHeader>

        <CartItems>
          {!cartItems?.length ? (
            <EmptyMessage>Your cart is empty</EmptyMessage>
          ) : (
            cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
          )}
        </CartItems>

        {cartItems?.length > 0 && (
          <Button onClick={goToCheckout}>CHECKOUT</Button>
        )}
      </CartDropDownContainer>
    </>
  );
};
export default CartDropDown;

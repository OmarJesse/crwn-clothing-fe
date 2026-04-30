import {
  CheckoutItemContainer,
  ImageContainer,
  Name,
  Size,
  Quentity,
  Arrow,
  Value,
  Price,
  RemoveButton,
} from "./chechout-item.styles";
import {
  deleteItem,
  addToCart,
  removeFromCart,
} from "../../store/cart/cart.action";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { getRecommendedSize } from "../../utils/size-recommendation";

const fitChip = {
  display: "inline-block",
  marginLeft: "0.4rem",
  padding: "0.15rem 0.5rem",
  borderRadius: "999px",
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "0.02em",
};

const matchChip = {
  ...fitChip,
  background: "rgba(16, 185, 129, 0.14)",
  color: "#047857",
  border: "1px solid rgba(16, 185, 129, 0.25)",
};

const warnChip = {
  ...fitChip,
  background: "rgba(234, 179, 8, 0.14)",
  color: "#854d0e",
  border: "1px solid rgba(234, 179, 8, 0.3)",
};

const CheckoutItem = ({ cartItem }) => {
  const { quantity, name, imageUrl, price, size } = cartItem;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const bodyProfile = useSelector((state) => state.user.bodyProfile);
  const recommendation = getRecommendedSize(cartItem, bodyProfile);
  const recommended = recommendation?.recommendedSize;
  const matches = recommended && size && recommended === size;
  const differs = recommended && size && recommended !== size;

  const clearItemHandler = () => dispatch(deleteItem(cartItems, cartItem));
  const addItemHandler = () => dispatch(addToCart(cartItems, cartItem));
  const removeItemHandler = () => dispatch(removeFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <Name>{name}</Name>
      <Size>
        {size || "N/A"}
        {recommended ? (
          matches ? (
            <span style={matchChip}>✓ fit</span>
          ) : differs ? (
            <span style={warnChip}>rec. {recommended}</span>
          ) : null
        ) : null}
      </Size>
      <Quentity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quentity>
      <Price>{price}</Price>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;

import { useSelector } from "react-redux";
import { CartItemContainer, Name, ItemDetails, PriceInfo } from "./cart-item.styles";
import { getRecommendedSize } from "../../utils/size-recommendation";

const chipStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.25rem",
  padding: "0.18rem 0.55rem",
  borderRadius: "999px",
  fontSize: "0.7rem",
  fontWeight: 600,
  letterSpacing: "0.02em",
};

const matchChipStyle = {
  ...chipStyle,
  background: "rgba(16, 185, 129, 0.18)",
  color: "#34D399",
  border: "1px solid rgba(16, 185, 129, 0.3)",
};

const warnChipStyle = {
  ...chipStyle,
  background: "rgba(234, 179, 8, 0.18)",
  color: "#fbbf24",
  border: "1px solid rgba(234, 179, 8, 0.3)",
};

const CartItem = ({ cartItem }) => {
  const { name, quantity, imageUrl, price, size } = cartItem;
  const bodyProfile = useSelector((state) => state.user.bodyProfile);
  const recommendation = getRecommendedSize(cartItem, bodyProfile);
  const recommended = recommendation?.recommendedSize;
  const matches = recommended && size && recommended === size;
  const differs = recommended && size && recommended !== size;

  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <Name>{name}</Name>
        <span style={{ display: "flex", gap: "0.4rem", alignItems: "center", flexWrap: "wrap", fontSize: "0.8rem" }}>
          <span>Size: {size || "N/A"}</span>
          {recommended ? (
            matches ? (
              <span style={matchChipStyle}>✓ your fit</span>
            ) : differs ? (
              <span style={warnChipStyle}>recommended {recommended}</span>
            ) : (
              <span style={matchChipStyle}>fit {recommended}</span>
            )
          ) : null}
        </span>
        <PriceInfo>
          <span>Qty: {quantity}</span>
          <span>${price * quantity}</span>
        </PriceInfo>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;

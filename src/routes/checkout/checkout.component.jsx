import {
  CheckoutContainer,
  ItemsColumn,
  SummaryColumn,
  SummaryCard,
  CheckoutTitle,
  CheckoutSubtitle,
  CheckoutHeader,
  HeaderBlock,
  Total,
  SummaryHeader,
  SummaryLine,
  Divider,
  FitStatusWrap,
  FitStatusChip,
  EmptyState,
} from "./checkout.styles";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import { getRecommendedSize } from "../../utils/size-recommendation";
import PaymentForm from "../../components/payment-form/payment-form.component";

const Checkout = () => {
  const total = useSelector(selectCartTotal);
  const cartItems = useSelector(selectCartItems);
  const bodyProfile = useSelector((state) => state.user.bodyProfile);
  const itemsWithSize = cartItems.filter((item) => item.size).length;
  const quantityTotal = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

  const fitSummary = useMemo(() => {
    if (!bodyProfile) return null;
    let matches = 0;
    let differs = 0;
    cartItems.forEach((item) => {
      const recommended = getRecommendedSize(item, bodyProfile)?.recommendedSize;
      if (!recommended || !item.size) return;
      if (recommended === item.size) matches++;
      else differs++;
    });
    return { matches, differs };
  }, [cartItems, bodyProfile]);

  return (
    <CheckoutContainer>
      <ItemsColumn>
        <CheckoutTitle>Your Checkout</CheckoutTitle>
        <CheckoutSubtitle>
          Review your selected sizes and quantities before payment.
        </CheckoutSubtitle>
        <CheckoutHeader>
          <HeaderBlock>Image</HeaderBlock>
          <HeaderBlock>Product</HeaderBlock>
          <HeaderBlock>Size</HeaderBlock>
          <HeaderBlock>Quantity</HeaderBlock>
          <HeaderBlock>Price</HeaderBlock>
          <HeaderBlock>Remove</HeaderBlock>
        </CheckoutHeader>

        {cartItems.length === 0 ? (
          <EmptyState>Your cart is empty. Pick something out and we'll size it for you.</EmptyState>
        ) : (
          cartItems.map((cartItem) => (
            <CheckoutItem key={`${cartItem.id}-${cartItem.size || "na"}`} cartItem={cartItem} />
          ))
        )}
      </ItemsColumn>

      <SummaryColumn>
        <SummaryCard>
          <SummaryHeader>Order summary</SummaryHeader>
          <SummaryLine>
            <span>Items</span>
            <span>{quantityTotal}</span>
          </SummaryLine>
          <SummaryLine>
            <span>With selected size</span>
            <span>{itemsWithSize}</span>
          </SummaryLine>
          {bodyProfile ? (
            <SummaryLine>
              <span>Fit profile</span>
              <FitStatusWrap>
                <FitStatusChip tone="success">Ready</FitStatusChip>
                {bodyProfile.preferredFit ? (
                  <FitStatusChip tone="accent">{bodyProfile.preferredFit}</FitStatusChip>
                ) : null}
                {bodyProfile.confidence ? (
                  <FitStatusChip tone="accent">
                    {Math.round(bodyProfile.confidence * 100)}%
                  </FitStatusChip>
                ) : null}
              </FitStatusWrap>
            </SummaryLine>
          ) : null}
          {fitSummary && (fitSummary.matches > 0 || fitSummary.differs > 0) ? (
            <SummaryLine>
              <span>Size match</span>
              <FitStatusWrap>
                {fitSummary.differs === 0 ? (
                  <FitStatusChip tone="success">All match ✓</FitStatusChip>
                ) : (
                  <>
                    <FitStatusChip tone="success">{fitSummary.matches} match</FitStatusChip>
                    <FitStatusChip tone="accent">{fitSummary.differs} differ</FitStatusChip>
                  </>
                )}
              </FitStatusWrap>
            </SummaryLine>
          ) : null}
          <Divider />
          <Total>
            <span>Total</span>
            <span>${total}</span>
          </Total>
        </SummaryCard>

        <SummaryCard>
          <SummaryHeader>Payment</SummaryHeader>
          <PaymentForm />
        </SummaryCard>
      </SummaryColumn>
    </CheckoutContainer>
  );
};

export default Checkout;

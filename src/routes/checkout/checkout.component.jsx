import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import styled from "styled-components";

import PaymentForm from "../../components/payment-form/payment-form.component";

const PageWrapper = styled.div`
  margin-top: 130px;
  padding: 2rem;
  min-height: calc(100vh - 130px);

  @media (max-width: 968px) {
    margin-top: 105px;
    padding: 1.5rem;
  }
`;
const Checkout = () => {
  const total = useSelector(selectCartTotal);
  const cartItems = useSelector(selectCartItems);

  return (
    <PageWrapper>
      <CheckoutContainer>
        <CheckoutHeader>
          <HeaderBlock>
            <span>Product</span>
          </HeaderBlock>
          <HeaderBlock>
            <span>Description</span>
          </HeaderBlock>
          <HeaderBlock>
            <span>Quantity</span>
          </HeaderBlock>
          <HeaderBlock>
            <span>Price</span>
          </HeaderBlock>
          <HeaderBlock>
            <span>Remove</span>
          </HeaderBlock>
        </CheckoutHeader>
        {cartItems.map((cartItem) => {
          return <CheckoutItem key={cartItem.id} cartItem={cartItem} />;
        })}
        <Total>Total: ${total}</Total>
        <PaymentForm />
      </CheckoutContainer>
    </PageWrapper>
  );
};
export default Checkout;

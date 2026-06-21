import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
} from "./payment-form.styles";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { stripePromise } from "../../utils/stripe/stripe.utils";

const PaymentFormInner = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessingPayment(true);
    try {
      // Create the PaymentIntent on our own API (axios prepends the configured
      // API base URL, so this works identically locally and on the deploy).
      const { data } = await axios.post("/payments/create-payment-intent", {
        amount: Math.round(amount * 100),
      });

      const clientSecret = data?.paymentIntent?.client_secret;
      if (!clientSecret) {
        throw new Error("Could not initialise the payment. Please try again.");
      }

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: currentUser?.name || currentUser?.email || "Guest",
          },
        },
      });

      if (paymentResult.error) {
        alert(paymentResult.error.message);
      } else if (paymentResult.paymentIntent?.status === "succeeded") {
        alert("Payment Successful!");
      }
    } catch (error) {
      alert(
        error?.response?.data?.error ||
          error?.message ||
          "Payment failed. Please try again."
      );
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <PaymentButton
          buttonType={BUTTON_TYPE_CLASSES.inverted}
          isLoading={isProcessingPayment}
          disabled={isProcessingPayment || !stripe}
        >
          Pay Now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

// The Stripe hooks (useStripe/useElements) only work inside an <Elements>
// provider — previously missing, which made the form silently no-op.
const PaymentForm = () => (
  <Elements stripe={stripePromise}>
    <PaymentFormInner />
  </Elements>
);

export default PaymentForm;

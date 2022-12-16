import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe('pk_test_51M9pCXCSjOrViVMJvb4FuSl2A4DldZqwyHj3PS9trxPooTHgzg2GgkEftV9xFigFxWZSdP7uThOzT6KapHGUsxNy00TPsU2oyk');

export default function StripeApp(props) {
  const { items } = props;
  const [clientSecret, setClientSecret] = React.useState("");
  
  // const params = {
  //   id: 1,
  //   units: 2,
  //   //amount: units * price,
  //   price: 50,
  // }

  // React.useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads
  //   fetch("/api/create-payment-intent", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(params),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setClientSecret(data.clientSecret));
  // }, []);
  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);
  const appearance = {
    theme: 'flat',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="StripeApp">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
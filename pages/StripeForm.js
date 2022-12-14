import React from "react";

import { CardCvcElement, CardExpiryElement, CardNumberElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


import CheckoutForm from "../components/CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const units = 2;
const price = 50;

const StripeForm = () => {



  const handleSubmit = async () => {

    console.log("hola2");
     const stripe = useStripe();
     const elements = useElements();
    // try {

    //   if (!stripe || !elements) {
    //     throw new Error('Stripe not detected. Please try again later.')
    //   }
       const cardElement = elements.getElement(CardNumberElement);

    //   if (!cardElement) {
    //     throw new Error('Card element not found')
    //   }

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    // if (error) {
    //   throw new Error(error.message ?? 'Error')
    // }

    const params = {
      id: 1,
      units: 2,
      amount: units * price,
      price: 50,
    }
    //console.log(params);

    const response = await fetch("/api/create-payment-intent", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });


    //const { status } = response

    const responseData = await response.json()
    console.log(responseData);

    //     if (status !== 200)
    //       throw new Error(responseData.message)

    //     if (responseData.status == "error") {
    //       throw new Error(responseData.message)
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }

  }


  return (
    <Elements stripe={stripePromise}>
      {/* <CheckoutForm/> */}
     
        <div >
          <div>
            <div >Card details</div>
            <div >Enter the 16-digit card number on the card</div>
          </div>
          <div>
            <span >Card number</span>
            <CardNumberElement />
          </div>
          <div >
            <div>
              <span >Expiration date</span>
              <CardExpiryElement />
            </div>
            <div>
              <span >Security code</span>
              <CardCvcElement />
            </div>
          </div>
        </div>
        {<button onClick={handleSubmit} >{units} pay {(price * units).toFixed(2)}</button>}
    
    </Elements>
  )
}



export default StripeForm


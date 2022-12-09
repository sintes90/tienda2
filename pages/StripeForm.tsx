import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CardNumberElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";

import { useState } from 'react';
import { useRouter } from 'next/router';




// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
//const stripePromise = loadStripe('pk_test_51M9pCXCSjOrViVMJvb4FuSl2A4DldZqwyHj3PS9trxPooTHgzg2GgkEftV9xFigFxWZSdP7uThOzT6KapHGUsxNy00TPsU2oyk');



const StripeForm = ({ units, price }) => {
 

    const handleOnSubmit = async (e) => {
        const stripe = useStripe();
        const elements = useElements();
        e.preventDefault();
      
        try {
          
            if (!stripe || !elements)
                throw new Error('Stripe not detected. Please try again later.')

            const cardElement = elements.getElement(CardNumberElement);

            if (!cardElement)
                throw new Error('Card element not found')

           
            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error)
            throw new Error(error.message ?? 'Error')
          
            const params = {
                id: paymentMethod.id,
                units: units,
                amount: units * price,
                price: price
            }

            console.log(params);
            
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            })
            
            const { status } = response

            const responseData = await response.json()


            if (status !== 200)
                throw new Error(responseData.message)

            if (responseData.status == "error") {
                throw new Error(responseData.message)
            }
        } catch (error) {
            console.log(error)
        }
           
    }



    return (
        <form onSubmit={handleOnSubmit}>
            <div >
                <div>
                    <div >Card details</div>
                    <div >Enter the 16-digit card number on the card</div>
                </div>
                <div>
                    <span >Card number</span>
                    
                </div>
                <div >
                    <div>
                        <span >Expiration date</span>
                       
                    </div>
                    <div>
                        <span >Security code</span>
                       
                    </div>
                </div>
            </div>
            {<button type='submit'>{units} pay {(price * units).toFixed(2)}</button>}
        </form>
    )
}



export default StripeForm


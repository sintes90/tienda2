import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import getStripe from '../lib/getStripe';


import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/stripe-js";
import {CheckoutForm} from "../components/CheckoutForm";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe('pk_test_51M9pCXCSjOrViVMJvb4FuSl2A4DldZqwyHj3PS9trxPooTHgzg2GgkEftV9xFigFxWZSdP7uThOzT6KapHGUsxNy00TPsU2oyk');


const Cart = () => {
  
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext();
  const [clientSecret, setClientSecret] = React.useState("");

  const handleCheckout = async () => {

    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });
    const data = await response.json();
    //etClientSecret(data.clientSecret);
    
    const appearance = {
      theme: 'stripe',
    };
    const options = {
      clientSecret,
      appearance,
    };
    
    return (
      <>
        <div className="Cart">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
      </>
    );
  }

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your cart is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="product" key={item.id}>
              <img src={item.image} className="cart-product-image" />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                    <p className="quantity-desc">
                      <span className="minus" onClick={() => toggleCartItemQuantity(item.id, 'dec')}><AiOutlineMinus /></span>
                      <span className="num" /*onClick=""*/>{item.quantity}</span>
                      <span className="plus" onClick={() => toggleCartItemQuantity(item.id, 'inc')}><AiOutlinePlus /></span>
                    </p>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button onClick={handleCheckout} type="button" className="btn" >
                Pay with Stripe 
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
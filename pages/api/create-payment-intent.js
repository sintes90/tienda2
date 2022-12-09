// This is your test secret API key.
const stripe = require("stripe")('sk_test_51M9pCXCSjOrViVMJkrRkoKU9KxcUY2yl7cykzqHMAFflvp0qnVMxVxAvkZ1gfttVy0izCrzQDTVEsAMB2dd8MPnB003VPzXDR2');

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

export default async function handler(req, res) {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
    
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
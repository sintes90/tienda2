const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    res.body = req.body;
    
  }
  console.log(res.body);

  res.status(200).json({ name: 'carrito recibido' });

}
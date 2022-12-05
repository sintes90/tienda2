const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  /*if (req.method === 'POST') {
    res.body = req.body;
  }
  
  console.log(res.body);

  res.status(200).json({ name: 'carrito recibido' });*/

  if (req.method === 'POST') {

    try {
      // Create Checkout Sessions from body params.
      
      const session = await stripe.checkout.sessions.create({
        line_items: req.body.map((item) => ({ 
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              images: [item.image],
            },
            unit_amount: item.price * 2,
          },
       
          //quantity: item.qty,
          quantity: 1,
        })),
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
        
      });
      
      //res.redirect(303, session.url);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
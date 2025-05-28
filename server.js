const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const stripe = require('stripe')('your_stripe_secret_key');
const admin = require('firebase-admin');
const serviceAccount = require('./firebaseServiceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Signup Email Handler (simulated)
app.post('/api/signup', async (req, res) => {
  const { email } = req.body;
  // You could connect this to Resend, Mailchimp, or Firebase Firestore
  console.log(`Received signup email: ${email}`);
  res.status(200).json({ message: 'Email received' });
});

// Create Stripe Checkout Session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{
        price: 'your_price_id',
        quantity: 1,
      }],
      success_url: 'https://your-frontend.com/thank-you',
      cancel_url: 'https://your-frontend.com/',
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create Stripe session' });
  }
});

// Stripe Webhook
app.post('/api/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
  const endpointSecret = 'your_webhook_secret';
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('Subscription successful:', session.customer_email);
    // Add to database or trigger welcome email here
  }

  res.json({ received: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

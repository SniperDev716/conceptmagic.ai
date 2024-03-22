const Stripe = require('stripe');
const Plan = require('../models/plan');
const Subscription = require('../models/subscription');
const User = require('../models/userModel');
const config = require('../config');
const stripe = new Stripe(config.STRIPE_SECRET_KEY);

exports.index = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, config.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`Stripe webhook signature verification failed: ${err.message}`);
    res.status(400).end();
    return;
  }

  console.log(event.type);
  if (event.type === 'invoice.payment_succeeded') {
    const subscription = await stripe.subscriptions.retrieve(event.data.object.subscription);
    await Subscription.findOneAndUpdate({
      stripeId: subscription.id
    }, {
      next_payment_at: subscription.current_period_end * 1000
    });
  } else if (event.type == 'customer.subscription.deleted') {
    console.log(event.data.object.id);
    const subscription = await Subscription.findOne({ stripeId: event.data.object.id });
    if (subscription) {
      const user = await User.findOne({ activeSubscriptionId: subscription._id });
      if (user && user.selectedSubscriptionId) {
        user.activeSubscriptionId = user.selectedSubscriptionId;
        const sub = await Subscription.findById(user.selectedSubscriptionId).populate('planId');
        user.plan = sub?.planId.plan;
        user.selectedSubscriptionId = null;
        await user.save();
      }
      await subscription.delete();
    }
  } else if (event.type === 'invoice.payment_failed') { 
    console.log(event, '----------')
  }
  return res.send('ok');
}
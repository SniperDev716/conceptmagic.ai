const Stripe = require('stripe');
const Plan = require('../models/plan');
const Subscription = require('../models/subscription');
const User = require('../models/userModel');
const config = require('../config');
const PlanModel = require('../models/plan');
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
  if (event.type === 'customer.subscription.updated') {
    console.log("[LOG]:customer.subscription.updated", event.data.object);
    const subscription = event.data.object;
    await Subscription.findOneAndUpdate(
      { stripeId: subscription.id },
      {
        $set: {
          ends_at: subscription.cancel_at,
          stripe_status: subscription.status,
        },
      },
    );
    if (subscription.trial_start && subscription.status === 'active') {
      let plan = await PlanModel.findOne({ slug: 'basic' });
      await Subscription.findOneAndUpdate(
        { stripeId: subscription.id },
        {
          $set: {
            planId: plan._id,
            trial_ends_at: null,
            next_payment_at: subscription.current_period_end * 1000,
          },
        },
      );
    }
  } else if (event.type === 'invoice.payment_succeeded') {
    const subscription = await stripe.subscriptions.retrieve(event.data.object.subscription);
    await Subscription.findOneAndUpdate({
      stripeId: subscription.id
    }, {
      next_payment_at: subscription.current_period_end * 1000
    });
  } else if (event.type == 'customer.subscription.deleted') {
    console.log("[LOG]:customer.subscription.deleted", event.data.object);
    const subscription = await Subscription.findOne({ stripeId: event.data.object.id });
    if (subscription) {
      const user = await User.findOne({ activeSubscriptionId: subscription._id });
      if (user && user.selectedSubscriptionId) {
        user.activeSubscriptionId = user.selectedSubscriptionId;
        // const sub = await Subscription.findById(user.selectedSubscriptionId).populate('planId');
        user.selectedSubscriptionId = null;
        await user.save();
      }
      if (user) {
        user.activeSubscriptionId = null;
        await user.save();
      }
      await subscription.delete();
    }
  } else if (event.type === 'invoice.payment_failed') {
    console.log("[LOG]:invoice.payment_failed", event.data.object);
  } else if (event.type === 'customer.subscription.trial_will_end') {
    const subscription = event.data.object;
    // console.log(subscription, subscription.metadata.admin, 'will end');
    // Cancel the subscription
    if (subscription.metadata.admin === 'true') {
      await stripe.subscriptions.update(subscription.id, {
        cancel_at_period_end: true,
      });
    }
  }
  return res.send('ok');
}
const Plan = require('../models/plan');
const mongoose = require('mongoose');
const config = require('../config');

mongoose
  .connect(config.MongoURL)
  .then(() => console.log('MONGODB connected!'))
  .catch(console.log);

async function run() {
  const plans = [
    {
      name: 'Free Demo',
      slug: 'Free',
      stripe_plan: 'price_1NJdTaHnQ3da7QZ3X8Tu2v93',
      price: 0,
      services: ['1 Property', '1 Document', '1 Team Member'],
      description: 'If you’re just testing out our software, it’s free!',
      plan: {
        property: 1,
        document: 1,
        teamMember: 1,
      },
    },
    {
      name: 'Personal',
      slug: 'Personal',
      stripe_plan: 'price_1NJdSqHnQ3da7QZ3Jt5TvKRi',
      price: 17,
      services: ['2 Properties', '3 Documents / Property', '1 Team Member'],
      description: 'For individuals with a single property to manage.',
      plan: {
        property: 2,
        document: 3,
        teamMember: 1,
      },
    },
    {
      name: 'Pro+',
      slug: 'Pro',
      stripe_plan: 'price_1NJdUAHnQ3da7QZ3DXGv21D4',
      price: 107,
      services: ['10 Properties', '5 Document / Property', '3 Team Members'],
      description: 'For landlords & family offices with multiple properties.',
      plan: {
        property: 7,
        document: 5,
        teamMember: 3,
      },
    },
    {
      name: 'Commercial',
      slug: 'Commercial',
      stripe_plan: 'price_1NJdUgHnQ3da7QZ35w3s2dT4',
      price: 507,
      services: ['25 Properties', '10 Documents / Property', '7 Team Members'],
      description: 'For commercial real estate management companies.',
      plan: {
        property: 25,
        document: 10,
        teamMember: 7,
      },
    },
  ];

  await Plan.deleteMany({});

  for (const plan of plans) {
    await new Plan(plan).save();
  }

  console.log('Plan seeder successfully.');
  mongoose.disconnect();
}

run();

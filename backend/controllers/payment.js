const stripe = require("stripe")(process.env.STRIPE_KEY);

// this function for payment when you click on checkout open window stripe payment to complete a payment

const paymentCheckout = async (req, res) => {
  const cart = req.body;

  const line_items = cart.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.img],
          description: item.description,
        },
        unit_amount: Math.ceil(item.price * 100),
      },
      quantity: 1,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.json({ url: session.url });
};

module.exports = { paymentCheckout };

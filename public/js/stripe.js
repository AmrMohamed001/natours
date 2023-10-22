const stripe = Stripe(
  'pk_test_51O3jM2FWNXXz9RxxJyKOHZ8rRtH9M3L6Q6GiwWtTp3jc6Te9Zw1VeVjB7gGr6PbSkLS688Ga84gmkVivaYqxOpIV00kAQ0nMkc'
);

export const bookTour = async (tourId) => {
  // 1) fetch the session
  const session = await axios.get(
    `/api/v1/booking//checkout-session/${tourId}`
  );
  console.log(session);
  //2) create checkout Form and charge the credit
  await stripe.redirectToCheckout({ sessionId: session.data.session.id });
};

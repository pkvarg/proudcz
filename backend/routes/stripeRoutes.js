import express from 'express'
import stripe from 'stripe'
import Email from '../utils/email.js'

const router = express.Router()

const createStripe = async (req, res) => {
  const { products, email, url, initPaymentId, shippingPrice } =
    req.body.requestBody
  console.log('stripe', url, initPaymentId, shippingPrice)

  try {
    const lineItems = products.map((product) => {
      const item = {
        price: product.price,
        name: product.name,
        quantity: product.qty,
      }
      return {
        price_data: {
          currency: 'czk',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },

        quantity: item.quantity,
      }
    })

    const session = await stripe(
      process.env.STRIPE_SECRET_KEY
    ).checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      mode: 'payment',
      // success_url: `https://proud.pictusweb.site${url.pathname}/stripe-success/${initPaymentId}`,
      // cancel_url: `https://proud.pictusweb.site${url.pathname}/stripe-fail`,
      success_url: `http://localhost:3000${url.pathname}/stripe-success/${initPaymentId}`,
      cancel_url: `http://localhost:3000${url.pathname}/stripe-fail`,
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: shippingPrice * 100, currency: 'czk' },
            display_name: 'Poštovné a balné',
          },
        },
      ],
      line_items: lineItems,
    })

    //res.redirect(303, session.url)
    res.send(session)
  } catch (error) {
    console.log('2this', error)
    const order = { email: email, error: error }
    await new Email(order, '', '').sendPaymentErrorEmail()
  }
}

router.post('/', createStripe)

export default router

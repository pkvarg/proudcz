import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'
import Email from '../utils/email.js'
import niceInvoice from '../utils/niceInvoice.js'
import path from 'path'
import { getOrderNumber } from '../utils/orderNumbers.js'
import crypto from 'crypto'

const __dirname = path.resolve()

// @desc Create new Order
// @desc POST /api/orders
// @access Private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body
  const user = req.body.user
  const name = req.body.name
  const email = req.body.email
  const discounts = req.body.discounts

  const orderNumber = await getOrderNumber()

  /* Update Count in stock on purchased products */
  const qtys = req.body.qtys
  Object.keys(qtys).forEach(async (key, index) => {
    let purchasedProductId = `${qtys[key].product}`
    let purchasedProductQty = `${qtys[key].qty}`
    let product = await Product.findById(purchasedProductId)
    if (product) {
      let updatedCountInStockToDb = product.countInStock - purchasedProductQty
      console.log('countStockInDB', updatedCountInStockToDb)
      if (updatedCountInStockToDb <= 10) {
        product.countInStock = updatedCountInStockToDb
        try {
          await new Email(product, '', '').sendLowStoragePiecesWarningEmail()
        } catch (error) {
          console.log(error)
        }
      }

      product.countInStock = updatedCountInStockToDb

      await product.save()
    }
  })

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    // return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      name,
      email,
      discounts,
      orderNumber,
    })
    const createdOrder = await order.save()
    // array of items
    const loop = createdOrder.orderItems
    const productsCount = loop.length
    let productsObject = {}
    loop.map((item, i) => {
      if (discounts[i].discount > 0) {
        productsObject[i] =
          ' ' +
          item.qty +
          ' x ' +
          item.name +
          ' ' +
          item.price +
          ' Kč' +
          ' zľava: ' +
          discounts[i].discount +
          ' %'
      } else {
        productsObject[i] =
          ' ' + item.qty + ' x ' + item.name + ' ' + item.price + ' Kč' + '  '
      }
    })

    // object with address info
    const addressInfo = createdOrder.shippingAddress

    // PRODUCTS OBJECT
    productsObject.user = user
    productsObject.email = email
    productsObject.name = name
    productsObject.orderNumber = createdOrder.orderNumber
    productsObject.taxPrice = createdOrder.taxPrice
    productsObject.totalPrice = createdOrder.totalPrice
    productsObject.shippingPrice = createdOrder.shippingPrice
    productsObject.isPaid = createdOrder.isPaid
    productsObject.productsCount = productsCount
    productsObject.orderId = createdOrder._id
    productsObject.paymentMethod = createdOrder.paymentMethod
    productsObject.addressinfo =
      addressInfo.address +
      ', ' +
      addressInfo.city +
      ', ' +
      addressInfo.postalCode +
      ', ' +
      addressInfo.country
    productsObject.billinginfo =
      addressInfo.billingName +
      ', ' +
      addressInfo.billingAddress +
      ', ' +
      addressInfo.billingCity +
      ', ' +
      addressInfo.billingPostalCode +
      ', ' +
      addressInfo.billingCountry +
      ', ' +
      'IČO: ' +
      addressInfo.billingICO +
      ', ' +
      'DIČ: ' +
      addressInfo.billingDIC
    productsObject.note = createdOrder.shippingAddress.note

    //invoice
    // HandleDate
    const date = createdOrder.createdAt
    let dateFromJson = new Date(date)
    let day = dateFromJson.getDate()
    let month = dateFromJson.getMonth() + 1
    let year = dateFromJson.getFullYear()
    let hours = dateFromJson.getHours()
    let minutes = dateFromJson.getMinutes()
    let seconds = dateFromJson.getSeconds()
    let billingDate = `${day}/${month}/${year}`
    // function to create Billing due date
    function addMonths(numOfMonths, date) {
      date.setMonth(date.getMonth() + numOfMonths)
      // return Real DMY
      let increasedDay = date.getDate()
      let increasedMonth = date.getMonth() + 1
      let increasedYear = date.getFullYear()
      let increasedDMY = `${increasedDay}/${increasedMonth}/${increasedYear}`
      return increasedDMY
    }

    // 👇️ Add months to current Date
    const dueDate = addMonths(1, dateFromJson)
    const invoiceDetails = {
      shipping: {
        name: name,
        address: createdOrder.shippingAddress.address,
        city: createdOrder.shippingAddress.city,
        country: createdOrder.shippingAddress.country,
        postalCode: createdOrder.shippingAddress.postalCode,
      },
      billing: {
        name: createdOrder.shippingAddress.billingName,
        address: createdOrder.shippingAddress.billingAddress,
        city: createdOrder.shippingAddress.billingCity,
        country: createdOrder.shippingAddress.billingCountry,
        postalCode: createdOrder.shippingAddress.billingPostalCode,
        ICO: createdOrder.shippingAddress.billingICO,
        DIC: createdOrder.shippingAddress.billingDIC,
      },
      items: createdOrder.orderItems,
      discounts: discounts,
      paymentMethod: createdOrder.paymentMethod,
      total: createdOrder.totalPrice,
      taxPrice: createdOrder.taxPrice,
      shippingPrice: createdOrder.shippingPrice,
      orderNumber: createdOrder.orderNumber,
      header: {
        company_name: 'Prúd',
        company_logo: __dirname + '/utils/prud-prud-logo.png',
        company_address: 'Špieszova 5, 84104, Bratislava, Slovensko',
      },
      ico: 'IČO: 36076589',
      dic: 'DIČ: 2022028173',
      footer: {
        text: 'Faktúra zároveň slúži ako dodací list',
      },
      currency_symbol: 'Kč',
      date: {
        billing_date: billingDate,
        due_date: dueDate,
      },
    }

    date.setHours(date.getHours() + 1) // Increase the hour by 1
    const formattedDate = date.toISOString().replace(/:/g, '-').substring(0, 19) // Format the date as YYYY-MM-DDTHH-MM-SS

    niceInvoice(invoiceDetails, `invoices/${orderNumber}_${formattedDate}.pdf`)
    const fileTosend = `invoices/${orderNumber}_${formattedDate}.pdf`

    await new Email(productsObject, '', fileTosend).sendOrderToEmail()

    res.status(201).json(createdOrder)
  }
})

// @desc Get order by ID
// @desc GET /api/orders/:id
// @access Private

const getOrderByid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc Update order to Paid
// @desc GET /api/orders/:id/pay
// @access Private

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
      address: req.body.payer.address,
      name: req.body.payer.name,
    }

    const updatedOrder = await order.save()
    const discounts = order.discounts
    const orderNumber = order.orderNumber

    // send PaymentSuccessfull Email
    const updatedOrderLoop = updatedOrder.orderItems
    const updatedOrderProductsCount = updatedOrderLoop.length
    let updatedOrderProductsObject = {}

    updatedOrderLoop.map((item, i) => {
      if (discounts[i].discount > 0) {
        updatedOrderProductsObject[i] =
          ' ' +
          item.qty +
          ' x ' +
          item.name +
          ' Kč' +
          item.price +
          ' zľava: ' +
          discounts[i].discount +
          ' %'
      } else {
        updatedOrderProductsObject[i] =
          ' ' + item.qty + ' x ' + item.name + ' Kč' + item.price + '  '
      }
    })

    // object with address info
    const updatedOrderAddressInfo = updatedOrder.shippingAddress

    // ADD THESE LATER
    updatedOrderProductsObject.email = updatedOrder.email
    updatedOrderProductsObject.name = updatedOrder.name
    updatedOrderProductsObject.paidByWhom =
      updatedOrder.paymentResult.name.given_name +
      ' ' +
      updatedOrder.paymentResult.name.surname
    updatedOrderProductsObject.orderNumber = orderNumber
    updatedOrderProductsObject.taxPrice = updatedOrder.taxPrice
    updatedOrderProductsObject.totalPrice = updatedOrder.totalPrice
    updatedOrderProductsObject.shippingPrice = updatedOrder.shippingPrice
    updatedOrderProductsObject.isPaid = updatedOrder.isPaid
    updatedOrderProductsObject.productsCount = updatedOrderProductsCount
    updatedOrderProductsObject.orderId = updatedOrder._id
    updatedOrderProductsObject.paymentMethod = updatedOrder.paymentMethod
    updatedOrderProductsObject.addressinfo =
      updatedOrderAddressInfo.address +
      ', ' +
      updatedOrderAddressInfo.city +
      ', ' +
      updatedOrderAddressInfo.postalCode +
      ', ' +
      updatedOrderAddressInfo.country
    updatedOrderProductsObject.note = updatedOrder.shippingAddress.note

    await new Email(updatedOrderProductsObject).sendPaymentSuccessfullToEmail()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc Update order to Paid by Stripe
// @desc GET /api/orders/:id/pay-stripe
// @access Private

const updateOrderToPaidByStripe = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body._id,
      status: 'Paid by Stripe',
      update_time: Date.now(),
      email_address: req.body.email,
      address: req.body.shippingAddress,
      name: req.body.name,
    }

    const updatedOrder = await order.save()
    const discounts = order.discounts
    const orderNumber = order.orderNumber

    // send PaymentSuccessfull Email
    const updatedOrderLoop = updatedOrder.orderItems
    const updatedOrderProductsCount = updatedOrderLoop.length
    let updatedOrderProductsObject = {}

    updatedOrderLoop.map((item, i) => {
      if (discounts[i].discount > 0) {
        updatedOrderProductsObject[i] =
          ' ' +
          item.qty +
          ' x ' +
          item.name +
          ' Kč' +
          item.price +
          ' zľava: ' +
          discounts[i].discount +
          ' %'
      } else {
        updatedOrderProductsObject[i] =
          ' ' + item.qty + ' x ' + item.name + ' Kč' + item.price + '  '
      }
    })

    // object with address info
    const updatedOrderAddressInfo = updatedOrder.shippingAddress

    // ADD THESE LATER
    updatedOrderProductsObject.email = updatedOrder.email
    updatedOrderProductsObject.name = updatedOrder.name
    updatedOrderProductsObject.paidByWhom = updatedOrder.paymentResult.name
    updatedOrderProductsObject.orderNumber = orderNumber
    updatedOrderProductsObject.taxPrice = updatedOrder.taxPrice
    updatedOrderProductsObject.totalPrice = updatedOrder.totalPrice
    updatedOrderProductsObject.shippingPrice = updatedOrder.shippingPrice
    updatedOrderProductsObject.isPaid = updatedOrder.isPaid
    updatedOrderProductsObject.productsCount = updatedOrderProductsCount
    updatedOrderProductsObject.orderId = updatedOrder._id
    updatedOrderProductsObject.paymentMethod = updatedOrder.paymentMethod
    updatedOrderProductsObject.addressinfo =
      updatedOrderAddressInfo.address +
      ', ' +
      updatedOrderAddressInfo.city +
      ', ' +
      updatedOrderAddressInfo.postalCode +
      ', ' +
      updatedOrderAddressInfo.country
    updatedOrderProductsObject.note = updatedOrder.shippingAddress.note

    await new Email(updatedOrderProductsObject).sendPaymentSuccessfullToEmail()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc Update order to Delivered
// @desc GET /api/orders/:id/deliver
// @access Private/Admin

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    try {
      // send email notif
      await new Email(order, '', '').sendDeliveredNotificationEmail()
    } catch (error) {
      console.log(error)
    }

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc Update order to Delivered
// @desc GET /api/orders/:id/cancell
// @access Private/Admin

const updateOrderToCancelled = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isCancelled = true

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc Get logged in user orders
// @desc GET /api/orders/myorders
// @access Private

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

// @desc Get all orders
// @desc GET /api/orders
// @access Private/Admin

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})

// @desc Create init payment Id in db
// @desc PUT /api/orders/:id/init-payment

const createInitPaymentId = asyncHandler(async (req, res) => {
  const orderId = req.params.id
  const order = await Order.findById(orderId)

  if (order) {
    const token = crypto.createHash('sha256').update(orderId).digest('hex')
    console.log('tkcry', token)
    order.initPaymentId = token
    const savedOrder = await order.save()
    res.json(savedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc Get init payment Id from db
// @desc GET /api/orders/:id/init-payment

const getInitPaymentId = asyncHandler(async (req, res) => {
  const orderId = req.params.id
  const order = await Order.findById(orderId)

  if (order) {
    const initPaymentId = order.initPaymentId
    res.json(initPaymentId)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// DELETE ORDER
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findOneAndDelete({ _id: req.params.id })

  if (order) {
    res.json({ message: 'order deleted' })
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

const failedPaymentNotification = asyncHandler(async (req, res) => {
  const orderId = req.params.id
  const order = await Order.findById(orderId)

  try {
    await new Email(order, '', '').sendFailedPaymentNotificationgEmail()
  } catch (error) {
    console.log(error)
  }

  res.json('failed-notif-sent')
})

export {
  addOrderItems,
  getOrderByid,
  updateOrderToPaid,
  updateOrderToPaidByStripe,
  updateOrderToDelivered,
  updateOrderToCancelled,
  getMyOrders,
  getOrders,
  createInitPaymentId,
  getInitPaymentId,
  failedPaymentNotification,
  deleteOrder,
}

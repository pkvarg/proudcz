import Order from '../models/orderModel.js'

export const getOrderNumber = async () => {
  const thisYearsOrders = []
  let cancelledOrderNumber = 0
  let countOfReusedOrderNumbers = 0
  let date = Date.now()
  let thisYear = new Date(date).getFullYear()
  let orderNumber = 0

  function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0')
  }

  const allOrders = await Order.find({}).populate('user', 'id name')

  // all orders count for this year + filter orders
  allOrders.map((order) => {
    const orderCreateAt = order.createdAt
    const orderDate = new Date(orderCreateAt)
    const orderYear = orderDate.getFullYear()
    if (orderYear === thisYear) {
      thisYearsOrders.push(order)
    }
  })

  for (const order of thisYearsOrders) {
    if (order.isCancelled && !order.isCancelledOrderNumberUsed) {
      cancelledOrderNumber = order.orderNumber
      order.isCancelledOrderNumberUsed = true
      await order.save()
      // break to do this only once
      break
    }
  }

  if (cancelledOrderNumber > 0) {
    orderNumber = cancelledOrderNumber
  } else {
    for (const order of thisYearsOrders) {
      if (order.isCancelledOrderNumberUsed) {
        countOfReusedOrderNumbers++
      }
    }
    let thisYearsOrdersCount = thisYearsOrders.length
    if (countOfReusedOrderNumbers > 0) {
      thisYearsOrdersCount -= countOfReusedOrderNumbers
    }
    thisYearsOrdersCount++
    thisYearsOrdersCount.toString()
    let addedZeros = addLeadingZeros(thisYearsOrdersCount, 4)
    orderNumber = thisYear + addedZeros
  }

  console.log('orderNo', orderNumber)

  return orderNumber
}

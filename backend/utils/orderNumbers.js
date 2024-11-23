import Order from '../models/orderModel.js'

export const getOrderNumber = async () => {
  const currentYear = new Date().getFullYear()

  // Find the first unused cancelled order number for this year
  const cancelledOrder = await Order.findOne({
    createdAt: { $gte: new Date(currentYear, 0, 1) },
    isCancelled: true,
    isCancelledOrderNumberUsed: false,
  }).sort('orderNumber')

  if (cancelledOrder) {
    cancelledOrder.isCancelledOrderNumberUsed = true
    await cancelledOrder.save()
    return cancelledOrder.orderNumber.toString() // Return as is, without 'W'
  }

  // Find the highest order number for this year
  const highestOrder = await Order.findOne({
    createdAt: { $gte: new Date(currentYear, 0, 1) },
  }).sort('-orderNumber')

  let newOrderNumber
  if (highestOrder) {
    // Extract the numeric part (remove year prefix and 'W' suffix)
    const highestNumber = parseInt(
      highestOrder.orderNumber.toString().slice(4, -1)
    )
    newOrderNumber = currentYear * 10000 + highestNumber + 1
  } else {
    newOrderNumber = currentYear * 10000 + 1
  }

  return formatOrderNumber(newOrderNumber)
}

function formatOrderNumber(number) {
  return `${number}W`
}

function addLeadingZeros(num, totalLength) {
  return String(num).padStart(totalLength, '0')
}

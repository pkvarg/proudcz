import fs from 'fs'
import PDFDocument from 'pdfkit'
import path from 'path'
const __dirname = path.resolve()

const niceInvoice = (invoice, path) => {
  console.log('invoice:', invoice)
  let doc = new PDFDocument({ size: 'A4', margin: 40 })

  doc.registerFont('Cardo', __dirname + '/utils/fonts/Cardo-Regular.ttf')
  doc.registerFont('Cardo-Bold', __dirname + '/utils/fonts/Cardo-Bold.ttf')

  header(doc, invoice)
  customerInformation(doc, invoice)
  invoiceTable(doc, invoice)
  footer(doc, invoice)

  doc.end()
  doc.pipe(fs.createWriteStream(path))
}

let header = (doc, invoice) => {
  if (fs.existsSync(invoice.header.company_logo)) {
    doc
      .image(invoice.header.company_logo, 50, 45, { width: 100 })
      .fontSize(18)
      .font('Cardo-Bold')
      .text(invoice.header.company_name, 515, 31)
      .moveDown()
  } else {
    doc.fontSize(18).font('Cardo-Bold')
    text(invoice.header.company_name, 515, 31).moveDown()
  }

  if (invoice.header.company_address.length !== 0) {
    companyAddress(doc, invoice.header.company_address)
  }
  // ico dic
  if (invoice.ico.length !== 0) {
    doc.font('Cardo-Bold').fontSize(15).text(invoice.ico, 454, 85)
  }
  if (invoice.dic.length !== 0) {
    doc.font('Cardo-Bold').fontSize(15).text(invoice.dic, 439.5, 105)
  }
  doc.font('Cardo').fontSize(12).text('MVSR VUS/1-900/90-26215-1', 395, 125)
}

let customerInformation = (doc, invoice) => {
  doc
    .fillColor('#444444')
    .fontSize(20)
    .text('Faktura - Daňový doklad:', 50, 160)
    .fontSize(15)
    .text(invoice.orderNumber, 275, 165)
  generateHr(doc, 185)

  const customerInformationTop = 200

  doc
    .fontSize(14)
    .font('Cardo')
    .text('Datum vystavení:', 50, customerInformationTop)
    .text(invoice.date.billing_date, 175, customerInformationTop)
    .text('Datum splatnosti:', 50, customerInformationTop + 15)
    .text(invoice.date.due_date, 175, customerInformationTop + 15)
    //
    .text('Způsob platby:', 50, customerInformationTop + 30)
    .text(invoice.paymentMethod, 175, customerInformationTop + 30)
  if (invoice.billing.name !== undefined) {
    doc
      .font('Cardo-Bold')
      .text(invoice.billing.name, 320, customerInformationTop)
      .font('Cardo')
      .text(
        invoice.billing.address + ', ' + invoice.billing.city,
        320,
        customerInformationTop + 15
      )
      .text(
        invoice.billing.postalCode + ', ' + invoice.billing.country,
        320,
        customerInformationTop + 30
      )
      .text('IČO:', 320, customerInformationTop + 45)
      .text(invoice.billing.ICO, 350, customerInformationTop + 45)
      .text('DIČ:', 320, customerInformationTop + 60)
      .text(invoice.billing.DIC, 350, customerInformationTop + 60)
      .moveDown()

    generateHr(doc, 282)
  } else {
    doc
      .font('Cardo-Bold')
      .text(invoice.shipping.name, 320, customerInformationTop)
      .font('Cardo')
      .text(
        invoice.shipping.address + ', ' + invoice.shipping.city,
        320,
        customerInformationTop + 15
      )
      .text(
        invoice.shipping.postalCode + ', ' + invoice.shipping.country,
        320,
        customerInformationTop + 30
      )

      .moveDown()

    generateHr(doc, 272)
  }
}

let invoiceTable = (doc, invoice) => {
  let i
  const invoiceTableTop = 330
  const currencySymbol = '€'

  doc.font('Cardo-Bold')
  tableRow(doc, invoiceTableTop, 'Produkty', '', 'Cena/ks', 'Počet', 'Celkem')
  generateHr(doc, invoiceTableTop + 20)
  doc.font('Cardo')

  let productsTotalPrice = 0
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  let disc = 0
  let discount = ''

  for (i = 0; i < invoice.items.length; i++) {
    let item = invoice.items[i]
    let total = Number(invoice.items[i].qty * invoice.items[i].price)
    productsTotalPrice = productsTotalPrice + total
    /* loop discounts */
    disc = invoice.discounts[i].discount
    if (disc > 0) {
      discount = `sleva ${disc}%`
    } else {
      discount = ''
    }

    const position = invoiceTableTop + (i + 1) * 30
    tableRow(
      doc,
      position,
      item.name,
      discount,
      formatCurrency(currencySymbol, item.price.toFixed(2).replace('.', ',')),
      item.qty,
      formatCurrency(currencySymbol, total.toFixed(2).replace('.', ','))
    ),
      generateHr(doc, position + 20)
  }

  let shippingPrice = invoice.shippingPrice
  // let tax = invoice.taxPrice
  let totalPrice = invoice.total
  productsTotalPrice = addDecimals(productsTotalPrice)

  const productsTotalPosition = invoiceTableTop + (i + 1) * 30
  doc.font('Cardo-Bold')
  totalTable(
    doc,
    productsTotalPosition,
    'Produkty',
    formatCurrency(currencySymbol, productsTotalPrice.replace('.', ','))
  )

  const shippingPosition = productsTotalPosition + 20
  doc.font('Cardo-Bold')
  totalTable(
    doc,
    shippingPosition,
    'Poštovné',
    formatCurrency(currencySymbol, shippingPrice.replace('.', ','))
  )

  const paidToDatePosition = shippingPosition + 20
  doc.font('Cardo-Bold')
  totalTable(
    doc,
    paidToDatePosition,
    'Celkem',
    formatCurrency(currencySymbol, totalPrice.replace('.', ','))
  )
}

let footer = (doc, invoice) => {
  if (invoice.footer.text.length !== 0) {
    doc
      .fontSize(15)
      .text(invoice.footer.text, 50, 780, { align: 'center', width: 500 })
  }
}

let totalTable = (doc, y, name, description) => {
  doc
    .fontSize(15)
    .text(name, 400, y, { width: 90, align: 'right' })
    .text(description, 500, y, { align: 'right' })
}

let tableRow = (doc, y, item, discount, price, quantity, lineTotal) => {
  doc
  doc
    .fontSize(12.5)
    .text(item, 50, y)
    .text(discount, 300, y)
    .text(price, 337, y, { width: 90, align: 'right' })
    .text(quantity, 402, y, { width: 90, align: 'right' })
    .text(lineTotal, 467, y, { width: 90, align: 'right' })
  //.text(tax, 10, y, { align: 'right' })
}

let generateHr = (doc, y) => {
  doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, y).lineTo(560, y).stroke()
}

// let formatCurrency = (cents, symbol) => {
//   return symbol + cents.toFixed(2)
// }

let formatCurrency = (cents, symbol) => {
  return symbol + cents
}

let companyAddress = (doc, address) => {
  let str = address
  let chunks = str.match(/.{0,25}(\s|$)/g)
  let first = 50
  chunks.forEach(function (i, x) {
    doc.fontSize(15).text(chunks[x], 200, first, { align: 'right' })
    first = +first + 15
  })
}

export default niceInvoice

import fs from 'fs'
import PDFDocument from 'pdfkit'
import path from 'path'
const __dirname = path.resolve()

const niceInvoice = (invoice, path) => {
  //console.log('invoice:', invoice)

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
      .fontSize(15)
      .font('Cardo-Bold')
      .text(invoice.header.company_name, 281, 31)
      .moveDown()
  } else {
    doc.fontSize(13).font('Cardo-Bold')
    text(invoice.header.company_name, 281, 31).moveDown()
  }

  if (invoice.header.company_address.length !== 0) {
    doc.fontSize(12).font('Cardo-Bold')
    companyAddress(doc, invoice.header.company_address)
  }
  // ico
  if (invoice.ico.length !== 0) {
    doc.font('Cardo-Bold').fontSize(11).text(invoice.ico, 480, 85)
  }
  if (invoice.paymentMethod === 'Bankovním převodem') {
    doc.font('Cardo').fontSize(11).text('IBAN: CZ12 0800 0000 0002 1943 6319', 365, 100)
    doc.font('Cardo').fontSize(11).text('Číslo účtu: 219436319/0800', 425, 115)
  }
}

let customerInformation = (doc, invoice) => {
  doc
    .fillColor('#444444')
    .fontSize(15)
    .text('Faktura - Daňový doklad:', 50, 160)
    .fontSize(15)
    .text(invoice.orderNumber, 235, 160)
  generateHr(doc, 185)

  const customerInformationTop = 187.5

  doc
    .fontSize(13)
    .font('Cardo')
    .text('Datum vystavení:', 50, customerInformationTop)
    .text(invoice.date.billing_date, 175, customerInformationTop)
    .text('Datum splatnosti:', 50, customerInformationTop + 15)
    .text(invoice.date.due_date, 175, customerInformationTop + 15)
    //
    .text('Způsob platby:', 50, customerInformationTop + 30)
    .text(invoice.paymentMethod, 175, customerInformationTop + 30)
    .text('Variabilní symbol:', 50, customerInformationTop + 45)
    .text(invoice.orderNumber, 175, customerInformationTop + 45)

  doc
    .font('Cardo-Bold')
    .text('Doručovací údaje', 320, customerInformationTop)
    .font('Cardo')
    .text(invoice.shipping.name, 320, customerInformationTop + 15)

    .text(invoice.shipping.address + ', ' + invoice.shipping.city, 320, customerInformationTop + 30)
    .text(
      invoice.shipping.postalCode + ', ' + invoice.shipping.country,
      320,
      customerInformationTop + 45,
    )

    .moveDown()

  generateHr(doc, 250)
  // fakturacne udaje
  if (invoice.billing.name === undefined || invoice.billing.name === '') {
    doc
      .font('Cardo-Bold')
      .fontSize(12)
      .text('Fakturační údaje', 50, customerInformationTop + 65)
      .font('Cardo')
      .text(invoice.shipping.name, 50, customerInformationTop + 77.5)
      .text(
        invoice.shipping.address + ', ' + invoice.shipping.city,
        50,
        customerInformationTop + 90,
      )
      .text(
        invoice.shipping.postalCode + ', ' + invoice.shipping.country,
        50,
        customerInformationTop + 102.5,
      )
    if (invoice.note) {
      doc.fontSize(10).text('Poznámka:' + ' ' + invoice.note, 50, customerInformationTop + 117.5)
    }
    doc.moveDown()
  } else {
    doc
      .font('Cardo-Bold')
      .fontSize(13)
      .text('Fakturační údaje', 50, customerInformationTop + 65)
      .font('Cardo')
      .fontSize(12)
      .text(invoice.billing.name, 50, customerInformationTop + 77.5)
      .font('Cardo')
      .text(invoice.billing.address + ', ' + invoice.billing.city, 50, customerInformationTop + 90)
      .text(
        invoice.billing.postalCode +
          ', ' +
          invoice.billing.country +
          ', ' +
          'IČO:' +
          +invoice.billing.ICO,
        50,
        customerInformationTop + 102.5,
      )
    if (invoice.note) {
      doc.fontSize(10).text('Poznámka:' + ' ' + invoice.note, 50, customerInformationTop + 117.5)
    }
    doc.moveDown()
  }
}

let invoiceTable = (doc, invoice) => {
  let i
  const invoiceTableTop = 330
  const currencySymbol = 'Kč'

  doc.font('Cardo-Bold')
  tableRow(doc, invoiceTableTop, 'Produkty', '', 'Cena/ks', 'Počet', 'Celkem')
  generateHr(doc, invoiceTableTop + 15)
  doc.font('Cardo')

  let productsTotalPrice = 0

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

    const position = invoiceTableTop + (i + 1) * 15
    tableRow(
      doc,
      position,
      item.name,
      discount,
      formatCurrency(item.price, currencySymbol),
      item.qty,
      formatCurrency(total, currencySymbol),
    ),
      generateHr(doc, position + 15)
  }

  let shippingPrice = invoice.shippingPrice
  // let tax = invoice.taxPrice
  let totalPrice = invoice.total

  const productsTotalPosition = invoiceTableTop + (i + 1) * 15
  doc.font('Cardo-Bold')
  totalTable(
    doc,
    productsTotalPosition,
    'Produkty',
    formatCurrency(productsTotalPrice, currencySymbol),
  )

  const shippingPosition = productsTotalPosition + 10
  doc.font('Cardo-Bold')
  totalTable(doc, shippingPosition, 'Poštovné', formatCurrency(shippingPrice, currencySymbol))

  const paidToDatePosition = shippingPosition + 10
  doc.font('Cardo-Bold')
  totalTable(doc, paidToDatePosition, 'Celkem', formatCurrency(totalPrice, currencySymbol))
}

let footer = (doc, invoice) => {
  if (invoice.footer.text.length !== 0) {
    doc
      .fontSize(10)
      .text(invoice.invoice_produced_by, 50, 770, {
        align: 'center',
        width: 500,
      })
      .fontSize(12)
      .text(invoice.footer.text, 50, 780, { align: 'center', width: 500 })
  }
}

let totalTable = (doc, y, name, description) => {
  doc
    .fontSize(10)
    .text(name, 400, y, { width: 90, align: 'right' })
    .text(description, 500, y, { align: 'right' })
}

let tableRow = (doc, y, item, discount, price, quantity, lineTotal) => {
  doc
  doc
    .fontSize(10)
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

let formatCurrency = (cents, symbol) => {
  return cents + symbol
}

let companyAddress = (doc, address) => {
  let str = address
  let chunks = str.match(/.{0,25}(\s|$)/g)
  let first = 50
  chunks.forEach(function (i, x) {
    doc.text(chunks[x], 200, first, { align: 'right' })
    first = +first + 15
  })
}

export default niceInvoice

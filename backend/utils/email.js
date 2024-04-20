import nodemailer from 'nodemailer'
import { htmlToText } from 'html-to-text'
import pug from 'pug'
import path from 'path'

class Email {
  constructor(user, url, file) {
    //console.log('Email:', user, url)
    this.user = user.user
    this.to = user.email
    this.firstName = user.name
    this.url = url
    this.from = `Proud života eshop <${process.env.EMAIL_FROM}>`
    // order
    this.products = []
    this.productsCount = user.productsCount
    for (let i = 0; i < user.productsCount; i++) {
      this.products.push(user[i])
    }
    this.addressinfo = user.addressinfo
    this.billinginfo = user.billinginfo
    this.paidByWhom = user.paidByWhom
    //this.paymentMethod = user.paymentMethod
    let paymentMethod
    if (user.paymentMethod === 'Hotovosť') {
      paymentMethod = 'Zaplatíte pri prevzatí'
    } else if (user.paymentMethod === 'PayPal alebo karta') {
      paymentMethod = 'PayPal alebo platba kartou'
    } else {
      paymentMethod = 'Stripe'
    }
    this.paymentMethod = paymentMethod
    this.isPaid = user.isPaid ? 'Zaplatené' : 'Nezaplatené'
    this.shippingPrice = user.shippingPrice
    this.taxPrice = user.taxPrice
    this.totalPrice = user.totalPrice
    this.orderNumber = user.orderNumber
    this.file = file
    //this.subject = user.subject
    this.message = user.message
    this.note = user.note
    // review
    this.comment = user.comment
    this.orderId = user._id
    this.countInStock = user.countInStock
    this.error = user.error
  }

  newTransport() {
    return nodemailer.createTransport({
      pool: true,
      host: 'smtp.titan.email',
      port: 465,
      secure: true, // use TLS
      auth: {
        user: process.env.NODEJS_USERNAME,
        pass: process.env.NODEJS_PASSWORD,
      },
    })
  }

  // send the actual email
  async send(template, subject, adminOnly) {
    const __dirname = path.resolve()
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(
      `${__dirname}/utils/mailTemplates/${template}.pug`,
      {
        user: this.user,
        firstName: this.firstName,
        email: this.to,
        url: this.url,
        subject,
        // order
        products: this.products,
        address: this.addressinfo,
        billing: this.billinginfo,
        paidByWhom: this.paidByWhom,
        paymentMethod: this.paymentMethod,
        paid: this.isPaid,
        shippingPrice: this.shippingPrice,
        taxPrice: this.taxPrice,
        totalPrice: this.totalPrice,
        orderNumber: this.orderNumber,
        file: this.file,
        // contactForm
        emailSubject: this.subject,
        message: this.message,
        note: this.note,
        // review
        comment: this.comment,
        orderId: this.orderId,
        countInStock: this.countInStock,
        error: this.error,
      }
    )

    if (!this.file) {
      console.log('no file')
      let mailOptions = {
        from: this.from,
        to: !adminOnly ? this.to : process.env.NODEJS_BCC,
        bcc: !adminOnly && process.env.NODEJS_BCC,
        subject,
        html,
        text: htmlToText(html),
      }

      // 3) Create a transport and send email

      await this.newTransport().sendMail(mailOptions)
    }
    if (this.file) {
      console.log('is file')
      // 2) Define email options
      let mailOptions = {
        from: this.from,
        to: !adminOnly ? this.to : process.env.NODEJS_BCC,
        bcc: !adminOnly && process.env.NODEJS_BCC,
        subject,
        html,
        text: htmlToText(html),
        // file attachment
        attachments: [
          {
            filename: this.file,
            path: __dirname + `/${this.file}`,
            cid: `uniq-${this.file}`,
          },
        ],
      }
      // 3) Create a transport and send email

      await this.newTransport().sendMail(mailOptions)
    }
  }

  async sendOrderToEmail() {
    await this.send(
      'orderToEmail',
      `Vaše objednávka ${this.orderNumber}`,
      false
    )
  }

  async sendLowStoragePiecesWarningEmail() {
    await this.send(
      'lowStoragePieces',
      `Počet ${this.firstName} klesl pod 10`,
      true
    )
  }

  async sendFailedPaymentNotificationgEmail() {
    await this.send(
      'failedPaymentNotification',
      `Platba ${this.orderNumber} selhala`,
      true
    )
  }

  async sendPaymentErrorEmail() {
    await this.send('paymentError', `Platba ${this.to} selhala`, true)
  }

  async sendDeliveredNotificationEmail() {
    await this.send(
      'deliveredOrderEmail',
      `Vaše objednávka ${this.orderNumber} byla odoslána`,
      false
    )
  }

  async sendPaymentSuccessfullToEmail() {
    await this.send('paymentSuccessfull', `Objednávka zaplacená`, false)
  }

  async sendPasswordReset() {
    await this.send('passwordReset', 'Změňte si Vaše heslo', false)
  }

  async sendWelcome() {
    await this.send('welcome', 'Úspěšná registrace na proudzivota.cz', false)
  }

  async sendWelcomeGoogle() {
    await this.send('welcomeGoogle', 'Vaše registrace na proudzivota.cz', false)
  }

  // contact Form
  async sendContactForm() {
    await this.send('emailForm', 'Kontakt Eshop', false)
  }

  // new review notification

  async sendReviewNotification() {
    await this.send('reviewForm', 'Nová recenze na Eshopu', true)
  }
}

export default Email

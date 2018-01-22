import nodemailer from 'nodemailer'

const emailConfig = {
  service: 'Mailgun',
  auth: {
    user: process.env.MAILGUN_USERNAME,
    pass: process.env.MAILGUN_PASSWORD
  }
}

const emailTransport = nodemailer.createTransport(emailConfig)

export default (request, h) => {
  h.response('testing')
}

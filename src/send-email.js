import nodemailer from 'nodemailer'
import Liquid from 'liquid-node'

const engine = new Liquid.Engine
const emailConfig = {
  service: 'Mailgun',
  auth: {
    user: process.env.MAILGUN_USERNAME,
    pass: process.env.MAILGUN_PASSWORD
  }
}

const emailTransport = nodemailer.createTransport(emailConfig)

export default async (request, h) => {
  const htmlString = await engine.parseAndRender(
    global.templateString,
    request.payload
  )
  const mailgunResponse = await emailTransport.sendMail({
    from: process.env.MAILGUN_FROM_ADDRESS,
    to: request.payload.emailAddress,
    subject: request.payload.emailSubject,
    html: htmlString
  })
  return h.response(request.payload)
    .code(200)
}

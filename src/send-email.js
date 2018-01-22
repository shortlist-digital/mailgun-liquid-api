import nodemailer from 'nodemailer'
import Liquid from 'liquid-node'

// Having to load these on every file, potentially due to async/await
// of absolutely every function

import * as dotenv from 'dotenv'
dotenv.config()

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
  }).catch((err) => {
    console.log(err)
    return h.response(JSON.stringify(err.message))
      .code(500)
  })
  return h.response(request.payload)
    .code(200)
}

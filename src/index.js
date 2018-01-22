import Hapi from 'hapi'
import nodemailer from 'nodemailer'

const emailConfig = {
  service: 'Mailgun',
  auth: {
    user: process.env.MAILGUN_USERNAME,
    pass: process.env.MAILGUN_PASSWORD
  }
}

const emailTransport = mailer.createTransport(emailConfig)

const server = new Hapi.Server({
  port: process.env.POST || 3000
})

server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return h.response('Server OK')
      .code(200)
  }
})

async function boot() {
  await server.start()
  console.log('Server started at: ' + server.info.uri)
}

boot()



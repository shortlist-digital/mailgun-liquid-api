import Hapi from 'hapi'
import sendEmail from './send-email'
import request from 'request'

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

server.route({
  method: 'POST',
  path: '/send',
  handler: sendEmail
})

async function boot() {
  // Download Liquid Template
  await request(process.env.LIQUID_TEMPLATE_URL)
  await server.start()
  console.log('Server started at: ' + server.info.uri)
}

boot()



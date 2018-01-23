import * as dotenv from 'dotenv'
import Hapi from 'hapi'
import sendEmail from './send-email'
import request from 'request-promise-native'

// Load .env variables onto process.env
dotenv.config()

// Store template string on a global
global.templateString = ''

async function boot() {
  const server = new Hapi.Server({
    port: process.env.PORT || 3000
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
    method: 'GET',
    path: '/template',
    handler: (request, h) => {
      return h.response(global.templateString)
        .code(200)
    }
  })

  server.route({
    cors: true,
    method: 'POST',
    path: '/send',
    handler: sendEmail
  })

  // Download Liquid Template
  let response = await request(process.env.LIQUID_TEMPLATE_URL)
  global.templateString = response
  await server.start()
  console.log('Server started at: ' + server.info.uri)
}

boot()

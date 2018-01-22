// Load .env variables onto process.env
require('dotenv').config()

import Hapi from 'hapi'
import sendEmail from './send-email'
import request from 'request-promise-native'

// Store template string on a global
global.templateString = ''


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
  method: 'GET',
  path: '/template',
  handler: (request, h) => {
    return h.response(global.templateString)
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
  let response = await request(process.env.LIQUID_TEMPLATE_URL)
  global.templateString = response
  await server.start()
  console.log('Server started at: ' + server.info.uri)
}

boot()

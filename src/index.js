import Hapi from 'hapi'

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



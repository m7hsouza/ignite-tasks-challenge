import http from 'node:http'

const server = http.createServer(function (request, response) {
  const { method, url: path } = request

  console.log({ method, path })

  return response.end('Hello UniNorte')

})

server.listen(3333)
console.log('Server running on http://localhost:3333')

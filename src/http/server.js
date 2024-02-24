import { createServer } from 'node:http'

import { json } from './middlewares/json.js'
import { createTask } from './routes/create-task.js'
import { listTasks } from './routes/list-tasks.js'

const tasks = []

const routes = [
  createTask,
  listTasks,
]

const server = createServer(async function (request, response) {
  await json(request, response)

  const { method, url: path } = request

  const route = routes.find(
    route => route.method === method && route.path
  )

  if (!route) {
    return response.writeHead(404).end('not found')
  }

  return route.handler(request, response);
})

server.listen(3333)
console.log('Server running on http://localhost:3333')

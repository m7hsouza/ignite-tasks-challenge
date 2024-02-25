import { createServer } from 'node:http'

import { json } from './middlewares/json.js'
import { createTask } from './routes/create-task.js'
import { listTasks } from './routes/list-tasks.js'
import { updateTask } from './routes/update-tasks.js'
import { deleteTask } from './routes/delete-task.js'

const routes = [
  createTask,
  listTasks,
  updateTask,
  deleteTask
]

const server = createServer(async function (request, response) {
  await json(request, response)

  const { method, url: path } = request

  const route = routes.find(
    route => route.method === method && route.path.test(path)
  )

  if (!route) {
    return response.writeHead(404).end('not found')
  }

  const { ...params } = path.match(route.path).groups ?? {}
  Object.assign(request,{
    params
  })
  return route.handler(request, response);
})

server.listen(3333)
console.log('Server running on http://localhost:3333')

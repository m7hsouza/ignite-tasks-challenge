import { createServer } from 'node:http'
import { randomUUID } from 'node:crypto'

import { json } from './middlewares/json.js'

const tasks = []

const server = createServer(async function (request, response) {
  await json(request, response)

  const { method, url: path } = request

  if (path === '/tasks') {
    if (method.toUpperCase() === 'POST') {
      const { title, description } = request.body
      const now = new Date()
      const task = {
        id: randomUUID(),
        title,
        description,
        completedAt: null,
        createdAt: now,
        updatedAt: now
      }
      tasks.push(task)
      return response.writeHead(201).end(
        JSON.stringify({
          taskId: task.id
        })
      )
    }

    if (method.toUpperCase() === 'GET') {
      return response.end(JSON.stringify(tasks))
    }
  }

  return response.writeHead(404).end('not found')

})

server.listen(3333)
console.log('Server running on http://localhost:3333')

import { randomUUID } from 'node:crypto'

import { connection } from '../database/connection.js'

export const createTask = {
  method: 'POST',
  path: '/tasks',
  handler: function (request, response) {
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
    connection.insert('tasks', task)
    return response.writeHead(201).end(
      JSON.stringify({
        taskId: task.id
      })
    )
  }
}

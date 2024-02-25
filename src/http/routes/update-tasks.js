import { buildRoutePath } from '../../utils/build-route-path.js'
import { connection } from '../database/connection.js'

export const updateTask = {
  method: 'PUT',
  path: buildRoutePath('/tasks/:taskId'),
  handler: function (request, response) {
    const { taskId } = request.params
    const { title, description } = request.body

    connection.update('tasks', taskId, {
      title,
      description,
      updatedAt: new Date()
    })
    return response.writeHead(204).end()
  }
}
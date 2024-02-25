import { buildRoutePath } from '../../utils/build-route-path.js'
import { connection } from '../database/connection.js'

export const completeTask = {
  method: 'PATCH',
  path: buildRoutePath('/tasks/:taskId/complete'),
  handler: async function (request, response) {
    const { completedAt } = request.body
    const { taskId } = request.params
    await connection.update('tasks', taskId, { completedAt: new Date(completedAt), updatedAt: new Date() })
    return response.writeHead(204).end()
  }
}
import { buildRoutePath } from '../../utils/build-route-path.js'
import { connection } from '../database/connection.js'

export const deleteTask = {
  method: 'DELETE',
  path: buildRoutePath('/tasks/:taskId'),
  handler: async function (request, response) {
    await connection.delete('tasks', request.params.taskId)
    return response.writeHead(204).end()
  }
}
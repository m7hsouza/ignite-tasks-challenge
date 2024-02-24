import { buildRoutePath } from '../../utils/build-route-path.js'
import { connection } from '../database/connection.js'

export const listTasks = {
  method: 'GET',
  path: buildRoutePath('/tasks'),
  handler: function (_, response) {
    const tasks = connection.select('tasks')
    return response.end(JSON.stringify(tasks))
  }
}
import { connection } from '../database/connection.js'

export const listTasks = {
  method: 'GET',
  path: '/tasks',
  handler: function (_, response) {
    const tasks = connection.select('tasks')
    return response.end(JSON.stringify(tasks))
  }
}
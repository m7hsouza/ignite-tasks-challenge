import { IncomingMessage, ServerResponse } from 'node:http'

/**
 * @param {IncomingMessage} request 
 * @param {ServerResponse<IncomingMessage>} response 
 */
export async function json (request, response) {
  const buffers = []
  for await (const chunck of request) {
    buffers.push(chunck)
  }
  try {
    request.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    request.body = null
  }
  response.setHeader('Content-Type', 'application/json')
}
import fs from 'node:fs/promises'

const databasePath = new URL('../../../database.json', import.meta.url)

class Connection {
  constructor () {
    fs.readFile(databasePath)
      .then(data => {
        this.#tables = JSON.parse(data)
      })
      .catch(() => this.#persist())
  }
  
  #tables = {}

  async #persist () {
    await fs.writeFile(databasePath, JSON.stringify(this.#tables));
  }

  async insert (table, data) {
    this.#tables[table] ??= []
    this.#tables[table].push(data)
    await this.#persist();
  }

  select (table) {
    return this.#tables[table] ?? []
  }
}


export const connection = new Connection()
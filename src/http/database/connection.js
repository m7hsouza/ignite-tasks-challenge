class Connection {
  #tables = {}

  insert (table, data) {
    this.#tables[table] ??= []
    this.#tables[table].push(data)
  }

  select (table) {
    return this.#tables[table] ?? []
  }
}


export const connection = new Connection()
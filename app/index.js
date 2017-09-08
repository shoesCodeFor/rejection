const Repository = require('./repository')
const store = require('./browserStore')

const render = (database) => {
  console.log('rendering...')
}

const shell = () => {
  const db = Repository(store(window.localStorage))
  render(db)
}

shell()

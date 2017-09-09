const test = require('tape')

const browserStore = require('../browserStore')
const data = require('./helpers/data')
const api = require('./helpers/testStore')(data)

test('-- app/browserStore', (expect) => { expect.end() })

test('it loads all data from the repository', (expect) => {
  const expected = data
  const Repository = browserStore(api)

  const actual = Repository.load()

  expect.deepEqual(actual, expected)
  expect.end()
})

test('it saves an ask to the repository', (expect) => {
  const expected = true
  const Repository = browserStore(api)
  const newAsk = {
    timestamp: 100,
    ask: 'Test question',
    askee: 'Test User',
    status: 'Rejected',
  }

  const actual = Repository.save(newAsk)

  expect.deepEqual(actual, expected)
  expect.end()
})

const test = require('tape')

const browserStore = require('../browserStore')
const data = require('./helpers/data')
const apis = require('./helpers/testStore')

const { api, badApi } = apis

test('-- app/browserStore', (expect) => expect.end())

test('it loads all data from the repository', (expect) => {
  const expected = data
  const Repository = browserStore(api(data))

  Repository
    .load()
    .then((actual) => {
      expect.deepEqual(actual, expected)
    })
    .catch((err) => expect.fail(err))

  expect.end()
})

test('it handles errors during load', (expect) => {
  const Repository = browserStore(badApi(data))

  Repository
    .load()
    .then((actual) => {
      expect.fail('should have failed')
    })
    .catch((actual) =>
      expect.pass('database threw an error')
    )

  expect.end()
})

test('it saves an ask to the repository', (expect) => {
  const expected = true
  const Repository = browserStore(api(data))
  const newAsk = {
    timestamp: 100,
    ask: 'Test question',
    askee: 'Test User',
    status: 'Rejected',
  }

  Repository
    .save(newAsk)
    .then((actual) => {
      expect.deepEqual(actual, expected)
    })
    .catch((err) => expect.fail(err))

  expect.end()
})

test('it handles errors during save', (expect) => {
  const Repository = browserStore(badApi(data))
  const newAsk = {
    timestamp: 100,
    ask: 'Test question',
    askee: 'Test User',
    status: 'Rejected',
  }

  Repository
    .save(newAsk)
    .then((actual) => {
      expect.fail('should have failed')
    })
    .catch((actual) =>
      expect.pass('database threw an error')
    )

  expect.end()
})

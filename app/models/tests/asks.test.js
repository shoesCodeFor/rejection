const test = require('tape')

const createAsks = require('../asks')
const browserStore = require('../../browserStore')
const data = require('../../tests/helpers/data')
const api = require('../../tests/helpers/testStore')(data)

test('-- app/models/asks', (expect) => expect.end())

test('it loads all asks', (expect) => {
  const expected = data
  const Repository = browserStore(api)
  const Asks = createAsks(Repository)

  const actual = Asks.all().map(ask => ask.attrs())

  expect.deepEqual(actual, expected)
  expect.end()
})

test('---- create()', (expect) => expect.end())

test('it returns the newly created ask', (expect) => {
  const expected = data[0]
  const Repository = browserStore(api)
  const Asks = createAsks(Repository)

  const actual = Asks.create(data[0]).attrs()

  expect.deepEqual(actual, expected)
  expect.end()
})

test('it only accepts whitelisted attributes', (expect) => {
  const expected = {
    timestamp: 100,
    ask: 'Test question',
    askee: 'Test User',
    status: 'Rejected',
  }
  const newAsk = {
    timestamp: 100,
    ask: 'Test question',
    askee: 'Test User',
    status: 'Rejected',
    foo: 'bar',
  }
  const Repository = browserStore(api)
  const Asks = createAsks(Repository)

  const actual = Asks.create(newAsk).attrs()

  expect.deepEqual(actual, expected)
  expect.end()
})

test('it saves the newly created ask', (expect) => {
  const newAsk = {
    timestamp: 100,
    ask: 'Test question',
    askee: 'Test User',
    status: 'Rejected',
  }
  const expected = newAsk
  const Repository = browserStore(api)
  const Asks = createAsks(Repository)

  const actual = Asks.create(newAsk).attrs()

  expect.deepEqual(actual, expected)
  expect.end()
})

test('it calculates a score', (expect) => {
  const expected = 31
  const Repository = browserStore(api)
  const Asks = createAsks(Repository)

  Asks.all()
  const actual = Asks.score()

  expect.deepEqual(actual, expected)
  expect.end()
})

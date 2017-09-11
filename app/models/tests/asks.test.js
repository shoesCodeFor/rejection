const test = require('tape')

const createAsks = require('../asks')
const browserStore = require('../../browserStore')
const data = require('../../tests/helpers/data')
const store = require('../../tests/helpers/testStore')

const api = store(data)

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

test('---- score()', (expect) => expect.end())

test('it calculates the running score', (expect) => {
  const expected = 31
  const Repository = browserStore(api)
  const Asks = createAsks(Repository)

  Asks.all()
  const actual = Asks.score()

  expect.deepEqual(actual, expected)
  expect.end()
})

test('---- streak()', (expect) => expect.end())

test('------ returns 0 when', (expect) => expect.end())

test('it has no rejections in the db', (expect) => {
  const expected = 0
  const streakData = [{ status: 'Accepted' }]
  const Repository = browserStore(store(streakData))
  const Asks = createAsks(Repository)

  const actual = Asks.streak()

  expect.deepEqual(actual, expected)
  expect.end()
})

test('it has more than 1 day between now and first rejected', (expect) => {
  const expected = 0
  const today = new Date('2017-09-10').getTime()
  const streakData = [
    {
      status: 'Rejected',
      timestamp: new Date('2017-09-08').getTime(),
    },
  ]
  const Repository = browserStore(store(streakData))
  const Asks = createAsks(Repository)

  const actual = Asks.streak(today)

  expect.deepEqual(actual, expected)
  expect.end()
})

test('------ returns 1 when', (expect) => expect.end())

test('it has only 1 rejected', (expect) => {
  const expected = 1
  const today = new Date('2017-09-10').getTime()
  const streakData = [
    {
      status: 'Accepted',
      timestamp: new Date('2017-09-09').getTime() + 1,
    },
    {
      status: 'Rejected',
      timestamp: new Date('2017-09-09').getTime(),
    },
    {
      status: 'Rejected',
      timestamp: new Date('2017-09-09').getTime() + 2,
    },
  ]
  const Repository = browserStore(store(streakData))
  const Asks = createAsks(Repository)

  const actual = Asks.streak(today)

  expect.deepEqual(actual, expected)
  expect.end()
})

test('------ returns the streak length when', (expect) => expect.end())

test('it has a current streak but no rejecteds today', (expect) => {
  const expected = 2
  const today = new Date('2017-09-10').getTime()
  const streakData = [
    {
      status: 'Rejected',
      timestamp: new Date('2017-09-09').getTime(),
    },
    {
      status: 'Rejected',
      timestamp: new Date('2017-09-08').getTime(),
    },
  ]
  const Repository = browserStore(store(streakData))
  const Asks = createAsks(Repository)

  const actual = Asks.streak(today)

  expect.deepEqual(actual, expected)
  expect.end()
})

test('it has a current streak and 1+ rejecteds today', (expect) => {
  const expected = 3
  const today = new Date('2017-09-10').getTime()
  const streakData = [
    {
      status: 'Rejected',
      timestamp: new Date('2017-09-08').getTime(),
    },
    {
      status: 'Rejected',
      timestamp: new Date('2017-09-10').getTime(),
    },
    {
      status: 'Rejected',
      timestamp: new Date('2017-09-09').getTime(),
    },
  ]
  const Repository = browserStore(store(streakData))
  const Asks = createAsks(Repository)

  const actual = Asks.streak(today)

  expect.deepEqual(actual, expected)
  expect.end()
})

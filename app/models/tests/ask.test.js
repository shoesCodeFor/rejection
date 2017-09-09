const test = require('tape')

const createAsk = require('../ask')
const data = require('../../tests/helpers/data')

test('-- app/models/ask', (expect) => { expect.end() })

test('it returns all attrs', (expect) => {
  const expected = data[0]

  const actual = createAsk(data[0]).attrs()

  expect.deepEqual(actual, expected)
  expect.end()
})

test('it returns a timestamp', (expect) => {
  const expected = data[0].timestamp

  const actual = createAsk(data[0]).timestamp

  expect.deepEqual(actual, expected)
  expect.end()
})

test('it returns an ask', (expect) => {
  const expected = data[0].ask

  const actual = createAsk(data[0]).ask

  expect.deepEqual(actual, expected)
  expect.end()
})

test('it returns an askee', (expect) => {
  const expected = data[0].askee

  const actual = createAsk(data[0]).askee

  expect.deepEqual(actual, expected)
  expect.end()
})

test('it returns a status', (expect) => {
  const expected = data[0].status

  const actual = createAsk(data[0]).status

  expect.deepEqual(actual, expected)
  expect.end()
})

test('---- score()', (expect) => { expect.end() })

test('it returns 1 when status is "Accepted"', (expect) => {
  const expected = 1
  const data = { status: 'Accepted' }

  const actual = createAsk(data).score()

  expect.deepEqual(actual, expected)
  expect.end()
})

test('it returns 10 when status is "Rejected"', (expect) => {
  const expected = 10
  const data = { status: 'Rejected' }

  const actual = createAsk(data).score()

  expect.deepEqual(actual, expected)
  expect.end()
})

test('it returns 0 when status is unknown', (expect) => {
  const expected = 0
  const data = {}

  const actual = createAsk(data).score()

  expect.deepEqual(actual, expected)
  expect.end()
})

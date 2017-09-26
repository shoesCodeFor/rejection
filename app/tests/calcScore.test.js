const test = require('tape')
const calcScore = require('../calcScore')

test('-- app/calcScore', (expect) => expect.end())

test('it calculates the score', (expect) => {
  const expected = 21
  const statuses = [
    'Accepted',
    'Rejected',
    'Rejected',
    'Foo',
  ]

  const actual = calcScore(statuses)

  expect.deepEqual(actual, expected)
  expect.end()
})

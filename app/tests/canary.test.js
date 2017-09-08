const test = require('tape')
const canary = require('../canary')

test('-- app/canary', (expect) => { expect.end() })

test('returns "too-doo" when not told to branch', (expect) => {
  const expected = 'too-doo'
  const actual = canary()
  expect.deepEqual(actual, expected)
  expect.end()
})

test('returns "ta-da" when told to branch', (expect) => {
  const expected = 'ta-da'
  const actual = canary(true)
  expect.deepEqual(actual, expected)
  expect.end()
})

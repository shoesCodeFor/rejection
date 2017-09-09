const test = require('tape')

const utils = require('../utils')

test('-- app/utils', (expect) => { expect.end() })

test('---- capitalize()', (expect) => { expect.end() })

test('it uppercases the first character of the word', (expect) => {
  const expected = 'Accepted'

  const actual = utils.capitalize('accepted')

  expect.deepEqual(actual, expected)
  expect.end()
})

const test = require('tape')

const utils = require('../utils')

test('-- app/utils', (expect) => { expect.end() })

test('---- sortDesc()', (expect) => { expect.end() })

test('it sorts numerical record attribute in descending order', (expect) => {
  const expected = [
    { timestamp: 3 },
    { timestamp: 2 },
    { timestamp: 1 },
  ]
  const recs = [
    { timestamp: 1 },
    { timestamp: 2 },
    { timestamp: 3 },
  ]

  const actual = utils.sortDesc('timestamp')(recs)

  expect.deepEqual(actual, expected)
  expect.end()
})

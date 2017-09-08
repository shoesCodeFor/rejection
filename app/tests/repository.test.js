const test = require('tape')

const Repository = require('../repository')
const store = require('./helpers/testStore')
const data = require('./helpers/data')

test('-- app/repository', (expect) => { expect.end() })

test('it loads all data from the repository', (expect) => {
  const expected = data
  const db = Repository(store(data))

  const actual = db.load()

  expect.deepEqual(actual, expected)
  expect.end()
})

test('it adds an ask to the repository', (expect) => {
  const expected = {
    timestamp: '2017-Sep-08',
    ask: 'Brush my tail',
    askee: 'The human',
    status: 'Rejected',
  }
  const db = Repository(store(data))

  db.add(expected)
  const actual = db.load().find(rec => rec === expected)

  expect.deepEqual(actual, expected)
  expect.end()
})

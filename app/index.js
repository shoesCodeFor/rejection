const Repository = require('./repository')
const store = require('./browserStore')
const capitalize = require('./utils').capitalize
const sortDesc = require('./utils').sortDesc

const db = Repository(store(window.localStorage))

const handleSubmit = (db) => (event) => {
  const ask = document.getElementsByName('ask')[0].value
  const askee = document.getElementsByName('askee')[0].value
  const status = capitalize(event.target.id)

  db.add({ ask, askee, status })

  event.preventDefault()
  return false
}

const formattedAskTimestamp = (ts) => {
  const date = new Date(ts)
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
}

const createAskHtml = (item) => {
  const ele = document.createElement('li')

  const date = document.createElement('span')
  date.className = 'date'
  date.innerHTML = formattedAskTimestamp(item.timestamp)
  ele.appendChild(date)

  const ask = document.createElement('span')
  ask.className = 'ask'
  ask.innerHTML = item.ask
  ele.appendChild(ask)

  const askee = document.createElement('span')
  askee.className = 'askee'
  askee.innerHTML = item.askee
  ele.appendChild(askee)

  const status = document.createElement('span')
  status.className = 'status'
  status.innerHTML = item.status
  ele.appendChild(status)

  return ele
}

const render = (db) => {
  const asks = sortDesc('timestamp')(db.load())

  const score = document.getElementById('score')
  const scoreNum = score.getElementsByTagName('span')[0]
  scoreNum.innerHTML = '0'

  const askList = document.getElementById('asks')
  askList.innerHTML = ''
  asks.forEach((ask) => {
    const askItem = createAskHtml(ask)
    askList.appendChild(askItem)
  })
}

const initListeners = (db) => {
  const handler = handleSubmit(db)

  const acceptedButton = document.getElementById('accepted')
  acceptedButton.addEventListener('click', (event) => {
    handler(event)
  })

  const rejectedButton = document.getElementById('rejected')
  rejectedButton.addEventListener('click', (event) => {
    handler(event)
  })

  window.addEventListener('askUpdated', (event) => {
    render(db)
  })
}

const shell = (db) => {
  initListeners(db)
  render(db)
}

shell(db)

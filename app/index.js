require('./assets/normalize.css')
require('./assets/styles.css')
const db = require('./browserStore')()
const utils = require('./utils')
const createAsks = require('./models/asks')

const contentHandler = (id) => {
  if (id === 'form-tab') {
    document.getElementsByClassName('form-tab')[0].classList.add('active')
    document.getElementsByClassName('new-ask')[0].classList.add('active')

    document.getElementsByClassName('history-tab')[0].classList.remove('active')
    document.getElementsByClassName('asks')[0].classList.remove('active')
  }

  if (id === 'history-tab') {
    document.getElementsByClassName('history-tab')[0].classList.add('active')
    document.getElementsByClassName('asks')[0].classList.add('active')

    document.getElementsByClassName('form-tab')[0].classList.remove('active')
    document.getElementsByClassName('new-ask')[0].classList.remove('active')
  }
}

const handleSubmit = (Asks) => (event) => {
  event.preventDefault()

  const ask = document.getElementsByName('ask')[0].value
  const askee = document.getElementsByName('askee')[0].value
  const status = event.target.getAttribute('data-status')

  try {
    Asks.create({ ask, askee, status })
    const event = new window.Event('askUpdated')
    window.dispatchEvent(event)
  } catch (e) {
    console.log(e)
  }

  return false
}

const formattedAskTimestamp = (ts) => {
  const date = new Date(ts)
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
}

const createAskHtml = (item) => {
  const ele = document.createElement('li')
  ele.className = `ask-entry ${item.status.toLowerCase()}`

  const date = document.createElement('span')
  date.className = 'date'
  date.innerHTML = formattedAskTimestamp(item.timestamp)
  ele.appendChild(date)

  const askee = document.createElement('span')
  askee.className = 'askee'
  askee.innerHTML = item.askee
  ele.appendChild(askee)

  const ask = document.createElement('span')
  ask.className = 'ask'
  ask.innerHTML = item.ask
  ele.appendChild(ask)

  return ele
}

const render = (Asks) => {
  const asks = Asks.all()

  const score = document.getElementsByClassName('score')[0]
  const scoreNum = score.getElementsByTagName('span')[0]
  scoreNum.innerHTML = Asks.score()

  const historyTab = document.getElementsByClassName('history-tab')[0]
  historyTab.innerHTML = `History (${asks.length})`

  const askList = document.getElementsByClassName('asks')[0]
  askList.innerHTML = ''
  utils.sortDesc('timestamp')(asks).forEach((ask) => {
    const askItem = createAskHtml(ask)
    askList.appendChild(askItem)
  })
}

const initListeners = (Asks) => {
  const handler = handleSubmit(Asks)

  const acceptedButton = document.getElementsByClassName('accepted')[0]
  acceptedButton.addEventListener('click', (event) => {
    handler(event)
  })

  const rejectedButton = document.getElementsByClassName('rejected')[0]
  rejectedButton.addEventListener('click', (event) => {
    handler(event)
  })

  window.addEventListener('askUpdated', (event) => {
    render(Asks)
  })

  const newAskTab = document.getElementsByClassName('form-tab')[0]
  newAskTab.addEventListener('click', (event) => {
    contentHandler('form-tab')
  })

  const historyTab = document.getElementsByClassName('history-tab')[0]
  historyTab.addEventListener('click', (event) => {
    contentHandler('history-tab')
  })
}

const shell = (db) => {
  const Asks = createAsks(db)

  initListeners(Asks)
  render(Asks)
}

shell(db)

const styles = require('./assets/styles.css')
const db = require('./browserStore')()
const utils = require('./utils')
const createAsks = require('./models/asks')

const contentHandler = (id) => {
  if (id === 'form_tab') {
    document.getElementById('form_tab').classList.add('active');
    document.getElementById('new_ask').classList.add('active');

    document.getElementById('history_tab').classList.remove('active');
    document.getElementById('asks').classList.remove('active');
  }

  if (id === 'history_tab') {
    document.getElementById('history_tab').classList.add('active');
    document.getElementById('asks').classList.add('active');
    document.getElementById('form_tab').classList.remove('active');
    document.getElementById('new_ask').classList.remove('active');
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
  ele.className = 'ask'

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

const render = (Asks) => {
  const asks = Asks.all()

  const score = document.getElementById('score')
  const scoreNum = score.getElementsByTagName('span')[0]
  scoreNum.innerHTML = Asks.score()

  const historyTab = document.getElementById('history_tab')
  historyTab.innerHTML = `History (${asks.length})`

  const askList = document.getElementById('asks')
  askList.innerHTML = ''
  utils.sortDesc('timestamp')(asks).forEach((ask) => {
    const askItem = createAskHtml(ask)
    askList.appendChild(askItem)
  })
}

const initListeners = (Asks) => {
  const handler = handleSubmit(Asks)

  const acceptedButton = document.getElementById('accepted')
  acceptedButton.addEventListener('click', (event) => {
    handler(event)
  })

  const rejectedButton = document.getElementById('rejected')
  rejectedButton.addEventListener('click', (event) => {
    handler(event)
  })

  window.addEventListener('askUpdated', (event) => {
    render(Asks)
  })

  const newAskTab = document.getElementById('form_tab')
  newAskTab.addEventListener('click', (event) => {
    contentHandler(event.target.id)
  })

  const historyTab = document.getElementById('history_tab')
  historyTab.addEventListener('click', (event) => {
    contentHandler(event.target.id)
  })

}

const shell = (db) => {
  const Asks = createAsks(db)

  initListeners(Asks)
  render(Asks)
}

shell(db)

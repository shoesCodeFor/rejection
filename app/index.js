const Repository = require('./repository')
const store = require('./browserStore')
const capitalize = require('./utils').capitalize

const db = Repository(store(window.localStorage))

const handleSubmit = (event) => {
  const status = capitalize(event.target.id)
  const ask = document.getElementsByName('ask')[0].value
  const askee = document.getElementsByName('askee')[0].value

  db.add({ status, ask, askee })

  event.preventDefault()
  return false
}

const initListeners = () => {
  const acceptedButton = document.getElementById('accepted')
  acceptedButton.addEventListener('click', (event) => {
    handleSubmit(event)
  })

  const rejectedButton = document.getElementById('rejected')
  rejectedButton.addEventListener('click', (event) => {
    handleSubmit(event)
  })
}

const render = () => {
  console.log('rendering...')
}

const shell = () => {
  initListeners()
  render()
}

shell()

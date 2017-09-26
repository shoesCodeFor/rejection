const lookupScore = require('../config/scores')

const createAsk = (attributes = {}) => {
  const ask = Object.assign({}, attributes)

  const attrs = () => ask
  const score = () => lookupScore(ask.status)

  return {
    timestamp: ask.timestamp,
    ask: ask.ask,
    askee: ask.askee,
    status: ask.status,
    attrs,
    score,
  }
}

module.exports = createAsk

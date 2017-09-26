const lookupScore = require('../config/scores')

const createAsk = (attributes = {}) => {
  const ask = Object.assign({}, attributes)

  return {
    timestamp: ask.timestamp,
    ask: ask.ask,
    askee: ask.askee,
    status: ask.status,
    attrs: () => ask,
    score: () => lookupScore(ask.status),
  }
}

module.exports = createAsk

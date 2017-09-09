const SCORES = {
  'Accepted': 1,
  'Rejected': 10,
}

const createAsk = (attributes = {}) => {
  const ask = Object.assign({}, attributes)

  const attrs = () => ask
  const score = () => (SCORES[ask.status] || 0)

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

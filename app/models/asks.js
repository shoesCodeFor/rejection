const createAsk = require('./ask')

const createAsks = (db) => {
  let asks = []

  const all = () => {
    asks = db.load().map(createAsk)
    return asks
  }

  const create = (attributes) => {
    const { ask, askee, status } = attributes
    const timestamp = attributes.timestamp || Date.now()
    const newAsk = createAsk({ timestamp, ask, askee, status })

    try {
      db.save(newAsk.attrs())
      return newAsk
    } catch (e) {
      throw (e)
    }
  }

  const score = () => asks.reduce((acc, ask) => acc + ask.score(), 0)

  return {
    all,
    create,
    score,
  }
}

module.exports = createAsks

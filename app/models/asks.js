const createAsk = require('./ask')

const createAsks = (db) => {
  let asks = []

  const all = async () => {
    try {
      const asks = await db.load()
      return asks.map(createAsk)
    } catch (e) {
      throw (e)
    }
  }

  const create = async (attributes) => {
    const { ask, askee, status } = attributes
    const timestamp = attributes.timestamp || Date.now()
    const newAsk = createAsk({ timestamp, ask, askee, status })

    try {
      await db.save(newAsk.attrs())
      return newAsk
    } catch (e) {
      throw (e)
    }
  }

  const score = () => asks.reduce((acc, ask) => acc + ask.score(), 0)

  const dayAtMidnite = (timestamp) => {
    const date = new Date(timestamp)
    const dateStr = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
    return new Date(dateStr).getTime()
  }

  const calcDays = (to, from) => ((to - from) / 1000 / 3600 / 24)

  const diffsInDays = (currentDay, timestampsList) => (
    timestampsList
      .reduce((acc, ts) => {
        acc.diffList.push(calcDays(acc.prev, ts))
        acc.prev = ts
        return acc
      }, { diffList: [], prev: currentDay }).diffList
  )

  const streak = (today = dayAtMidnite(Date.now())) => {
    const normalized = all()
      .filter((ask) => ask.status === 'Rejected')
      .map((ask) => dayAtMidnite(ask.timestamp))
      .reduce((acc, ts) => {
        acc[ts] = 1
        return acc
      }, {})

    const sorted = Object.keys(normalized).sort((a, b) => b - a)
    const diffCounts = diffsInDays(dayAtMidnite(today), sorted)
    const breakerIndex = diffCounts.findIndex((val) => val > 1)

    return breakerIndex === -1 ? diffCounts.length : breakerIndex
  }

  return {
    all,
    create,
    score,
    streak,
  }
}

module.exports = createAsks

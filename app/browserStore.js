
const browserRepository = (api) => {
  return {
    load () {
      let retVal = []

      for (let i = 0, l = api.length; i < l; i++) {
        const key = api.key[i]
        if (key !== 'loglevel') {
          retVal = retVal.concat(JSON.parse(api.getItem(key)))
        }
      }

      return retVal
    },

    add (ask) {
      const newItem = Object.assign(
        ask,
        { timestamp: Date.now() },
      )

      api.setItem(newItem.timestamp, JSON.stringify(newItem))

      return true
    },
  }
}

module.exports = browserRepository

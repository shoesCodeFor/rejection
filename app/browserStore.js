const browserRepository = (api = window.localStorage) => {
  return {
    load () {
      let retVal = []

      for (let i = 0, l = api.length; i < l; i++) {
        const key = api.key(i)
        if (key !== 'loglevel') {
          retVal = retVal.concat(JSON.parse(api.getItem(key)))
        }
      }

      return retVal
    },

    save (item) {
      const newItem = Object.assign({ timestamp: Date.now() }, item)

      try {
        api.setItem(newItem.timestamp, JSON.stringify(newItem))
        return true
      } catch (e) {
        throw (e)
      }
    },
  }
}

module.exports = browserRepository

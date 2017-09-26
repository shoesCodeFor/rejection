const browserRepository = (api = window.localStorage) => {
  return {
    load: () => new Promise((resolve, reject) => {
      try {
        let retVal = []

        for (let i = 0, l = api.length; i < l; i++) {
          const key = api.key(i)
          if (key !== 'loglevel') {
            retVal = retVal.concat(JSON.parse(api.getItem(key)))
          }
        }

        return resolve(retVal)
      } catch (e) {
        return reject(e)
      }
    }),

    save: (item) => new Promise((resolve, reject) => {
      const newItem = Object.assign({ timestamp: Date.now() }, item)

      try {
        api.setItem(newItem.timestamp, JSON.stringify(newItem))
        return resolve(true)
      } catch (e) {
        return reject(e)
      }
    }),
  }
}

module.exports = browserRepository

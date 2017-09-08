
const browserRepository = (api) => {
  return {
    load () {
      let retVal = []

      for (let i = 0, l = api.length; i < l; i++) {
        if (api.key(i) !== 'loglevel') {
          retVal = retVal.concat(api.getItem(api.key(i)))
        }
      }

      return retVal
    },

    add (ask) {
      api.setItem(ask)
      return true
    },
  }
}

module.exports = browserRepository

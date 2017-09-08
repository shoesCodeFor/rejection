
const Repository = (store) => {
  return {
    load () {
      return store.load()
    },

    add (ask) {
      store.add(ask)
      return true
    },
  }
}

module.exports = Repository

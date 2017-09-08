const testStore = (initialData = []) => {
  let data = initialData

  return {
    load () {
      return data
    },

    add (ask) {
      data = data.concat(ask)
      return true
    },
  }
}

module.exports = testStore

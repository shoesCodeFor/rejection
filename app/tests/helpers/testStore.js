const testStore = (initialData = []) => {
  let data = [].concat(initialData)

  return {
    length: data.length,
    key: (i) => data[i].timestamp,
    getItem: (key) => JSON.stringify(data.find((ele) => ele.timestamp === key)),
    setItem: (key, item) => { return true },
  }
}

module.exports = testStore

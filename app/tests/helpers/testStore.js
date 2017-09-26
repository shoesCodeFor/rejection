const testStore = (initialData = []) => {
  let data = [].concat(initialData)

  return {
    length: data.length,
    key: (i) => data[i].timestamp,
    getItem: (key) => JSON.stringify(data.find((ele) => ele.timestamp === key)),
    setItem: (key, item) => { return true },
  }
}

const testErrorStore = (initialData = []) => {
  let data = [].concat(initialData)

  return {
    length: data.length,
    key: (i) => data[i].timestamp,
    getItem: () => { throw new Error('error getting item') },
    setItem: () => { throw new Error('error setting item') },
  }
}

module.exports = {
  api: testStore,
  badApi: testErrorStore,
}

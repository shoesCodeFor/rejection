const capitalize = (word) => word.slice(0, 1).toUpperCase() + word.slice(1)

const sortDesc = (attr) => (recs) =>
  recs.sort((a, b) => b[attr] - a[attr])

module.exports = {
  capitalize,
  sortDesc,
}

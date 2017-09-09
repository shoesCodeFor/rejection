const sortDesc = (attr) => (recs) =>
  recs.sort((a, b) => b[attr] - a[attr])

module.exports = {
  sortDesc,
}

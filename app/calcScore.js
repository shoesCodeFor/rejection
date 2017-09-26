const lookupScore = require('./config/scores')

const calc = (statuses) =>
  statuses.reduce((acc, status) => acc + lookupScore(status), 0)

module.exports = calc

const SCORES = {
  Accepted: 1,
  Rejected: 10,
}

module.exports = (key) => SCORES[key] || 0

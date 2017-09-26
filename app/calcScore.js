const POINTS = {
  Accepted: 1,
  Rejected: 10,
}

const calc = (statuses) =>
  statuses.reduce((acc, status) => acc + (POINTS[status] || 0), 0)

module.exports = calc

const calc = (statuses) => {
  return statuses.reduce((acc, status) => {
    if (status === 'Accepted') {
      return acc + 1
    }

    if (status === 'Rejected') {
      return acc + 10
    }

    return acc + 0
  }, 0)
}

module.exports = calc

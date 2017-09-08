const canary = (shouldBranch = false) => {
  if (shouldBranch) {
    return 'ta-da'
  } else {
    return 'too-doo'
  }
}

module.exports = canary

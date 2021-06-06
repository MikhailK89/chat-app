class TokenGenerator {
  tokens = {}

  createToken(id) {
    const createdToken = {
      id,
      token: `token:${Date.now()}`
    }

    this.tokens[id] = createdToken

    return createdToken
  }

  findToken(id) {
    try {
      if (this.tokens[id]) {
        return this.tokens[id]
      }
    } catch (e) {}

    return null
  }

  deleteToken(id) {
    if (this.tokens.hasOwnProperty(id)) {
      this.tokens[id] = null
    }
  }

  tokenIsValid(id, token) {
    try {
      if (this.tokens[id].token === token) {
        return true
      }
    } catch (e) {}

    return false
  }
}

module.exports = new TokenGenerator()

class TokenGenerator {
  tokens = {}

  createToken(id) {
    const createdToken = {
      id,
      token: `token:${Date.now()}`,
      expire: '3600'
    }

    this.tokens[id] = createdToken

    setTimeout(() => {
      createdToken.token = null
    }, +createdToken.expire * 1000)

    return createdToken
  }

  tokenIsValid(id, token) {
    if (this.tokens[id]) {
      if (this.tokens[id].hasOwnProperty('token')) {
        if (this.tokens[id].token === token) {
          return true
        }
      }
    }

    return false
  }
}

module.exports = new TokenGenerator()

// @ts-check

const jwt = require('jsonwebtoken')

const {SERVER_SECRET} = process.env

async function signJWT(value) {
  return new Promise((resolve, reject) => {
    jwt.sign(value, SERVER_SECRET, {algorithm: 'RS256'}, (err, encoded) => {
      if (err) {
        reject(err)
      } else {
        resolve(encoded)

      }
    })
  })
}

async function verifyJWT(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(value, SERVER_SECRET, (err, value) => {
      if (err) {
        reject(err)
      } else {
        resolve(value)
      }

    })
  })
}


/**
 * @param {string} userId
 */
async function getAccessTokenForUserId(userId) {
  return signJWT(userId)
}

module.exports = {
  getAccessTokenForUserId,
}

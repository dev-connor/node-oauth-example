const jwt = require('jsonwebtoken')

const { SERVER_SECRET } = process.env

async function signJWT(value) {
  return new Promise((resolve, reject) => {
    // TODO: complete here
  })
}

async function verifyJWT(token) {
  return new Promise((resolve, reject) => {
    // TODO: complete here
  })
}

module.exports = {
  signJWT,
  verifyJWT,
}

// @ts-check

const { v4: uuidv4 } = require('uuid')

const { getUsersCollection } = require('./mongo')
const { signJWT } = require('./jwt')


/**
 * @param {string} userId
 */
async function getAccessTokenForUserId(userId) {
  return signJWT(userId)
}

module.exports = {
  createUserWithFacebookIdAndGetId,
  getAccessTokenForUserId,
}

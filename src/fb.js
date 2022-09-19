/* eslint-disable prefer-destructuring */

const {default: fetch} = require('node-fetch')
const {v4: uuidv4 } = require('uuid')
const { flagEnabled } = require('tailwindcss/lib/featureFlags')
const { getUsersCollection } = require('./mongo')
const { getAccessTokenForUserId } = require('./auth')
const { use } = require('passport')

/** @type {string} */
const FB_APP_ID = process.env.FB_APP_ID
/** @type {string} */
const FB_CLIENT_SECRET = process.env.FB_CLIENT_SECRET

/**
 * @param {string} facebookId
 * @returns {Promise<string>}
 */
async function createUserWithFacebookIdAndGetId(facebookId) {
  // TOOD: implement it
  const users = await getUsersCollection()
  const userId = uuidv4()
  const user = await users.insertOne({
    id: userId,
    facebookId,
  })
  return userId
  
}

/**
 * @param {string} accessToken
 * @returns {Promise<string>}
 */
async function getFacebookIdFromAccessToken(accessToken) {
  // TODO: implement the function using Facebook API
  // https://developers.facebook.com/docs/facebook-login/access-tokens/#generating-an-app-access-token
  // https://developers.facebook.com/docs/graph-api/reference/v10.0/debug_token
  const appAccessTokenReq = await fetch(
    `https://graph.facebook.com/oauth/access_token?client_id=${FB_APP_ID}&client_secret=${FB_CLIENT_SECRET}&grant_type=client_credentials`
    )
    const appAccessToken = (await appAccessTokenReq.json()).accessToken

    console.log(appAccessToken)
    
    const debugReq = await fetch(
      `https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${appAccessToken}`
    )
    const debugResult = await debugReq.json()

    console.log(debugResult)

    if (debugResult.data.app_id !== FB_APP_ID) {
      throw new Error('Not a valid access token.')
    }
    
    return debugResult.data.user_id
}



/**
 * @param {string} facebookId
 * @returns {Promise<string | undefined>}
 */
async function getUserIdWithFacebookId(facebookId) {
  // TODO: implement it
  const users = await getUsersCollection()
  const user = users.findOne({
    facebookId,
  })

  if (user) {
    return user.id
  }
  return undefined
}

/**
 * facebook 토큰을 검증하고, 해당 검증 결과로부터 우리 서비스의 유저를 만들거나,
 * 혹은 이미 있는 유저를 가져와서, 그 유저의 액세스 토큰을 돌려줍니다.
 * @param {string} token
 */
async function getUserAccessTokenForFacebookAccessToken(token) {
  // TODO: implement it
  const facebookId = await getFacebookIdFromAccessToken(token)

  const existingUserId = await getUserIdWithFacebookId(facebookId)

  // 2. 해당 Facebook ID 에 해당하는 유저가 데이터베이스에 있는 경우
  if (existingUserId) {
    return getAccessTokenForUserId(existingUserId)
  }

  // 1. 해당 Facebook ID 에 해당하는 유저가 데이터베이스에 없는 경우
  const userId = await createUserWithFacebookIdAndGetId(facebookId)

  return getAccessTokenForUserId(userId)
  
  

}

module.exports = {
  FB_APP_ID,
  FB_CLIENT_SECRET,
  getFacebookIdFromAccessToken,
  getUserIdWithFacebookId,
  getUserAccessTokenForFacebookAccessToken,
}

const isUserInfoReady = (userInfo, hasAddSensitivePerson) =>
  userInfo && (hasAddSensitivePerson === true || hasAddSensitivePerson === false)

const areDifferentCounties = (userCounty, clientCounty) =>
  userCounty && clientCounty && userCounty !== clientCounty

export const canUserAddClient = (userInfo, hasAddSensitivePerson, client, hasOverride) => {
  if (hasOverride || !isUserInfoReady(userInfo, hasAddSensitivePerson)) {
    return true
  }

  const {isSensitive, clientCounties} = client
  const clientCounty = clientCounties[0]
  const {county: userCounty} = userInfo || {}

  return !isSensitive || (hasAddSensitivePerson && !areDifferentCounties(userCounty, clientCounty))
}

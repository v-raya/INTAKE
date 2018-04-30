const isUserInfoReady = (userInfo, hasAddSensitivePerson) =>
  userInfo && (hasAddSensitivePerson === true || hasAddSensitivePerson === false)

const areDifferentCounties = (userCounty, clientCounty) =>
  userCounty && clientCounty && userCounty !== clientCounty

export const canUserAddClient = (userInfo, hasAddSensitivePerson, client, hasOverride) => {
  if (hasOverride || !isUserInfoReady(userInfo, hasAddSensitivePerson)) {
    return true
  }

  const {isSensitive, clientCounty} = client
  const {county: userCounty} = userInfo || {}

  return !isSensitive || (hasAddSensitivePerson && !areDifferentCounties(userCounty, clientCounty))
}

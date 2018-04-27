export const canUserAddClient = (userInfo, hasAddSensitivePerson, client, hasOverride) => {
  if (hasOverride) { return true }

  // Avoid race conditions: If we don't have our user info yet, defer to the backend
  if (!userInfo || (hasAddSensitivePerson !== true && hasAddSensitivePerson !== false)) {
    return true
  }

  const {isSensitive, clientCounty} = client
  const {county: userCounty} = userInfo || {}

  if (isSensitive && !hasAddSensitivePerson) { return false }

  if (isSensitive && userCounty && clientCounty && userCounty !== clientCounty) { return false }

  return true
}

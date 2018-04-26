export const canUserAddClient = (userInfo, hasAddSensitivePerson, client) => {
  const {isSensitive} = client
  return !isSensitive || hasAddSensitivePerson
}

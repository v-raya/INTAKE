export const getPhoneNumberErrors = (phoneNumber) => {
  if (phoneNumber && phoneNumber.match(/^\(?0.*$/)) {
    return ['The phone number should not start from 0']
  } else {
    return undefined
  }
}


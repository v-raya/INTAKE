import {getPhoneNumberErrors} from 'utils/phoneNumberValidator'

describe('phoneNumberValidator', () => {
  describe('getPhoneNumberErrors', () => {
    it('phone number should not start from 0', () => {
      expect(getPhoneNumberErrors('0123'))
        .toEqual(['The phone number should not start from 0'])
    })
    it('phone number should not start from (0', () => {
      expect(getPhoneNumberErrors('(012)3'))
        .toEqual(['The phone number should not start from 0'])
    })
    it('empty phone number', () => {
      expect(getPhoneNumberErrors(''))
        .toEqual(undefined)
    })
    it('valid phone number', () => {
      expect(getPhoneNumberErrors('123'))
        .toEqual(undefined)
    })
  })
})

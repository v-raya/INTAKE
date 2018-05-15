import {getZIPErrors} from 'utils/zipValidator'
import {List} from 'immutable'

describe('zipValidator', () => {
  describe('getZipErrors', () => {
    it('zip must be 5 digits long', () => {
      expect(getZIPErrors('1234'))
        .toEqual(['zip code should be 5 digits'])
    })
    it('when zip length is 5 itb should return no validation message', () => {
      expect(getZIPErrors('12345'))
        .toEqual(List())
    })
    it('when empty zip is sent it should return empty', () => {
      expect(getZIPErrors(''))
        .toEqual(List())
    })
  })
})

